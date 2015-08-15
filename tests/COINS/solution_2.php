<?php
function exchange($coin) {
  return [
    floor($coin/2),
    floor($coin/3),
    floor($coin/4)
  ];
};

function sellCoins($coins) {
  $value = 0;
  foreach ($coins as $coin) {
    $value += sell(intval($coin));
  }
  return $value;
}

function sell($coin) {
  static $sellCache = [
    1 => 1,
    0 => 0
  ];

  if (array_key_exists($coin, $sellCache)) {
    return $sellCache[$coin];
  }
  return $sellCache[$coin] = max($coin, sellCoins(exchange($coin)));
};

while (false !== ($line = fgets(STDIN))) {
  echo sell(+$line) . "\n";
}
?>