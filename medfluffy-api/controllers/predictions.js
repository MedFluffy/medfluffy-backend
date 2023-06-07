
const db = require('../models/index');
const validator = require('fastest-validator');
const v = new validator();
const controller = {
    async showAll(req, res, next){
        try {
            const data = await db.predictions.findAll({
                include: [{
                    model: db.images,
                    as: 'ImageDetail'
                },{
                    model: db.results,
                    as: 'ResultDetail',
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
                const data = await db.predictions.findOne({
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
                id_user: "number|optional",
                id_img: "number",
                id_result: "number"
            }
            const validate = v.validate(req.body, schema);
            if(validate.length){
                return res.status(400).json(validate);
            }
            const data = await db.predictions.create(req.body);
            return res.status(201).json(data);
        } catch (error) {
            return next(new Error(error));
        }

    }
}

module.exports = controller;
