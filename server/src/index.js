const express = require('express');
const app = express();
const viewsInit = require("./views/index");

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

viewsInit(app);

var server = app.listen(8082, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port) 
})