#!/usr/bin/env node

const yargs = require("yargs");

require("dotenv").config();

yargs
    .command(require("./commands/weather"))
    .strict()
    .demandCommand(0, 1)
    .help()
    .parse();