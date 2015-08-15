var sellCache = {
  1: 1,
  0: 0
};

var exchange = function (coin) {
  return [
    Math.floor(coin/2),
    Math.floor(coin/3),
    Math.floor(coin/4)
  ];
};

var sell = function (coin) {
  if (sellCache[coin] != null) {
    return sellCache[coin];
  }
  var exchangedCoinsValue = exchange(coin).reduce(function (acc, coin) {
    return acc + sell(coin);
  }, 0);
  return sellCache[coin] = Math.max(coin, exchangedCoinsValue);
}

process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    var lines = chunk.toString().split(/\n/);
    lines.forEach(function (line) {
      var coin = parseInt(line, 10);
      console.log(sell(coin));
    });
  }
});