const Contact = require('../models/contact.model')

module.exports.createContact = async (req, res) => {
    try {
        const contact = new Contact(req.body)
        await contact.save()
        res.status(200).json(contact)
        
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message:`Contacto creado`
        })
    }
}

module.exports.getContact = async (req, res) =>{
    try {
        const contact = await Contact.find()
        res.json(contact)
    } catch (error) {
        console.error(error)
        res.status(500).json({message:`Error al obtener contacto`})
    }
}