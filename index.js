const inquirer = require('inquirer');
const fs = require('fs');
const generateTeam = require("./src/template")

const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");

const newStaffmemberData = [];

const questions = async () => {
    const answers = await inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is your name?',
            },
            {
                type: 'input',
                name: 'id',
                message: 'What is your ID?',
            },
            {
                type: 'input',
                name: 'email',
                message: 'What is your email',
            },
            {
                type: 'list',
                name: 'role',
                message: 'What is your role?',
                choices: ["Engineer", "Manager", "Intern"],
            },
        ])


    if (answers.role === "Manager") {
        const managerAns = await inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is your Office number?",
                    name: "officeNumber",
                },
            ])
        const newManager = new Manager(
            answers.name,
            answers.id,
            answers.email,
            managerAns.officeNumber
        );
        newStaffmemberData.push(newManager);
    }
    else if (answers.role === "Engineer") {
        const githubAns = await inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is your GitHub username?",
                    name: "github",
                }
            ])
        const newEngineer = new Engineer(
            answers.name,
            answers.id,
            answers.email,
            githubAns.github,
        );
        newStaffmemberData.push(newEngineer);
    }
    else if (answers.role === "Intern") {
        const internAns = await inquirer
            .prompt([
                {
                    type: "input",
                    message: "What university did you attend?",
                    name: "school",
                },
            ])
        const newIntern = new Intern(
            answers.name,
            answers.id,
            answers.email,
            internAns.school,
        );
        newStaffmemberData.push(newIntern);
    };
}

async function promptQuestions() {
    await questions()

    const addMemberAns = await inquirer
        .prompt([
            {
                name: "addMember",
                type: "list",
                choices: ['Add a new member', "Create team"],
                message: "What would you like to do next?"
            }
        ])

    if (addMemberAns.addMember === "Add a new member") {
        return promptQuestions()
    }
    return createTeam();
}
promptQuestions();

function createTeam() {
    console.log("employee array", newStaffmemberData)
    fs.writeFileSync(
        "/Users/avaciajimenez/Desktop/homework/team-generator-node/index.html",
        generateTeam(newStaffmemberData),
        "utf-8"
    )
};

// function generateTeam(employeeArray) {
//     let htmlString=`<!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <meta http-equiv="X-UA-Compatible" content="ie=edge">
//       <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
//       <title>Document</title>
//     </head>
//     <body>`

//     //append sections to html for each employee
//     for (i=0; i< newStaffmemberData.length; i++){
//         const role = newStaffmemberData[i].getRole()
//         if (role === "Manager"){
//             htmlString += generateTeam.generateManager()
//         }
//     }
//    htmlString += `${employeeArray.answers}`
//     htmlString += `</body> </html>`
//     return htmlString
// }