
const db = require('../models/index');
const validator = require('fastest-validator');
const v = new validator();
const controller = {
    async showAll(req, res, next){
        try {
            const total = await db.predictions.count();
            const data = await db.predictions.findAll({
                include: [{
                    model: db.results,
                    as: 'ResultDetail',
                    include:[{
                        model: db.images,
                        as: 'ImageDetail'
                    }]
                }],
            });
            if(!data){
                let data = "There is no data saved in database";
            }
            const response = {
                message: "success",
                error: false,
                count: total,
                Predictions: data
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
                const data = await db.predictions.findOne({
                    where: {id:id},
                    include: [{
                        model: db.results,
                        as: 'ResultDetail',
                        include:[{
                            model: db.images,
                            as: 'ImageDetail'
                        }]
                    }],
                });
                if(!data){
                    let data = "Data is not found";
                }
                const response = {
                    message: "success",
                    error: false,
                    Predictions: data
                }
                return res.status(200).json(response);
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
            const response = {
                message: "success",
                error: false,
                Predictions: data
            }
            return res.status(201).json(response);
        } catch (error) {
            return next(new Error(error));
        }
    }
}
module.exports = controller;
