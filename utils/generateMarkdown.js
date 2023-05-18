//returns badge img string
function renderLicenseBadge(license) {
  if (license === "None") {
    return("");
  } else {
    return(`![GitHub license](https://img.shields.io/badge/license-${license.replaceAll(" ", "_")}-blue.svg)\n`)
  }
}

//returns license link string for table of contents
function renderLicenseLink(license) {
  if (license === "None") {
    return("");
  } else {
    return("* [License](#license)\n");
  }
}

//returns the string of license section
function renderLicenseSection(license) {
  if (license === "None") {
    return("");
  } else {
    return(`## License\nThis project is licensed under the ${license} license.\n`);
  }
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  return `# ${data.title}`;
}

module.exports = {renderLicenseBadge, renderLicenseLink, renderLicenseSection, generateMarkdown};
