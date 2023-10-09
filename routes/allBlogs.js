import express, { response } from 'express'
import database from '../database/config.js'


const router = express.Router()

router.get('/',(req,res)=>{
    try {
        let query = 'select * from blogs'
        database.query(query,(error,response)=>{
            if(error)res.status(500).send({error:'something went wrong'})
            res.send(response.reverse().slice(0,8))
        })
    } catch (error) {
        res.status(500).send({error:'something went wrong'})
    }
})

export default router