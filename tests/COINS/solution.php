<?php
$sellCache = [
  1 => 1,
  0 => 0
];

function exchange($coin) {
  return [
    floor($coin/2),
    floor($coin/3),
    floor($coin/4)
  ];
};

$sell = function ($coin) use (&$sellCache, &$sell) {
  if (array_key_exists($coin, $sellCache)) {
    return $sellCache[$coin];
  }
  $exchangedCoinsValue = array_reduce(exchange($coin), function ($acc, $coin) use ($sell) {
    return $acc + $sell(intval($coin));
  }, 0);
  return $sellCache[$coin] = max($coin, $exchangedCoinsValue);
};

while ($line = fscanf(STDIN, "%d\n")) {
  list($number) = $line;
  echo $sell($number) . "\n";
}
?>