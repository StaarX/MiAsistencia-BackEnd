const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const ClaseSchema= new Schema({
   id:{type: String, required: true},
   codigo:{type:String, required: true},
   nombre:{type: String, required: true},
   idmaestro:{type:String, required: true},
   fecha:{type:Date, default: Date.now},
   estado:{type:String, default:'Iniciada'},
   asistentes:[{type: Schema.ObjectId, ref:'estudiante'}]
});

module.exports=mongoose.model("Clases",ClaseSchema);