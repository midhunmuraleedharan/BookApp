const express = require('express');
const Model = require('../models/model');
const router = express.Router();
const middleWare= require('./middlewareAuth')
//token="#testpass"
//Post Method
router.post('/create-book',middleWare, async (req, res) => {
    const data = new Model({
        name: req.body.name,
        author: req.body.author,
        date: req.body.date,
        price:  req.body.price   
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json({ success: true,message:"Book added successfully",dataToSave
     })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Get all Method
router.get('/list-books',middleWare, async (req, res) => {
    try {
        const data = await Model.find({status:1});
        res.json({success: true, message : "books listed successfully",data,totalBooks:data.length})
    }
    catch (error) {
        res.status(500).json({ success: false,message: error.message })
    }
})

//Get by ID Method
router.get('/get-book/:id',middleWare, async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json({success: true, message : "books listed successfully",data})
    }
    catch (error) {
        res.status(500).json({success: false, message : "books listed failed"})
    }
})

//Update by ID Method
router.patch('/update-book/:id',middleWare ,async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id',middleWare, async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = {status:0};
        const data = await Model.findByIdAndUpdate(id,updatedData)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;