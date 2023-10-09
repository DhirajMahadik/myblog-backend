import express from 'express'
import database from '../database/config.js';

const router = express.Router();

router.get('/:value',(req,res)=>{
    try {
        const searchValue = req.params.value;
        const query = "select * from blogs where title like '%"+searchValue+"%' or headline like '%"+searchValue+"%'  "
        database.query(query,(error,response)=>{
            if(error) res.status(500).send(error)
            res.send(response)
        })
    } catch (error) {
        res.status(500)
    }
})

export default router