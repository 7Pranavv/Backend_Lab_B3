process.stdout.write("Enter your name: ");

process.stdin.on('data', (input) => {
  const name = input.toString().trim();
  console.log(`Hello, ${name}!`);
  process.exit(); // Exit after greeting
});

