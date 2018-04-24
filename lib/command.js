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
        package: "react-typescript-mobx"
    },
    {
        name: `create ${chalk.green('React + Typescript + Redux')}`,
        value: "react-typescript-redux",
        package: "react-typescript-redux"
    },
    {
        name: `create ${chalk.green('React + MobX')}`,
        value: "react-mobx",
        package: "react-mobx"
    },
    {
        name: `create ${chalk.green('React + Redux')}`,
        value: "react-redux-webpack",
        package: "react-redux-webpack"
    },
    {
        name: `create ${chalk.green('Vue + Typescript + Vuex')}`,
        value: "vue-typescript-vuex",
        package: "vue-typescript-vuex"
    },
    {
        name: `create ${chalk.green('Vue + Vuex')} `,
        value: "vue-vuex-webpack",
        package: "vue-vuex-webpack"
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
            case 'react-typescript-redux':
                inquirer.prompt(steps).then( step => {
                    download.init(projectDir, pkgName, step, {
                        type
                    });
                });
                break;
            case 'react-mobx':
                inquirer.prompt(steps).then( step => {
                    download.init(projectDir, pkgName, step, {
                        type
                    });
                });
                break;
            case 'react-redux-webpack':
                inquirer.prompt(steps).then( step => {
                    download.init(projectDir, pkgName, step, {
                        type
                    });
                });
                break;
            case 'vue-typescript-vuex':
                inquirer.prompt(steps).then( step => {
                    download.init(projectDir, pkgName, step, {
                        type
                    });
                });
                break;
            case 'vue-vuex-webpack':
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