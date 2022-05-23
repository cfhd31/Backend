import express from "express";
import dotenv from "dotenv";
import os from "os"
dotenv.config();

const infoRuta = express.Router();

const numCPUs = os.cpus().length
//console.log(numCPUs)

infoRuta.get("/", (req, res) => {
  let argumentos= [];
   process.argv.forEach((val, index) => {
    argumentos+=`${index}: ${val}`;
  });
 
  const folder = process.cwd();
  const versionNode = process.version;
  const processId = process.version;
  const so = process.platform;
  const memory = process.memoryUsage().rss;
  const memoryRss = Math.round((memory / 1024 / 1024) * 100) / 100;
  const pid = process.pid;

const processData = {
   argumentos: argumentos,
    path: pid,
    so: so,
    processId: processId,
    versionNode: versionNode,
    folder: folder,
    memory: memoryRss,

    cpu:numCPUs
  };
  //console.info(processData)
  res.render("info.hbs", processData);
});

export default infoRuta;