const inquirer = require('inquirer');
const accountFormatter = require('./accountformatter');

const homepage = {

    type: 'list',
    name: 'homepage',
    message: 'Would you like to start?',
    choices: ['Start']

}

const _homepage = () => {

process.title = 'Kodai Toolbox | Made by Olly Hicks | github.com/Hickd'

inquirer.prompt(homepage).then((answers) => {

    console.clear();

    if (answers.homepage === 'Start') {

        console.clear();

        accountFormatter();

    }
    else {

        process.exit();
    }
});

}

_homepage();