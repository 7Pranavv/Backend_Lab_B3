const fs = require('fs');

const writable = fs.createWriteStream('output.txt');

// Write string to file (overwrite if exists)
writable.write("Hello, Node.js!", (err) => {
  if (err) {
    console.error('Error writing to file:', err.message);
  } else {
    console.log('Data written successfully to output.txt');
  }
});

writable.end();

