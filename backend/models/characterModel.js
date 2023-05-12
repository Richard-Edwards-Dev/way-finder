const mongoose = require('mongoose')

const Schema = mongoose.Schema

const characterSchema = new Schema({
  charName: {
    type: String,
    required: true
  },
  ancestry: {
    type: String,
    required: true
  },
  charClass: {
    type: String,
    required: true
  },
  attributes:{
    type: Object,
    default: {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0
    }
  },
  proficiency:{
    type: Object,
    default: {
      armorClass: 2,
      fort: 2,
      ref: 2,
      will: 2,
      perc: 2,
      strike: 2
    }
  },
  inventory:{
    type: Array,
    default: [" "]
  },
  feats:{
    type: Array,
    default: [" "]
  },
  background:{
    type: String,
    required: true,
  },
  level: {
    type: Number,
    default: 1
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Character', characterSchema)