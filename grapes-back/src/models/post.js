const mongoose = require('mongoose');
const {GREEN} = require('../../../grapes-front/src/common/Color');
const {Schema} = mongoose;

const Grapes = new Schema({
    regdate: {type:Date, default: Date.now},
    update: {type:Date, default: Date.now},
    grapeCnt: {type:Number, default: 0},
    depth: {type:Number, default: 0},
    title: {type:String, default: ""},
    deleteFlag: {type: Boolean, default: false},
    rgba: {type:String, default: GREEN},
    finishFlag: {type: Boolean, default: false},
    grape: [{
        update: {type:Date, default: Date.now},
        idx: Number,
        isChecked: {type: Boolean, default: false},
        content: {type:String, default: ""},
    }]
});

module.exports = mongoose.model('Grapes', Grapes);
