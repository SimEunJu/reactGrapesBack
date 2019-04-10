const Grapes = require("models/post");
const {ObjectId} = require("mongoose").Types;

exports.checkObjectId = (ctx, next) => {
    const gno = ctx.params.gno;
    if(!ObjectId.isValid(gno)){
        ctx.status = 404;
        return null;
    }
    return next();
}

exports.createNew = async (ctx) => {
    let {depth} = ctx.query;
    depth = parseInt(depth);
    const totalCnt = depth*(depth+1)/2;
    let grape = [];
    for(let idx=0; idx<totalCnt; idx++){
        grape.push({idx});
    }
    const grapes = new Grapes({
        depth, 
        grapeCnt: totalCnt,
        grape: grape
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
   const {title, content} = ctx.request.body;
   try{
        await Grapes.updateOne({_id: gno, 'grape.idx': idx}, {$set: {'grape.$.title': title, 'grape.$.content': content}}).exec();
        const grapes = await Grapes.findById(gno).exec();
        ctx.body = grapes;
    }catch(e){
        ctx.throw(e);
   }
}
exports.updateOneGrapeColor = async (ctx) => {
    const {gno, idx} = ctx.params;
    const {isChecked} = ctx.request.body;
    try{
        await Grapes.updateOne({_id: gno, 'grape.idx': idx}, {$set: {'grape.$.isChecked': isChecked}}).exec();
        const grapes = await Grapes.findById(gno).exec();
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
       console.log(e);
       ctx.throw(e);
   }
}
exports.updateFinishState = async (ctx) => {
    const {gno} = ctx.params;
    try{
         const grapes = await Grapes.findByIdAndUpdate(gno, ctx.request.body,{new: true}).exec();
         ctx.body = grapes;
    }catch(e){
        ctx.throw(e);
    }
 }
exports.readShowcase = async (ctx) => {
    try{
        const allGrapes = await Grapes.find({}, {_id: 1, rgba: 1, title: 1, regdate: 1}).sort({regdate: -1}).exec();
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