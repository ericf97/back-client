module.exports = (err, req, res, next) => {
  if (err) {
    console.error(err);
    res.status(400).send(err.message);
    next();
    return;
  }
  console.log(err);
  res.status(400).send({
    errors: [{
      message: 'Something went wrong',
    }],
  });
};
