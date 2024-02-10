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

// AWS Serverless Express
const awsServerlessExpress = require('aws-serverless-express');

const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');

app.use("/api/auth", userRouter);
app.use("/api/articles", postRouter);

app.get('/', (req, res) => {
  res.send('Welcome to blogApp 🙌');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to the Database!'))
    .catch(err => console.error('Could not connect to MongoDB.', err));

// Remove the traditional server listen method
// app.listen(PORT, () => {
//   console.log(`server listening on ${PORT}`);
// });

// Create a server for aws-serverless-express to use
const server = awsServerlessExpress.createServer(app);

// Export the handler function for AWS Lambda
exports.handler = (event, context) => {
  awsServerlessExpress.proxy(server, event, context);
};