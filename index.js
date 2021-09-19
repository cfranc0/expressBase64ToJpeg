/**
 * @Author: francesco
 * @Date:   2021-03-20T11:03:05+01:00
 * @Last edit by: francesco
 * @Last edit at: 2021-09-19T19:30:10+02:00
 */

const express = require("express");
const path = require("path");
var bodyParser = require('body-parser');

const app = express();
const http = require('http').createServer(app);

const fs = require('fs');

app.use((req, res, next) => {

  res.set({
    'Access-Control-Allow-Origin': req.get("origin") || "",
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Allow-Methods': 'OPTIONS,POST'
  });

  if (req.method === "OPTIONS") return res.status(200).send();

  next();

})

app.use(bodyParser.text({limit: '5mb'}));

app.post("/:fileName", (req, res) => {

  fs.writeFileSync(__dirname+"/store/"+req.params.fileName+".png", Buffer.from(req.body.slice(23), "base64"));

  res.status(200).send();
})

// Starting the server
const PORT = process.env.PORT || 3500;
http.listen(PORT, () => console.log(`Server started on port ${PORT}`));


module.exports = {app, http};
