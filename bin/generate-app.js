#! /usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

if (process.argv.length < 3) {
  console.log('You have to provide a name to your app.');
  console.log('For example :');
  console.log('    npx create-my-boilerplate my-app');
  process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const GIT_REPO = 'https://github.com/Clzzi/react-typescript-boilerplate.git';

if (projectName !== '.') {
  try {
    fs.mkdirSync(projectPath);
  } catch (err) {
    if (err.code === 'EEXIST') {
      console.log(projectName);
      console.log(
        `The filename "${projectName}" is already exist in the current directory, please write another name.`
      );
    } else {
      console.log(error);
    }
    process.exit(1);
  }
}

async function main() {
  try {
    console.log('** Downloading Files...');
    execSync(`git clone --depth 1 ${GIT_REPO} ${projectPath}`);

    if (projectName !== '.') {
      process.chdir(projectPath);
    }

    console.log('** Install Deps...');
    execSync('npm install');

    console.log('** Remove unused Files...');
    execSync('npx rimraf ../.git');
    execSync('npx rimraf ../.build');
    execSync('npx rimraf ../.dist');
    execSync('npx rimraf ../.bin');
    execSync('npx rimraf ../.package-lock.json');
    execSync('npx rimraf ../.yarn.lock');
    execSync('npx rimraf ../.README.md');

    console.log('** Complete! Happy Hacking! ');
  } catch (error) {
    console.log(error);
  }
}

main();
