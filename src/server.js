const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const axios = require("axios");
const { engine, create } = require("express-handlebars");
const connection = require("./configs/connectDB");


const route = require("./routes");
var bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const HandlebarsRegisterHelper = require("./util/handlebarsRH");
const resize = require("./util/resizeImg");
var cookieParser = require('cookie-parser');
const webPush = require('./configs/webpush');
global.pool = {};
var cors = require("cors");
var LocalStorage = require('node-localstorage').LocalStorage
const domainConfirmDomainMiddleWare = require("./util/middleware/domain");
const { log } = require("console");

app.use(cors());
// resize();
//view emgine config




app.use(cookieParser())

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resource/views"));
var hbs = create({});

// register new function
HandlebarsRegisterHelper(hbs);

//config inforPage
// getBasicInforPage();
// register new function
//consfig ENV
dotenv.config();
const PORT = 4018;
// console.log(process.env.KEY);

// connection.connect();

// console.log(process.env.CLIENT);
// const io = new Server(server, {
//     cors: {
//         origin: [process.env.CLIENT],
//         methods: ['GET', 'POST'],
//     },
// });
//Statc file
app.use("/static", express.static(path.join(__dirname, "public")));

app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));


app.use("/robots.txt", function (req, res, next) {
  res.type("text/plain");
  res.send("User-agent: *\nDisallow: /admin");
});
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});






app.use("/appapi", (req, res, next) => {
  req.isApi = true;
  next();
});
app.use("*", domainConfirmDomainMiddleWare);

    
// app.get('/', (req, res, next) => {
//     res.send('<h1>Hello world_</h1>');
//     // next;
// });

//
// socket.methods.emit();
// //route init
route(app);

//start record Location
// RecordLocation.setup();
//io config
// socket.config(io, server);

server.listen(PORT, () => {
  console.log(`listening on *: ${PORT}`);
});
