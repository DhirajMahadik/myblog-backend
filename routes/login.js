import express from 'express'
import JWT from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import database from '../database/config.js'

const route = express.Router()
const secreteKey = 'qwertyuiop987654321'

route.post('/login', (req, res) => {
    try {
        const username = req.body.username;
        let query = 'Select password, user_id from admin where username = ?'
        database.query(query, [username], async (error, response) => {
            if (error) res.status(500).send({ error: 'some error occurs' });
            if (response.length !== 0) {
                let pass = await bcrypt.compare(req.body.password, response[0].password);
                if (pass) {
                    let id = response[0].user_id
                    JWT.sign({ id }, secreteKey, (error, token) => {
                        if (error) res.status(500).send({ error: 'some error occurs' });
                        res.send({ token })
                    })
                } else {
                    res.status(404).send({ error: 'Invalid user credential' })
                }
            } else {
                res.status(404).send({ error: 'User not found' })
            }

        })
    } catch (error) {
        res.status(500).send(error)
    }
})

route.post('/register', (req, res) => {
    try {
        const username = req.body.username;
        bcrypt.hash(req.body.password, 2, (err, hash) => {
            if (err) res.status(500).send({ error: 'some error occurs' });
            database.query('insert into admin(username,password) values(?,?)', [username, hash], (error, response) => {
                if (error) res.status(400).send({ error: error.message.slice(0, error.message.length - 23) })
                res.send(response)
            })
        })

    } catch (error) {
        res.send(error)
    }
})

export default route