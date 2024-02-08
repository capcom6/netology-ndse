#!/usr/bin/env node

const yargs = require("yargs");

yargs
    .command(require("./commands/current"))
    .command(require("./commands/add"))
    .command(require("./commands/sub"))
    .strict()
    .demandCommand(0, 1)
    .help()
    .parse()