exports.ok = function (values, res) {
  const data = {
    status: 200,
    values: values,
  };

  res.json(data);
  res.end();
};

exports.exists = function (values, res) {
  const data = {
    status: 205,
    values: values,
  };

  res.json(data);
  res.end();
};

exports.null = function (values, res) {
  const data = {
    status: 203,
    values: values,
  };

  res.json(data);
};
