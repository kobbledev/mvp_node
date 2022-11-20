const express = require('express');
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const socket = require("./socket");

var session = require("express-session");
var redis = require("redis");
var redisStore = require("connect-redis")(session);


dotenv.config({
  path:
    __dirname +
    `${process.env.APP_MODE === "production"
      ? "/./../.env.production"
      : process.env.APP_MODE === "preproduction"
        ? "/./../.env.preproduction"
        : "/./../.env"
    }`,
});

const app = express();
const port = process.env.PORT || 3010;

const redisClient = redis.createClient({
  host: 'localhost',
  port: 6379
})
console.log('##### Server #####  ')

redisClient.on('error', (err) => {
  console.log('Error occured while connecting or accessing redis server');
});
redisClient.on('ready', function () {
  console.log('redis is running');
});


const main = async () => {
  try {
    mongoose
      .connect(process.env.MONGO_DB_CONNECTION_URL,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          monitorCommands: true,
          useFindAndModify: false,
          autoIndex: false, // Don't build indexes
          poolSize: 200, // Maintain up to 100 socket connections
          serverSelectionTimeoutMS: 30000,
        }
      )
      .then((res) => console.log(""))
      .catch((err) => console.log("mongoose connection error ::: " + err));
  } catch (error) {
    console.log("mongoose connection error - " + err)
  }
  let db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.once("open", async function callback() {
    console.log("db connected...!");
    app.set("trust proxy", true);
    app.use(
      session({
        secret: "BRWREDIS",
        name: "_redisPractice",
        resave: false,
        saveUninitialized: true,
        cookie: {
          secure: process.env.NODE_ENV === "production",
          httpOnly: process.env.NODE_ENV === "production",
        }, // Note that the cookie-parser module is no longer needed
        proxy: true,
        store: new redisStore({
          host: "localhost",
          port: 6379,
          client: redisClient,
          ttl: process.env.REDIS_TTL,
        }),
      })
    );

    app.use("/v1/api", require("./routes/index"));
  });
}

main();

app.use(
  cors({
    origin: ["http://localhost:3001","http://localhost:4001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json({
  limit: "10mb",
  verify: (req, res, buf, encoding) => {
    if (buf && buf.length) {
      req.buf = buf;
    }
  }
}));

app.use(express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
app.use("/uploads", express.static("uploads"));
app.use(helmet());

app.get('/', (req, res) => {
  res.send(`Venu mngt backend server is up and pointing to : ${port} ${process.env.NODE_ENV}`);
})

const server = app.listen(port, () => {
  console.log(`Node app listening at http://localhost:${port}`)
});

const io = require("./socket").init(server);
let socketEmitter;

io.on("connection", (sock) => {
  console.log("Socket connected...");
  if (sock) {
    setTimeout(() => {
      socketEmitter = sock;
    }, 10);
  }
});

io.on('disconnect', function () {
  console.log('Socket disconnect...');
});

function getSocket() {
  return socketEmitter;
}

module.exports = { app, getSocket, io };