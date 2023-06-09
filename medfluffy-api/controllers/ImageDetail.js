
const db = require('../models/index');
const Validator = require('fastest-validator');
const v = new Validator();
const controller = {
    async showAll(req, res, next){
        try {
            const total = await db.images.count()
            const data = await db.images.findAll();
            const response = {
                message: "success",
                error: false,
                count: total,
                ImageDetail: data
            }
            return res.status(200).json(response);
        } catch (error) {
            return next(new Error(error));
        }
    },
    async showOne(req, res, next){
        try {
            const { id } = req.params;
            if(!id){
                let data = {
                    "message": "Id image is required"
                }
                return res.status(400).json(data);
            }
            else{
                let data = await db.images.findOne({
                    where: {id:id},
                });
                if(!data){
                    let data = "Data with the id is not found";
                }
                const response = {
                    message: "success",
                    error: false,
                    ImageDetail: data
                }
                return res.status(200).json(response);
            }
        } catch (error) {
            
        }
    },
    async add(req, res, next){
        try {
            const schema = {
                img_url: 'string',
                size_kb: 'number',
                extension_file: 'string',
                description: 'string|optional'
            }
            const validate = v.validate(req.body, schema);
            if(validate.length){
                return res.status(400).json(validate);
            }
            const data = await db.images.create(req.body);
            const response = {
                message: "success",
                error: false,
                ImageDetail: data
            }
            return res.status(201).json(response);
        } catch (error) {
            return next(new Error(error));
        }

    }
}

module.exports = controller;
