
const db = require('../models/index');
const Validator = require('fastest-validator');
const v = new Validator();
const controller = {
    async showAll(req, res, next){
        try {
            const data = await db.results.findAll({
                include: [{
                    model: db.images,
                    as: 'ImageDetail'
                }],
            });
            if(!data){
                let data = {
                    "message": "There is no data saved in database"
                }
                return res.status(400).json(data);
            }
            else{
                return res.status(200).json(data);
            }
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
                const data = await db.results.findOne({
                    where: {id:id},
                });
                if(!data){
                    let data = {
                        "message": "Data with the id is not found"
                    }
                    return res.status(200).json(data);
                }
                else{
                    return res.status(200).json(data);
                }
            }
        } catch (error) {
            
        }
    },
    
    async add(req, res, next){
        try {
            const schema = {
                id_img: 'number',
                result_name: 'string',
                accuration: 'number',
                description: 'string|optional'
            }
            const validate = v.validate(req.body, schema);
            if(validate.length){
                return res.status(400).json(validate);
            }
            const data = await db.results.create(req.body);
            return res.status(201).json(data);
        } catch (error) {
            return next(new Error(error));
        }

    }
}

module.exports = controller;
