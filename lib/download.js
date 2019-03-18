const rimraf = require('rimraf');
const path = require('path');
const ora = require('ora');
const mkdirp = require('mkdirp');
const exec = require("child_process").exec;
const urllib = require('urllib');
const compressing = require('compressing');
const shell = require('shelljs');
const os = require('os');
const chalk = require('chalk');
const log = console.log;

function runVersionCommand(command, cb) {
  return new Promise((resolve, reject) => {
    exec(command, function(execError, stdin, stderr) {
      if(execError) {
        reject(execError)
      }else{
        resolve(stdin.toString().split('\n')[0].trim())
      }
    });
  }) 
};

async function getPackageInfo(name) {
  var registry = await runVersionCommand.call(null, "npm get metrics-registry");
  const url = `${registry+name}/latest`; 
  try{
    const result = await urllib.request(url,{dataType: 'json',followRedirect: true,timeout: 10000});
    return result.data;
  }catch(err){
    throw err;
  }
};

function copy(sourceDir, projectDir, type = { dir: ''}) {
  shell.cp('-R', path.join(sourceDir, '.'), projectDir);
}

function rm(dir) {
  return new Promise((resolve, reject) => {
    rimraf(dir, function(err) {
       if(err) {
         reject(err)
       }
       resolve(true);
    });
  })
};

function mk(dir) {
  return new Promise((resolve, reject) => {
    mkdirp(dir, function(err) {
       if(err) {
         reject(err)
       }
       resolve(true);
    });
  })
}


module.exports = class Download{
  constructor(){
    this.tempDir =  path.join(os.tmpdir(), 'cli-init');
    this.spinner = null;
  };

  async init (dir, pkgName, step ={}, type = {}) {
    const name = step.name || pkgName;
    const projectDir = path.join(dir, name);
    this.spinner = ora(`Creating for production ${name}`);
    const sourceDir = await this.download(name, type);
    await mk(projectDir);
    copy(sourceDir, projectDir);
    this.spinner.stop();
    log(`🎉  Successfully created project ${chalk.yellow(name)}.`)
    log(`👉  Get started with the following commands:\n`+
        chalk.cyan(` ${chalk.blue('$')} cd ${name}\n`)+
        chalk.cyan(` ${chalk.blue('npm i && npm start')}\n`)
    );
  };

  async download (name, type) {
    this.spinner.start();
    const result = await getPackageInfo(type.type);
    const tgz = result.dist.tarball;
    await rm(this.tempDir);
    const response = await urllib.request(tgz, { streaming: true, followRedirect: true });
    await compressing.tgz.uncompress(response.res, this.tempDir);
    return path.join(this.tempDir,'/package');
  }
};