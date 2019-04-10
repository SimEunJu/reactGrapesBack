const Router = require("koa-router");
const grapeCtrl = require("./grape.ctrl");

const grape = new Router();

grape.get("/:user/new", grapeCtrl.createNew);
grape.get("/:user/showcase", grapeCtrl.readShowcase);

grape.get("/:gno", grapeCtrl.checkObjectId, grapeCtrl.readGrapes);
grape.delete("/:gno", grapeCtrl.checkObjectId, grapeCtrl.deleteGrapes);
grape.post("/:gno/rgba", grapeCtrl.checkObjectId, grapeCtrl.updateRgba);
grape.post("/:gno/title", grapeCtrl.checkObjectId, grapeCtrl.updateTitle);
grape.post("/:gno/finish", grapeCtrl.checkObjectId, grapeCtrl.updateFinishState);
grape.post("/:gno/:idx", grapeCtrl.checkObjectId, grapeCtrl.updateOneGrape);
grape.post("/:gno/:idx/color", grapeCtrl.checkObjectId, grapeCtrl.updateOneGrapeColor);

module.exports = grape;