//included all necessary packages and files
const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./utils/generateMarkdown.js")

//array for questions
const questions = ["What is your GitHub username?", "What is your email address?", "What is your project's name?", "Please write a short description of your project:", "What kind of license should your project have?", "What command should be run to install dependencies?", "What command should be run to run tests?", "What does the user need to know about using the repo?", "What does the user need to know about contributing to the project?"];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
	const filename = "README.md";
	
	let fileInput = "";//string that will be used to write into the file

	//adding project name header to string
	fileInput += `# ${data.projectName}\n`;

	//adding the link to license badge image to string
	fileInput += generateMarkdown.renderLicenseBadge(data.license);

	//adding the description of the project to the string
	fileInput += `## Description\n${data.description}\n`;

	//adding the table of contents to the string
	fileInput += `## Table of Contents\n* [Installation](#installation)\n* [Usage](#usage)\n`;
	fileInput += generateMarkdown.renderLicenseLink(data.license);
	fileInput += `* [Contributing](#contributing)\n* [Tests](#tests)\n* [Questions](#questions)\n`;

	//adding how to install the necessary dependencies to string
	fileInput += `## Installation\nTo install necessary dependencies, run the following command:\n\`\`\`\n${data.install}\n\`\`\`\n`;
	
	//adding what user needs to know to use project to string
	fileInput += `## Usage\n${data.usage}\n`;

	//adding license section to string
	fileInput += generateMarkdown.renderLicenseSection(data.license);

	//adding how to contribute to string
	fileInput += `## Contributing\n${data.contribute}\n`;

	//adding how to run tests to string
	fileInput += `## Tests\nTo run tests, run the following command:\n\`\`\`\n${data.test}\n\`\`\`\n`;

	//adding how to contact the user to string
	fileInput += `## Questions\nIf you have any questions about the repo, open an issue or contact me directly at ${data.email}. You can find more of my work at [${data.username}](https://github.com/${data.username})\n`;
	
	//using the entire string to write into a file
	fs.writeFile(filename, fileInput, (err) => err ? console.log(err) : console.log('Generating README...'));
}

// TODO: Create a function to initialize app
function init() {
	//uses inquirer to ask user for prompts
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
