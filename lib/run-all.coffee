spawn = require('child_process').spawn
glob = require 'glob'

spawnProcess = (executable, params...) ->
  cmd = spawn executable, params, stdio: 'inherit'
  cmd.on 'close', (code) ->
    console.log "child process #{executable} #{params.join ' '} exited with code #{code}" if code

module.exports = (testPattern) ->
  glob testPattern, (e, testFiles) ->
    if e
      console.log e
      process.exit 1

    testFiles.forEach (testFile) ->
      spawnProcess 'coffee', testFile