module.exports = (f, ...additionalArgs) => (...args) =>
  new Promise((resolve, reject) =>
    f.apply(this, [
      ...args,
      ...additionalArgs,
      (err, result) => (err ? reject(err) : resolve(result))
    ])
  );
