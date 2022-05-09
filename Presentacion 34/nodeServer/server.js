import cookieParser   from 'cookie-parser';
import session  from 'express-session';
import passport  from 'passport';
import express from 'express';
import { createServer } from 'http';
import autentificacionRuta  from './rutas/autentificacionRuta.js';
import productosTestRuta  from './rutas/productosTestRuta.js';
import infoRuta  from './rutas/infoRuta.js';
import apiRandomRuta  from './rutas/apiRandomRuta.js';
import bodyParser  from 'body-parser';
import hbs from 'hbs';
import cluster from "cluster";
import os from "os";
import compression from 'compression' 
import logger from './logger.js';



const app = express();
const httpServer = new createServer(app);
/*----------------------------- Session ------------------------------*/
logger.info(`Conf logger modo: ${process.env.NODE_ENV}`);
app.use(compression());

app.use(cookieParser());
app.use(
  session({
    secret: "1234567890!@#$%^&*()",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: "auto",
      maxAge: 60000,
    },
  })
);

app.use(function(req, res, next){
  res.locals.session = req.session;
  next();
});

import path from "path";
const __dirname = path.resolve();
 
app.use(express.static(__dirname + "/public"));
app.set("view engine", "hbs");
app.set("views", __dirname + "/public/views");
hbs.registerPartials(__dirname + "/public/views/partials", function (err) {});

/*-------------------------- Passport ------------------------------*/
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));

/*---------------------------- Rutas --------------------------------*/
app.use("/", autentificacionRuta);
app.use("/", productosTestRuta);
app.use("/info", infoRuta);
app.use("/api/random", apiRandomRuta);

const numCPUs =  os.cpus().length;
 
const PORT = parseInt(process.argv[2]) || 8080
const modoCluster = process.argv[3] == 'CLUSTER'

if (modoCluster && cluster.isPrimary) {
  logger.info('CPUs:', numeroCPUs);
  logger.info(`Master ${process.pid} is running`);

  for (let i = 0; i < numeroCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    logger.info(`worker ${worker.process.pid} died`);
  });
} else {
  const server = httpServer.listen(PORT, () => {
    logger.info(
      `Servidor HTTP escuchado en puerto ${server.address()
        .port} - PID ${process.pid} - ${new Date().toLocaleString()}`
    );
  });
  server.on('error', (error) => logger.error(`Error en servidor ${error}`));
}

//PASOS A SEGUIR: 
                  //pm2 start server.js --name="Server1" --watch -- port=8081 
                  //pm2 start server.js --name="Server3" --watch -i max
                  //pm2 monit
                  //pm2 kill