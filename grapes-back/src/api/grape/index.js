const Router = require("koa-router");
const grapeCtrl = require("./grape.ctrl");

const grape = new Router();

grape.post("/:user/grapes", grapeCtrl.createNew);

grape.get("/:gno", grapeCtrl.checkObjectId, grapeCtrl.readGrapes);
grape.post("/:gno/title", grapeCtrl.checkObjectId, grapeCtrl.updateTitle);
grape.post("/:gno/:idx", grapeCtrl.checkObjectId, grapeCtrl.updateOneGrape);
grape.post("/:gno/rgba", grapeCtrl.checkObjectId, grapeCtrl.updateRgba);

grape.get("/:user/showcase", grapeCtrl.readShowcase);
grape.delete("/:gno", grapeCtrl.checkObjectId, grapeCtrl.deleteGrapes);

module.exports = grape;