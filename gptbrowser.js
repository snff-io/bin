#!/usr/bin/env node
const blessed = require('blessed');

const contrib = require('blessed-contrib');
const fs = require('fs');
const { exec } = require('child_process');
const os = require('os');
const path = require('path');
let selectedFilePath = "";
// Initialize Blessed screen
const screen = blessed.screen({
  smartCSR: true
});

// Create a list for the left navigation pane
const leftNavList = blessed.list({
  parent: screen,
  width: '30%',
  height: '100%',
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    border: {
      fg: '#f0f0f0'
    },
    selected: {
      bg: 'blue',
      fg: 'white'
    }
  },
  keys: true,
  vi: true,
  mouse: true,
  items: [],

});

// Create a box to contain the preview pane
const previewBox = blessed.box({
  left: '30%',
  width: '70%',
  height: '50%',
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    border: {
      fg: '#f0f0f0'
    }
  }
});

// Append the preview box to the screen
screen.append(previewBox);

const picture = contrib.picture({
  top: '50%',
  left: '30%',
  width: '70%',
  height: '50%',
  border: 'line',
  style: {
    border: { fg: 'blue' },
    scrollbar: { bg: 'blue' },
  }
});

let picappended = false;

// Function to update the left navigation pane with the contents of a directory
function updateLeftNav(dirPath) {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      leftNavList.setItems([`Error reading directory: ${err}`]);
      screen.render();
      return;
    }

    leftNavList.setItems(files);
    screen.render();
  });
}

function displayFilePreview(filePath) {
  if (filePath.toLowerCase().endsWith('.jpeg') || filePath.toLowerCase().endsWith('.jpg')) {
    // Set the file path for the picture widget
    if (filePath) {
      picture.setImage(filePath);
      if (!picappended) {
        screen.append(picture);
        picappended = true;
      }

      screen.render();
    } else {
      console.error('Error: filePath is undefined or empty.');
    }
  } else {
    exec(`cat "${filePath}"`, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error displaying file: ${err}`);
      } else {
        previewBox.setContent(stdout);
      }
      screen.render();
    });
  }
}

// Function to append file path to selection list
function appendToSelectionList(filePath) {
  const selectionListPath = `${os.homedir()}/selection.list`;
  fs.appendFile(selectionListPath, `${filePath}\n`, err => {
    if (err) {
      console.error(`Error appending to selection list: ${err}`);
    }
  });
}


// Event listener for arrow key presses in the left navigation pane
leftNavList.on('select', function (item, index) {
  selectedFilePath = `${targetPath}/${item.content}`;

  fs.stat(selectedFilePath, (err, stats) => {
    if (err) {
      previewBox.setContent(`Error accessing file: ${err}`);
      screen.render();
      return;
    }

    if (stats.isFile()) {
      displayFilePreview(selectedFilePath);

    }
  });
});

// Handling key events
screen.key(['escape', 'C-q'], function (ch, key) {
  return process.exit(0);
});

screen.key(['space'], function (ch, key) {
  appendToSelectionList(selectedFilePath);
});

screen.key(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'], function (ch, key) {
  const keyNumber = parseInt(ch);
  const childDirectoryName = keyNumber.toString();

  // Example: selectedFilePath = '/path/to/selected/file.txt'

  const selectedFileName = path.basename(selectedFilePath);

  const childDirectoryPath = path.join("./", childDirectoryName);
  const copiedFilePath = path.join(childDirectoryPath, selectedFileName);

  // Check if the child directory exists, if not create it
  if (!fs.existsSync(childDirectoryPath)) {
    fs.mkdirSync(childDirectoryPath);
  }

  // Copy the file to the child directory

  fs.renameSync(selectedFilePath, copiedFilePath);

  updateLeftNav("./")

  leftNavList.focus();
  screen.render();


  return false;
});

// Set the target path as a parameter, defaulting to the current working directory
const targetPath = process.argv[2] || process.cwd();
// Initial update of the left navigation pane with the current directory contents
updateLeftNav(targetPath);
// Focus on the left navigation list
leftNavList.focus();

// Render the screen
screen.render();
