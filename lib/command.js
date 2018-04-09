'use strict';
const inquirer = require("inquirer");
const chalk = require("chalk");
const assert = require("assert");
const Download = require("./download");
const projectDir = process.cwd();


const types = [
    {
        name: `create ${chalk.green('React + Typescript + MobX')}`,
        value: "react-typescript-mobx",
        package: "react-typescript-mobx-template"
    },
    {
        name: `create ${chalk.green('React + Typescript + Redux')}`,
        value: "react-typescript-redux",
        package: "react-typescript-redux-template"
    },
    {
        name: `create ${chalk.green('React + MobX')}`,
        value: "react-mobx",
        package: "react-mobx-template"
    },
    {
        name: `create ${chalk.green('React + Redux')}`,
        value: "react-redux",
        package: "react-redux-template"
    },
    {
        name: `create ${chalk.green('Vue + Typescript + Vuex')}`,
        value: "vue-typescript-vuex",
        package: "vue-typescript-vuex-template"
    },
    {
        name: `create ${chalk.green('Vue + Vuex')} `,
        value: "vue-vuex",
        package: "vue-vuex-template"
    },
];

let getName = (type) => {
    let list = types.filter( item => type === item.value);
    return list.length>0 ? list[0].package: null;
};

const steps = [
    {
        type: 'input',
        name: 'name',
        message: 'Please input project name:'
    }
];

exports.init = options => {
   inquirer.prompt([
       {
           type:'list',
           name: 'type',
           message: '请选择创建项目类型， please choice the create project type',
           choices: types
       }
   ]).then( res => {
        const download = new Download(options);
        const type = res.type;
        const pkgName = getName(type);
        switch (type) {
            case 'react-typescript-mobx':
                inquirer.prompt(steps).then( step => {
                    download.init(projectDir, pkgName, step, {
                        type
                    });
                });
                break;
            default:
                break;
        }
   })
};