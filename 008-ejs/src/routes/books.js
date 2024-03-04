const books = require("../repositories/books");
const upload = require("../middleware/upload");


const router = require("express").Router();

const handleError = (res, error) => {
    if (error instanceof books.NotFoundError) {
        res.redirect("/errors/404");
        return;
    }

    if (error instanceof books.ValidationError) {
        res.redirect("/errors/400");
        return;
    }

    console.error(error);
    res.redirect("/errors/500");
}

router.get("/", (req, res) => {
    const items = books.select();
    res.render("books/index", { books: items });
});

router.get("/new", (req, res) => {
    res.render("books/create", { book: {} });
});

router.get("/:id", (req, res) => {
    const book = books.get(req.params.id);
    res.render("books/view", { book });
});

router.get("/:id/edit", (req, res) => {
    const book = books.get(req.params.id);
    res.render("books/update", { book });
});

router.post("/save", upload.single("fileBook"), (req, res) => {
    try {
        books.insert({
            ...req.body,
            fileBook: req.file ? req.file.filename : null,
        });
    } catch (error) {
        if (error instanceof books.ValidationError) {
            res.render("books/update", { book: req.body });
            return;
        }

        throw error;
    }

    res.redirect(`/`);
});


router.post("/save/:id", upload.single("fileBook"), (req, res) => {
    const data = {
        ...req.body,
    };

    if (req.file) {
        data.fileBook = req.file.filename;
    }

    try {
        books.update(req.params.id, data);
    } catch (error) {
        if (error instanceof books.ValidationError) {
            res.render("books/update", { book: req.body });
            return;
        }

        throw error;
    }

    res.redirect(`/`);
});

router.get("/:id/delete", (req, res) => {
    const book = books.get(req.params.id);

    res.render("books/delete", { book });
});

router.post("/:id/delete", (req, res) => {
    books.remove(req.params.id);
    res.redirect("/");
});

router.use((err, req, res, next) => {
    handleError(res, err);
});

module.exports = router;