const Router = require("koa-router");
const grape = require("./grape");

const api = new Router();

api.use("/grapes", grape.routes());

module.exports = api;