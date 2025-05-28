const IRD = require('../models/ird.model');


module.exports.getIrd = async (req, res, next) => {
  try {
    const ird = await IRD.find();
    res.json(ird);
  } catch (error) {
    res.status(404).json({ message: 'Error fetching ird' });
  }
}

module.exports.createIrd = async (req, res, next) => {
  try {
    const ird = new IRD(req.body);
    await ird.save();
    res.json(ird);
  } catch (error) {
    res.status(500).json({ message: 'Error creating ird' });
  }
}

module.exports.deleteIrd = async (req, res, next) => {
  try {
    const id = req.params.id;
    await IRD.findByIdAndDelete(id);
    res.json({ message: 'Ird deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting ird' });
  }
}

module.exports.updateIrd = async (req, res, next) => {
  try {
    const id = req.params.id;
    const ird = await IRD.findByIdAndUpdate(id, req.body, { new: true });
    res.json(ird);
  } catch (error) {
    res.status(500).json({ message: 'Error updating ird' });
    }
}

module.exports.getIdIrd = async (req, res, next) => {
  try {
    const id = req.params.id;
    const ird = await IRD.findById(id);
    res.json(ird);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ird' });
    }
}