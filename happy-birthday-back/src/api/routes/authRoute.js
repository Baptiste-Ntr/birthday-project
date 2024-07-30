module.exports = (server) => {
    const authController = require("../controllers/authController");

    server
        .post("/register", 
            authController.register
        )
        // .get("/sendBirthdayEmail", birthdayController.sendBirthdayEmail);
        .post('/login',
            authController.login
        )
}