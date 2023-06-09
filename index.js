const express = require('express');
const app = express();
const { json } = require('express');
app.use(json());
const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to the Database!'))

const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');

app.use("/api/auth", userRouter);
app.use("/api/articles", postRouter);

app.get('/', (req, res) => {
  res.send('Welcome to blogApp 🙌');
});

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
})