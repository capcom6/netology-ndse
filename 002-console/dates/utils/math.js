const measuresBuilderTemplate = {
    year: {
        describe: "Number of years",
        type: "number",
        alias: "y",
    },
    month: {
        describe: "Number of months",
        type: "number",
        alias: "m",
    },
    date: {
        describe: "Number of days",
        type: "number",
        alias: "d",
    }
};

function cmdCalculated(argv, k) {
    const date = new Date();

    date.setFullYear(date.getFullYear() + k * (argv.y || 0));
    date.setMonth(date.getMonth() + k * (argv.m || 0));
    date.setDate(date.getDate() + k * (argv.d || 0));

    console.log(date.toISOString());
}

module.exports = {
    measuresBuilderTemplate,
    cmdCalculated,
};