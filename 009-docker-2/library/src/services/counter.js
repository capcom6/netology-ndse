const { COUNTER_URL } = require("../config");

const get = async (bookId) => {
    const url = `${COUNTER_URL}/api/counter/${bookId}`;
    const response = await fetch(url);
    const { count } = await response.json();
    return count;
};

const incr = async (bookId) => {
    const url = `${COUNTER_URL}/api/counter/${bookId}/incr`;
    const response = await fetch(url, {
        method: "POST",
    });
    const { count } = await response.json();
    return count;
};

module.exports = {
    get,
    incr,
};
