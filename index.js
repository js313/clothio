const express = require('express')
const cors = require('cors')
require('dotenv').config({ path: './config.env' })
const pool = require('./db')
const app = express()

app.use(cors())
app.use(express.json())

app.post('/clothes', async (req, res) => {
    try {
        const { name, description, date_given = null, date_came = null, image, type, status = "washed" } = req.body
        console.log(req.body);
        const newCloth = await pool.query("INSERT INTO clothes(name, description, date_given, date_came, image, type, status) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *", [name, description, date_given, date_came, image, type, status])
        //the whole thing is just a postgres query even 'RETURNING *' "pg" module just populates the dollar values and connects DB.
        res.status(201).json(newCloth.rows[0])
    } catch (err) {
        console.log(err)
        res.status(500).json(err.message || err)
    }
})

app.get('/clothes', async (req, res) => {
    try {
        const { ob = 'status' } = req.query
        const clothes = await pool.query(`SELECT * from clothes ORDER BY ${ob} ASC`)
        res.status(200).json(clothes.rows)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error" })
    }
})

app.get('/clothes/:cloth_id', async (req, res) => {
    try {
        const { cloth_id } = req.params
        const cloth = await pool.query(`SELECT * FROM clothes WHERE cloth_id = ${cloth_id}`)    //can be done like this as well
        res.status(200).json(cloth.rows[0])
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error" })
    }
})

app.put('/clothes/:cloth_id', async (req, res) => {
    try {
        const { cloth_id } = req.params
        const { name, description, date_given, date_came, image, type, status } = req.body
        const cloth = await pool.query(`UPDATE clothes SET name = $1, description = $2, date_given = $3, date_came = $4, image = $5, type = $6, status = $7 WHERE cloth_id = $8 RETURNING *`, [name, description, date_given, date_came, image, type, status, cloth_id])
        res.status(200).json(cloth.rows)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error" })
    }
})

app.delete('/clothes/:cloth_id', async (req, res) => {
    try {
        const { cloth_id } = req.params
        const cloth = await pool.query(`DELETE FROM clothes WHERE cloth_id = ${cloth_id}`)
        res.status(204)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error" })
    }
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})