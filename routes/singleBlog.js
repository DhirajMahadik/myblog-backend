import express from 'express'
import database from '../database/config.js';

const router = express.Router()

router.get('/:id', (req, res) => {
    try {
        const id = req.params.id;
        const query = 'select * from blogs where id=?'
        database.query(query, [id], (error, response) => {
            if (error) res.status(500).send({ error: 'something went wrong' });
            res.send(response[0])
        })
    } catch (error) {
        res.status(500).send({error:'something went wrong'})
    }

})

export default router  