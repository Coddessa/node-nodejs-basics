const parseArgs = () => {
  const x = process.argv.slice(2);

  for (let i = 0; i < x.length; i += 2) {
    const a = x[i].replace(/^--/, "");
    const b = x[i + 1];
    console.log(`${a} is ${b}`);
  }
};
parseArgs();
