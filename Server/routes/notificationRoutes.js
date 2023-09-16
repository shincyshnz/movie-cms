const express = require("express");
const notificationRouter = express.Router();
const { EventEmitter } = require("events");
const eventEmitter = new EventEmitter();

notificationRouter.get("/", (req, res, next) => {
    try {
        console.log("-----Client Connected----");
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");
    
        eventEmitter.addListener("movieEvent", (data) => {
          res.write(`data: ${JSON.stringify(data)}\n\n`);
        });
    
        req.on("close", () => {
          eventEmitter.removeListener("movieEvent", (data) => {
            res.write(`data: ${JSON.stringify(data)}\n\n`);
          });
        });
      } catch (error) {
        res.status(400).json(error);
      }
    });

module.exports = { notificationRouter, eventEmitter };