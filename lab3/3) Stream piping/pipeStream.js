const fs = require('fs');

const readable = fs.createReadStream('input.txt');
const writable = fs.createWriteStream('output.txt');

readable.pipe(writable);

writable.on('finish', () => {
  console.log('Data piped from input.txt to output.txt successfully.');
});

readable.on('error', (err) => {
  console.error('Error reading input.txt:', err.message);
});

writable.on('error', (err) => {
  console.error('Error writing to output.txt:', err.message);
});
