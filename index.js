const connectToMongo = require("./database");
connectToMongo();

const express = require('express');
var cors = require('cors')
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  methods: ["GET", "PUT", "POST", "DELETE"]
}))
app.use(express.json());

app.use('/auth', require('./routes/auth'));
app.use('/notes', require('./routes/notes'));

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  // const path = require("path");
  // app.get("*", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  // })
}

app.listen(PORT, () => {
  console.log(`Memosify running on ${PORT}`)
});