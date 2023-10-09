import express from 'express';
import database from '../database/config.js';

const router = express.Router();

router.get('/:category',(req,res)=>{
    try {
        const category = req.params.category;
        const query = 'select * from blogs where category = ?'
        database.query(query,[category],(error,response)=>{
            if(error) res.status(500).send({error:'something went wrong'})
            res.send(response)
        })
    } catch (error) {
        
    }
})

export default router