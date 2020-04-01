const mongoose = require('mongoose');

const OffreSchema = mongoose.Schema({
    titre : {type:String, required:true},
    prix : {type:String, required:true},
    description:  {type:String, required:true}

})
     
const Offre = mongoose.model('Offre', OffreSchema);
module.exports= Offre ;