const express = require("express");
const morgan = require("morgan");
const apiRouter = require("./routes");
const port = 3000;

//creating an instance of express server
const app = express();

//express.json is a middleware. It returns a middleware that will parse the request body as json
app.use(express.json());

app.use(morgan("dev"));

app.use("/api/v1", apiRouter);

app.get("/hello", (req, res, next) => {
  try {
    res.send("World");
  } catch (error) {
    next(error);
  }
});

//404 error handler
app.use((req, res, next) => {
  try {
    res.status(404).send("No Page Found");
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res) => {
  res.status(err.status || 500).send(err.msg || "Unknown issue in server");
});

app.listen(port, () => {
  console.log(`Server running...`);
});
