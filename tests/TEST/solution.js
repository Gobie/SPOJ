process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    var parts = ('' + chunk).split("\n42\n");
    process.stdout.write(parts[0]);
  }
});