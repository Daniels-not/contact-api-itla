const express = require('express');
const Joi = require('joi');
const router = express.Router();
const Contact = require('../model/contact');


// schema to validate the data that is going to be sent to the server

const schema = Joi.object({
    nombre: Joi.string()
    .min(3)
    .max(30)
    .required().label('Nombre'),

    apellido: Joi.string()
    .min(3)
    .max(30)
    .required().label('Apellido'),

    numero: Joi.number().
    integer().required().label('Numero de telefono'),
})



// post contacts to the database and return the contact that was created


router.post('/', (req, res) => { // post a new contact to the database

    let body = req.body;

    const { error, value } = schema.validate({ // validate the data that was sent to the server
        nombre: body.nombre,
        apellido: body.apellido,
        numero: body.numero,
    });

    if (error) { // if there is an error, return the error
        return res.status(400).json({
            error: error.details[0].message
        });
    }
    else{ // if there is no error, create the contact and return the contact that was created
        let contact = createContact(body);

        contact.then(contact => {
            res.json({
                value: contact,
            })
        }).catch(err => {
            res.json({
                error: err
            })
        });
    }

})



// get all the contacts


router.get('/', (req, res) => {
    let contact = getAllContacts();

    contact.then(contacts => {
        res.send(contacts); // return contact list
    }).catch(err => {
        res.json(err); // return error if contact is not found in the database
    })
})



// function to get all the contacts


async function getAllContacts(){
    let contact = await Contact.find({"status": true});

    return contact;
}


// function to post data to the database and return the data that was sent to the server for the client


async function createContact(body){

    let contact = new Contact({ // create a new contact object with the data that was sent to the server
        nombre: body.nombre,
        apellido: body.apellido,
        numero: body.numero,
        user_image: body.user_image,
        status: body.status,
    });

    return await contact.save(); // save the contact object to the database

}


module.exports = router;