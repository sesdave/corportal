const { Router } = require("express");
const errorHandler = require("../middlewares/errorHandler");
const { login, getRegData } = require("../controllers/auth.controller");
const searchController = require("../controllers/search.controller");
const validate = require("../middlewares/Validator/auth");
const cloudinary = require('../utils/CloudinaryMediaProvider');

const personnelRoutes = require("./personnel");
const firmRoutes = require("./firm");
const adminRoutes = require("./admin");


const router = Router();

router.use('/personnels', personnelRoutes);
router.use('/firms', firmRoutes);
router.use('/admins', adminRoutes);

router.post("/upload", (req, res, next) => {
    return cloudinary
        .upload(req)
        .then(
            response => res
                .status(200)
                .json(response)
        )
        .catch(next);
});

router.get('/fees', searchController.getSelectedFees);
router.post("/login", validate('signIn'), login);
router.get("/getRegData", getRegData);

router.get("/", (req, res) => res.status(200).send("You have reached the Coren backend api"));

router.all("*", (req, res) => res.sendStatus(404));

router.use((err, req, res, next) => errorHandler(err, req, res));

module.exports = router;