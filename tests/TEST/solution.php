<?php
while ($line = fscanf(STDIN, "%d\n")) {
  if ($line[0] === 42) break;
  fputs(STDOUT, $line[0] . "\n");
}
?>