const router = require("express").Router();

router.post('/login', (req, res) => {
    res.status(201).json({
        id: 1,
        mail: "test@mail.ru",
    });
});

module.exports = router;