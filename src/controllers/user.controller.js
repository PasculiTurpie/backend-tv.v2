const User = require('../models/users.model')

module.exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find().sort({ name: 1 })
    res.json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error fetching users' })
  }
}

module.exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body)
    await user.save()
    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error creating user' })
  }
}