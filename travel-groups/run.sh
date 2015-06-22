node app.js &
pid=$!
mocha --recursive
kill -9 $pid