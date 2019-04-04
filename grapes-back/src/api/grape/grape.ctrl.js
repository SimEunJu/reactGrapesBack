const {Grapes} = require("models/post");
const {ObjectId} = require("mongoose").Types;

exports.checkObjectId = (ctx, next) => {
    const gno = ctx.params;
    if(!ObjectId.isValid(gno)){
        ctx.status = 404;
        return null;
    }
    return next();
}

exports.createNew = async (ctx) => {
    const {depth} = ctx.query;
    const totalCnt = depth*(depth+1)/2;
    let grape = [];
    for(let idx=0; i++; i<totalCnt){
        grape.push({idx});
    }
    const grapes = new Grapes({
        depth, 
        grapeCnt: totalCnt,
        grape: [grape]
    });
    try{
        const result = await grapes.save();
        ctx.body = {depth: depth, gno: result._id};
    }catch(e){
        ctx.throw(e, 500);
    }
};
exports.readGrapes = async (ctx) => {
   const {gno} = ctx.params;
   try{
       const grapes = await Grapes.findById(gno).exec();
       ctx.body = grapes;
   }catch(e){
       ctx.throw(e, 500);
   }
}
exports.updateTitle = async (ctx) => {
    const {gno} = ctx.params;
    try{
        const grapes = await Grapes.findByIdAndUpdate(gno, ctx.request.body,{new:true}).exec();
        ctx.body = grapes;
    }
    catch(e){
        ctx.throw(e, 500);
    }
}

exports.updateOneGrape = async (ctx) => {
   const {gno, idx} = ctx.params;
   try{
        const grapes = await Grapes.findOneAndUpdate({gno, grape: {idx}}, {grape: ctx.request.body}, {new:true}).exec();
        ctx.body = grapes;
    }catch(e){
        ctx.throw(e);
   }
}
exports.updateRgba = async (ctx) => {
   const {gno} = ctx.params;
   try{
        const grapes = await Grapes.findByIdAndUpdate(gno, ctx.request.body,{new: true}).exec();
        ctx.body = grapes;
   }catch(e){
       ctx.throw(e);
   }
}
exports.readContainer = async (ctx) => {
    try{
        const allGrapes = await Grapes.find().exec();
        ctx.body = allGrapes; 
    }catch(e){
        ctx.throw(e);
    }
}
exports.deleteGrapes = async (ctx) => {
   const gno = ctx.params;
   try{
        await Grapes.findByIdAndRemove(gno);
        ctx.status = 204;
   }catch(e){
       ctx.throw(e);
   }
}