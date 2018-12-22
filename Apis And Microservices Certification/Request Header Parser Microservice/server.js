const express = require('express');
const app = express();

app.use(express.static('public'));

app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/api/whoami", (req, res) => {
  const responseJSON = {
    "ipaddress": req.get("x-forwarded-for").split(",")[0],
    "language": req.get("accept-language").split(",")[0],
    "software": req.get("user-agent").split("(")[1].split(")")[0]
  }
  res.send(responseJSON);
});

const listener = app.listen(process.env.PORT, () => {
  console.log('The app is listening on port ' + listener.address().port);
});
