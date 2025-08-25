const fs = require('fs');

// Intentionally reading a non-existent file
const readable = fs.createReadStream('nonexistent.txt', { encoding: 'utf8' });

readable.on('data', (chunk) => {
  console.log(chunk);
});

readable.on('error', (err) => {
  console.error('An error occurred while reading:', err.message);
});
