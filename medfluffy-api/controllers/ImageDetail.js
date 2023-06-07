
const db = require('../models/index');
const controller = {
    async showAll(req, res, next){
        try {
            const data = await db.images.findAll();
            return res.status(200).json(data);
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
                const data = await db.images.findOne({
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
    //perlu direv add
    async add(req, res, next){
        try {
            const { id } = req.params;
            if(!id){
                let data = {
                    "message": "Id image is required"
                }
                return res.status(400).json(data);
            }
            else{
                const data = await db.images.findOne({
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
    }
}

module.exports = controller;
