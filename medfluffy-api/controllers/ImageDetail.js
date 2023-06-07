
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
    async showById(req, res, next){
        try {
            
        } catch (error) {
            
        }
    }
}

module.exports = controller;
