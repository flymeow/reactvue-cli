#!/usr/bin/env node
'use strict'
const path = require("path");
const program = require("commander");
const chalk = require("chalk");
const command = require("../lib/command");
const pkg = require(path.join(__dirname, '../package.json'));

program
    .version(pkg.version);

program
    .command("init")
    .option("-r, --registry [url]", "defalut https://registory.npmjs.org")
    .description("init webpack config for vue/React")
    .action(options => {
       command.init(options);
    });


program.parse(process.argv);

