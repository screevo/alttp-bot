module.exports = {};

const fs = require('fs'),
  path = require('path');

const commandsFilePath = path.join(__dirname, 'conf', 'text_commands');

// Read in basic text commands / definitions and watch for changes
let commands = parseCommands(commandsFilePath);
fs.watchFile(commandsFilePath, (curr, prev) => {
  if (curr.mtime !== prev.mtime) {
    commands = parseCommands(commandsFilePath);
  }
});

// Read/parse text commands from the "database"
function parseCommands(filePath)
{
  let commands = {};
  let data = fs.readFileSync(filePath, 'utf-8');
  let commandLines = data.toString().split('\n');
  let commandParts;
  commandLines.forEach(function(line) {
    commandParts = line.split('|');
    commands[commandParts[0]] = commandParts[1];
  });
  return commands;
}

function exists(command)
{
  return commands.hasOwnProperty(command);
}

function get(command)
{
  if (exists(commmand)) {
    return commands[command];
  }
}