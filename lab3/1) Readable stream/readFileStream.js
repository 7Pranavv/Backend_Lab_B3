const fs = require('fs');
const path = 'data.txt';

// Check if file exists
if (fs.existsSync(path)) {
  const readable = fs.createReadStream(path, { encoding: 'utf8' });

  readable.on('data', (chunk) => {
    console.log('File content chunk:', chunk);
  });

  readable.on('end', () => {
    console.log('Finished reading file.');
  });

  readable.on('error', (err) => {
    console.error('Error while reading file:', err.message);
  });
} else {
  console.error('Error: File does not exist.');
}
