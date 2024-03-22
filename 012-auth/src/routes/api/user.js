const router = require("express").Router();

const { authByCredentials, protectedArea } = require("../../middlewares/passport");

const UsersModule = require("../../modules/users");

router.get('/login', (req, res) => {
    const messages = req.session.messages || [];
    req.session.messages = [];

    res.render('user/login', { messages });
});

router.get('/me', protectedArea({ loginUrl: 'login' }), (req, res) => {
    res.render('user/me', { user: req.user });
});

router.post('/login', authByCredentials({ failureRedirect: 'login', successRedirect: 'me' }));

router.post('/signup', async (req, res) => {
    try {
        const user = await UsersModule.register(req.body);
        req.logIn(user, (err) => {
            if (err) {
                throw err;
            }
            res.redirect('me');
        });
    } catch (error) {
        req.session.messages = [error.message];
        res.redirect('login');
    }
});

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            throw err;
        }
        res.redirect('login');
    });
});

module.exports = router;