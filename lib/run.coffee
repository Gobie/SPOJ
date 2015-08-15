fs = require 'fs'
path = require 'path'
exec = require('child_process').exec
diff = require 'diff'
colors = require 'colors/safe'

runners =
  '.sh': 'sh'
  '.js': 'node'
  '.php': 'php'

onlySolutions = (filename) ->
  /^solution/.test filename

toCommands = (dir) ->
  (filename) ->
    runners[path.extname filename] + ' ' + dir + path.sep + filename

runSolution = (inputFile, output) ->
  (command) ->
    runCommand "cat #{inputFile} | #{command}", processResult(command, output)

runCommand = (cmd, next) ->
  exec cmd, (e, out, err) ->
    next e if e
    next err if err
    next null, out

processResult = (command, output) ->
  (e, result) ->
    return console.log e if e

    difference = diff.diffChars output, result.trim()
    isInvalidRun = difference.some (part) -> part.added or part.removed
    if isInvalidRun
      solutionFailed command, difference
    else
      solutionPassed command

solutionFailed = (command, difference) ->
  console.log colors.red('Solution Failed:'), command
  difference.forEach (part) ->
    color = if part.added then colors.green else if part.removed then colors.red else colors.grey
    process.stdout.write color part.value.replace /\n/g, "\\n\n"

solutionPassed = (command) ->
  console.log colors.green('Solution Passed:'), command

module.exports = ->
  dir = path.dirname process.argv[1]
  inputFile = "#{dir}#{path.sep}input.txt"
  outputFile = "#{dir}#{path.sep}output.txt"
  output = fs.readFileSync(outputFile).toString()

  fs.readdirSync dir
  .filter onlySolutions
  .map toCommands dir
  .forEach runSolution inputFile, output
