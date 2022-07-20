const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mysql = require('mysql');

const db = require("./models/index");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.json())
app.use(express.static('public'))

db.sequelize.sync()
     .then(() => {
          console.log("Database Connected Succeessfully.");
     })
     .catch((err) => {
          console.log("Failed to Connect db: " + err.message);
     });

//Establish the server connection
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
     res.json({ message: "Task using Mysql, Express.js, React.js and Nodejs." });
});

const userRouter = require("./routes/users.routes");
const postRouter = require("./routes/posts.routes")

app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);


app.listen(port, () => console.log(`Listening on port http://localhost:${port}`));