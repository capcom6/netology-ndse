const books = require("../repositories/books");

const counter = require("./counter");

const select = async () => {
    const items = books.select();

    return Promise.all(items.map(async (item) => {
        const count = await counter.get(item.id);
        return { ...item, views: count };
    }));
}

const get = async (id, options = {}) => {
    const { incrCounter = false } = options;

    const book = books.get(id);
    const count = incrCounter
        ? await counter.incr(book.id)
        : await counter.get(book.id);

    return { ...book, views: count };
}

const insert = async (book) => {
    return books.insert(book);
}

const update = async (id, book) => {
    return books.update(id, book);
}

const remove = async (id) => {
    return books.remove(id);
}

module.exports = {
    select,
    get,
    insert,
    update,
    remove,
};