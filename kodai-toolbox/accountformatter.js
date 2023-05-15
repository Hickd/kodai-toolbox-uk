const inquirer = require('inquirer');
const fs = require('fs');
const csv = require('csv-parser');
const csvWriter = require('csv-write-stream');
const clc = require('cli-color');


const restart = {

    type: 'input',
    name: 'restart',
    message: 'Restart Program? (y/n)'
};


const accountFormatter = () => {

class info {
constructor(EMAIL, PASSWORD, PHONENUMBER, FIRSTNAME, LASTNAME, ACC_CONFIG) {
this.EMAIL = EMAIL;
this.PASSWORD = PASSWORD;
this.PHONENUMBER = PHONENUMBER;
this.FIRSTNAME = FIRSTNAME;
this.LASTNAME = LASTNAME;
this.ACC_CONFIG = ACC_CONFIG;

}

}

let tasks = [];

fs.createReadStream('profiles.csv')
.pipe(csv())
.on('data', (row) => {


    tasks.push(new info(row.EMAIL, row.PASSWORD, row.PHONENUMBER, row.FIRSTNAME, row.LASTNAME, row.ACC_CONFIG));


}).on('end', () => {

    process.title = `Kodai Toolbox | Made by Olly Hicks | github.com/Hickd | ${tasks.length} tasks Loaded`


    let numTasks = tasks.length;

    for (let i = 0; i < numTasks; i++) {

    let _number = tasks[i].PHONENUMBER.substring(3);

    let fullName = tasks[i].FIRSTNAME + ' ' + tasks[i].LASTNAME;


    if (!fs.existsSync('fullname_numbers.csv')) {
        const writer = csvWriter({sendHeaders: false});
        writer.pipe(fs.createWriteStream('phonenumbers.csv'));
        writer.write({

            PHONENUMBER: 'PHONENUMBER',
            FULLNAME: 'FULLNAME',
            
        });
        writer.end();
      }
      const writer = csvWriter({sendHeaders: false});
    writer.pipe(fs.createWriteStream('fullname_numbers.csv', {flags: 'a'}));
    writer.write({

        PHONENUMBER: _number,
        FULLNAME: fullName,

    });
    writer.end();

    let formattedAccount = tasks[i].EMAIL + ':' + tasks[i].PASSWORD + ':' + tasks[i].ACC_CONFIG;

    fs.appendFileSync('accounts.txt', formattedAccount + '\n');

    console.log(clc.green(`Formatted Account ${i + 1} of ${numTasks}`));

    }

    console.log(clc.green('All accounts formatted!'));

});

}

module.exports = accountFormatter;