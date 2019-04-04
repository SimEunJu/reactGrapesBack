const Router = require("koa-router");
const grape = require("./grape");

const api = new Router();

api.use("/grape", grape.routes());

module.exports = api;