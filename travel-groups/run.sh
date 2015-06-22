node app.js &
pid=$!
sleep 2
mocha --recursive
kill -9 $pid