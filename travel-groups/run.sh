node app.js &
pid=$!
sleep 1
mocha --recursive
kill -9 $pid