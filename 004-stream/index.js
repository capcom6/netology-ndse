#!/usr/bin/env node

const yargs = require("yargs");

yargs
    .option("log-file", {
        alias: "l",
        type: "string",
        describe: "Log file name",
        default: "game.log"
    })
    .command(require("./commands/play"))
    .command(require("./commands/stats"))
    .strict()
    .demandCommand(0, 1)
    .help()
    .parse();
