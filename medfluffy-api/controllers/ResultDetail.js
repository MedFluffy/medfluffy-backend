
const db = require('../models/index');
const Validator = require('fastest-validator');
const v = new Validator();
const controller = {
    async showAll(req, res, next){
        try {
            const total = await db.results.count();
            const data = await db.results.findAll({
                include: [{
                    model: db.images,
                    as: 'ImageDetail'
                }],
            });
            if(!data){
                let data = "There is no data saved in database";
            }
            const response = {
                message: "success",
                error: false,
                count: total,
                ResultDetail: data
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
                let data =  "Id image is required"
                const response = {
                    message: "success",
                    error: false,
                    ResultDetail: data
                }
                return res.status(400).json(response);
            }
            else{
                const data = await db.results.findOne({
                    where: {id:id},
                });
                if(!data){
                    let data = "Data with the id is not found";
                }
                const response = {
                    message: "success",
                    error: false,
                    ResultDetail: data
                }
                return res.status(200).json(response);
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
            const response = {
                message: "success",
                error: false,
                ResultDetail: data
            }
            return res.status(201).json(response);
        } catch (error) {
            return next(new Error(error));
        }

    }
}

module.exports = controller;
