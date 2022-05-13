process.stdin.on('data', (data) => {
  console.log(data.reverse().toString().slice(1));
});
