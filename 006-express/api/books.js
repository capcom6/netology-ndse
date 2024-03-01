const books = require("../repositories/books");

const router = require("express").Router();

const handleError = (res, error) => {
    if (error instanceof books.NotFoundError) {
        res.status(404).json({
            error: error.message,
        });
        return;
    }

    if (error instanceof books.ValidationError) {
        res.status(400).json({
            error: error.message,
        });
        return;
    }

    console.error(error);
    res.status(500).json({
        error: error.message,
    });
}

router.get("/", (req, res) => {
    res.json(books.select()).end();
});

router.get("/:id", (req, res) => {
    const book = books.get(req.params.id);
    res.json(book).end();
});

router.post("/", (req, res) => {
    const id = books.insert(req.body);
    const book = books.get(id);

    res.status(201).json(book).end();
});

router.put("/:id", (req, res) => {
    books.update(req.params.id, req.body);
    const book = books.get(req.params.id);

    res.json(book).end();
});

router.delete("/:id", (req, res) => {
    books.remove(req.params.id);
    res.status(200).send("ok").end();
    // res.status(204).end();
});

router.use((err, req, res, next) => {
    handleError(res, err);
});

module.exports = router;