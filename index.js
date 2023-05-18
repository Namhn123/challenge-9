// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./utils/generateMarkdown.js")

// TODO: Create an array of questions for user input
const questions = ["What is your GitHub username?", "What is your email address?", "What is your project's name?", "Please write a short description of your project:", "What kind of license should your project have?", "What command should be run to install dependencies?", "What command should be run to run tests?", "What does the user need to know about using the repo?", "What does the user need to know about contributing to the project?"];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
	const filename = "README.md";
	let fileInput = ""
	fileInput += `# ${data.projectName}\n`;

	fileInput += generateMarkdown.renderLicenseBadge(data.license);

	fileInput += `## Description\n${data.description}\n`;

	fileInput += `## Table of Contents\n* [Installation](#installation)\n* [Usage](#usage)\n`;
	fileInput += generateMarkdown.renderLicenseLink(data.license);
	fileInput += `* [Contributing](#contributing)\n* [Tests](#tests)\n* [Questions](#questions)\n`;

	fileInput += `## Installation\nTo install necessary dependencies, run the following command:\n\`\`\`\n${data.install}\n\`\`\`\n`;
	
	fileInput += `## Usage\n${data.usage}\n`;

	fileInput += generateMarkdown.renderLicenseSection(data.license);

	fileInput += `## Contributing\n${data.contribute}\n`;

	fileInput += `## Tests\nTo run tests, run the following command:\n\`\`\`\n${data.test}\n\`\`\`\n`;

	fileInput += `## Questions\nIf you have any questions about the repo, open an issue or contact me directly at ${data.email}. You can find more of my work at [${data.username}](https://github.com/${data.username})\n`;
	
	fs.writeFile(filename, fileInput, (err) => err ? console.log(err) : console.log('Generating README...'));
}

// TODO: Create a function to initialize app
function init() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "username",
        message: questions[0]
      },
      {
        type: "input",
        name: "email",
        message: questions[1]
      },
      {
        type: "input",
        name: "projectName",
        message: questions[2]
      },
      {
        type: "input",
        name: "description",
        message: questions[3]
      },
      {
        type: 'list',
        name: 'license',
        message: questions[4],
        choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"]
      },
      {
        type: "input",
        name: "install",
        message: questions[5],
        default: "npm i"
      },
      {
        type: "input",
        name: "test",
        message: questions[6],
        default: "npm test"
      },
      {
        type: "input",
        name: "usage",
        message: questions[7]
      },
      {
        type: "input",
        name: "contribute",
        message: questions[8]
      }
		]).then((data) => {
			writeToFile("README.md", data);
		});}

// Function call to initialize app
init();
