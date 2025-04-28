const parseEnv = () => {
  const x = process.env;

  const y = Object.entries(x)
    .filter(([k]) => k.startsWith("RSS_"))
    .map(([k, v]) => `${k}=${v}`);

  console.log(y.join("; "));
};

parseEnv();
