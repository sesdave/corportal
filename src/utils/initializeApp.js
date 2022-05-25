// const readline = require('readline');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });
// console.log(`
//     Hi, Kindly sign up as the Super Admin for this Application... \n\n 
//     I'll guide you through through the process... \n\n
// `);
// rl.question(`\tWhat is your name?\nAnswer>> `, console.log);

// rl.on('line', (line) => {
//     console.log(`Received: ${line}`);
// });
module.exports = async () => {
    console.log('\nChecking the DB for Admins...');
    const userRepository = require('../database/repositories/user');

    const admins = await userRepository.getSelectedUsers({ userType: 'Admin' });
    if (admins.length) {
        console.log('\nSuper Admin Exists...');

        return;
    }

    console.log('\nInitializing the Database...');

    const authService = require('../services/auth.service');

    const superAdmin = {
        name: 'Chibuike Umechukwu',
        email: 'umebuike@gmail.com',
        phone: '2347039601940',
        password: 'Coren@1',
        userType: 'Admin',
    }

    console.log('\nSeeding the Super Admin...');
    const admin = await authService.register(superAdmin);
    console.log('\nSeeded the Super Admin...');
    console.log({ admin });

    console.log('\nSeeding the Access Level Roles and Permissions...');
    // Seed the initial roles and permissions
    const { roles, permissions } = require('../config/adminACL');
    const aclRepository = require('../database/repositories/acl');

    let dbJob = [];

    if (roles.length) {
        dbJob = dbJob.concat(roles.map(
            r => aclRepository.createRole({
                name: r,
                createdBy: admin.adminId
            }))
        )
    }

    if (Object.values(permissions).length) {
        dbJob = dbJob.concat(Object.values(permissions).map(
            p => aclRepository.createPermission({
                name: p
            }))
        )
    }

    await Promise.all(dbJob);

    console.log('\nSeeded the Access Level Roles and Permissions...');

    console.log('\nSeeding the Fee items and Fees...');

    const feeConstants = require('../config/fees');
    const feeItemRepository = require('../database/repositories/feeItem');

    let dbFeeJob = [];
    if (feeConstants.feeItems.length) {
        dbFeeJob = dbFeeJob.concat(feeConstants.feeItems.map(
            f => feeItemRepository.create({
                name: f.name,
                description: f.description,
                adminId: admin.adminId,
                status: 'published'
            })
        ))
    }

    const feeItemList = await Promise.all(dbFeeJob);
    const feeItemMap = feeItemList.reduce(
        (obj, f) => { obj[f.name] = f.feeItemId; return obj; },
        {}
    );

    let dbFeeJob1 = [];
    const personnelFeeRepository = require('../database/repositories/personnelFee');

    const personnelFeeItems = Object.keys(feeConstants.personnelFees);
    if (personnelFeeItems.length) {
        personnelFeeItems.forEach(k => {
            if (feeConstants.personnelFees[k].length) {
                dbFeeJob1 = dbFeeJob1.concat(feeConstants.personnelFees[k].map(
                    f => personnelFeeRepository.create({
                        ...f,
                        feeItemId: feeItemMap[k],
                        adminId: admin.adminId,
                        status: 'published'
                    })
                ))
            }
        })
    }

    await Promise.all(dbFeeJob1);

    console.log('\nSeeded the Fee items and Fees...');

    console.log('Database Completely Seeded....');
    console.log('Ensure to Setup the permissions for each Role...');
}