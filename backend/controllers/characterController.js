const Character = require('../models/characterModel')
const mongoose = require('mongoose')

// get all characters
const getCharacters = async (req, res) => {
  const user_id = req.user._id

  const characters = await Character.find({user_id}).sort({createdAt: -1})

  res.status(200).json(characters)
}

// get a single character
const getCharacter = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such character'})
  }

  const character = await Character.findById(id)

  if (!character) {
    return res.status(404).json({error: 'No such character'})
  }
  
  res.status(200).json(character)
}


// create new character
const createCharacter= async (req, res) => {
  const {charName, ancestry, charClass, background} = req.body

  let emptyFields = []

  if(!charName) {
    emptyFields.push('charName')
  }
  if(!ancestry) {
    emptyFields.push('ancestry')
  }
  if(!background) {
    emptyFields.push('background')
  }
  if(!charClass) {
    emptyFields.push('charClass')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const character = await Character.create({charName, ancestry, charClass, background, user_id})
    res.status(200).json(character)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a character
const deleteCharacter = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such character'})
  }

  const character = await Character.findOneAndDelete({_id: id})

  if (!character) {
    return res.status(400).json({error: 'No such character'})
  }

  res.status(200).json(character)
}

// update a character
const updateCharacter = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such character'})
  }

  const character = await Character.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!character) {
    return res.status(400).json({error: 'No such character'})
  }

  res.status(200).json(character)
}


module.exports = {
  getCharacters,
  getCharacter,
  createCharacter,
  deleteCharacter,
  updateCharacter
}