function cmdCurrent(argv) {
    const date = new Date();
    const parts = [];
    if (argv.y) {
        parts.push(date.getFullYear());
    }
    if (argv.m) {
        parts.push((date.getMonth() + 1).toString().padStart(2, "0"));
    }
    if (argv.d) {
        parts.push(date.getDate().toString().padStart(2, "0"));
    }
    const format = parts.join("-");

    console.log(format || date.toISOString());
}

module.exports.command = ["current", "$0"];
module.exports.describe = "Print current date and time";
module.exports.builder = {
    year: {
        describe: "Print year",
        type: "boolean",
        alias: "y",
    },
    month: {
        describe: "Print month",
        type: "boolean",
        alias: "m",
    },
    date: {
        describe: "Print date",
        type: "boolean",
        alias: "d",
    }
};
module.exports.handler = cmdCurrent;
