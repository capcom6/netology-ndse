const uuid = require("uuid");

class Book {
    constructor(id, title, description, authors, favorite, fileCover, fileName) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
    }
}

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

const books = {
    "129239bb-d880-4bd5-9440-8960fa320951": new Book(
        "129239bb-d880-4bd5-9440-8960fa320951",
        "War and Peace",
        "War and Peace is a classic novel of Russian literature.",
        "Leo Tolstoy",
        "",
        "https://upload.wikimedia.org/wikipedia/commons/2/2a/T25-011.jpg",
        "War_and_Peace.txt"
    )
};

const select = () => {
    return Object.values(books);
};

const get = (id) => {
    if (!books[id]) {
        throw new NotFoundError("Book not found");
    }

    return books[id];
};

const insert = (book) => {
    book = validate(book);

    const id = uuid.v4();
    books[id] = new Book(id, book.title, book.description, book.authors, book.favorite, book.fileCover, book.fileName);

    return id;
}

const update = (id, book) => {
    const oldBook = get(id);
    const newBook = validate({
        ...oldBook,
        ...book,
    });

    books[id] = new Book(id, newBook.title, newBook.description, newBook.authors, newBook.favorite, newBook.fileCover, newBook.fileName);
}

const remove = (id) => {
    delete books[id];
}

const validate = (book) => {
    const requiredFields = ["title", "description", "authors"];

    for (const field of requiredFields) {
        if (!book[field]) {
            throw new ValidationError(`"${field}" is required`);
        }
    }

    return book;
}

module.exports = {
    select,
    get,
    insert,
    update,
    remove,
    NotFoundError,
    ValidationError,
};