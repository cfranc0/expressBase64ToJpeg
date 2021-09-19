/**
 * @Author: francesco
 * @Date:   2021-03-20T11:03:05+01:00
 * @Last edit by: francesco
 * @Last edit at: 2021-09-19T21:41:56+02:00
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

  let sl, ext;
  switch (req.body.substring(0, 22)) {
    case `data:image/jpeg;base64`:
      ext = ".jpeg";
      sl = 23;
      break;
    case `data:image/png;base64,`:
      ext = ".png";
      sl = 22;
      break;
  }

  fs.writeFileSync(__dirname+"/store/"+req.params.fileName+ext, Buffer.from(req.body.slice(sl), "base64"));
  res.status(200).send();
})

// Starting the server
const PORT = process.env.PORT || 3500;
http.listen(PORT, () => console.log(`Server started on port ${PORT}`));


module.exports = {app, http};
