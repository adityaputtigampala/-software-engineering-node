const express = require('express');
const app = express();

console.log("Successfully connected to MongoDB.")


app.get('/hello', (req, res) =>
  res.send('Hello World!'));

const PORT = 4000;
app.listen(PORT);
