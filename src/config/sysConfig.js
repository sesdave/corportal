module.exports = {
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: 1000*60*60*24, // 1 day in milliseconds
    MAXIMUM_NUMBER_OF_IMAGES_TO_UPLOAD: 5,
    VALID_IMAGE_FORMATS: ['jpg', 'jpeg', 'png','pdf'],
    MAX_UPLOAD_IMAGE_SIZE: 5 * 1024 * 1024, // Bytes
};