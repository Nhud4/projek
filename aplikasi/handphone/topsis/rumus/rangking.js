async function rangking(preferensi) {
  var sorted = preferensi.slice().sort(function (a, b) { return b - a })
  var ranks = preferensi.slice().map(function (v) { return sorted.indexOf(v) + 1 });

  return ranks;
};

function arrayToJSONObject(arr) {
  var keys = arr[0];

  var newArr = arr.slice(1, arr.length);

  var formatted = [],
    data = newArr,
    cols = keys,
    l = cols.length;
  for (var i = 0; i < data.length; i++) {
    var d = data[i],
      o = {};
    for (var j = 0; j < l; j++) o[cols[j]] = d[j];
    formatted.push(o);
  }
  return formatted;
}

module.exports = {
  rangking,
};
