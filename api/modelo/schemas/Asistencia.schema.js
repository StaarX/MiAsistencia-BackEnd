const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const ClaseSchema= new Schema({
   id:{type: String, required: true},
   nombre:{type: String, required: true},
   dia:{type:String, required: true},
   mes:{type:String, required: true},
   año:{type:String, required: true},
   asistentes:[{id: String, nombre: String}]
});

module.exports=mongoose.model("Clases",ClaseSchema);