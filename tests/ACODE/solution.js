var cache = {};
var codewords = {};

for (var i = 1; i < 27; i++) {
  codewords[i + ''] = String.fromCharCode('A'.charCodeAt(0) - 1 + i);
};

var getPossibleLinesAfterCodewordRemoval = function (line) {
  var out = [];
  var codeword = '';

  var strLen = Math.min(line.length, 2);
  for (var i = 0; i < strLen; i++) {
    codeword = line[line.length - 1 - i] + codeword;
    if (codewords[codeword]) {
      out.push(line.substr(0, line.length - 1 - i));
    }
  };

  return out;
}

var calc = function (line) {
  if (!line.length) {
    return 1;
  }

  var lines = getPossibleLinesAfterCodewordRemoval(line);
  if (!lines.length) {
    return 0;
  }

  var sum = 0;
  for (var i = 0; i < lines.length; i++) {
    if (!cache[lines[i]]) {
      var result = calc(lines[i]);
      if (result === 0) {
        return 0;
      }
      cache[lines[i]] = result;
    }

    sum += cache[lines[i]];
  };

  return sum;
}

process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
  if (chunk === null) {
    return;
  }
  var lines = chunk.toString().split(/\n/);
  for (var i = 0; i < lines.length; i++) {
    if (lines[i] === '0') {
      return;
    }
    console.log(calc(lines[i]));
  };
});