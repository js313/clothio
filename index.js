const express = require('express')
const cors = require('cors')
require('dotenv').config({ path: './config.env' })
const pool = require('./db')
const app = express()
const cloudinary = require('cloudinary').v2
const path = require('path')

// only when ready to deploy
if (process.env.NODE_ENV === "production")
    app.use(express.static(path.resolve(__dirname, './client/build')))

app.use(cors())
app.use(express.json({ limit: '50mb' }))

app.post('/clothes', async (req, res) => {
    try {
        let { name, description, date_given = null, date_came = null, image, type, status = "washed" } = req.body
        if (image) {
            const response = await cloudinary.uploader.upload(image, { folder: 'Clothio' })
            image = response.secure_url + `?public_id=${response.public_id}`
        }
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
        const { ob = 'status', type, status } = req.query
        const showWhere = type || status
        const showAnd = type && status
        const clothes = await pool.query(`SELECT * from clothes ${showWhere ? showAnd ? `WHERE type = '${type}' AND status = '${status}'` : type ? `WHERE type = '${type}'` : `WHERE status = '${status}'` : ''} ORDER BY ${ob} ASC`)
        res.status(200).json(clothes.rows)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error" })
    }
})

app.get('/clothes/count', async (req, res) => {
    try {
        const count = await pool.query(`SELECT status, COUNT(*) FROM clothes GROUP BY status`)
        res.status(200).json(count.rows)
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
        let { name, image, description, type } = req.body
        const oldClothData = await pool.query('SELECT image FROM clothes WHERE cloth_id = $1', [cloth_id])
        if (image && !image.includes('cloudinary')) {
            const response = await cloudinary.uploader.upload(image, { folder: 'Clothio' })
            image = response.secure_url + `?public_id=${response.public_id}`
            cloudinary.uploader.destroy(oldClothData.rows[0].image.split('?public_id=')[1])
        }
        const cloth = await pool.query(`UPDATE clothes SET name = $1, description = $2, image = $3, type = $4 WHERE cloth_id = $5 RETURNING *`, [name, description, image, type, cloth_id])

        res.status(200).json(cloth.rows)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error" })
    }
})

app.delete('/clothes/:cloth_id', async (req, res) => {
    try {
        const { cloth_id } = req.params
        const cloth = await pool.query(`DELETE FROM clothes WHERE cloth_id = ${cloth_id} RETURNING *`)
        await cloudinary.uploader.destroy(cloth.rows[0].image.split('?public_id=')[1])
        res.status(204).json()
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error" })
    }
})

app.patch('/clothes/:clothId/status', async (req, res) => {
    try {
        const { status } = req.body
        const { clothId } = req.params
        let dateGiven = false, dateCame = false;
        if (status === "washing") {
            dateGiven = true
        }
        else if (status === "washed") {
            dateCame = true
        }
        else {
            const updatedCloth = await pool.query(`UPDATE clothes SET status = '${status}' WHERE cloth_id = ${clothId} RETURNING *`)
            return res.status(200).json(updatedCloth.rows[0])
        }
        const updatedCloth = await pool.query(`UPDATE clothes SET status = '${status}', ${dateGiven ? 'date_given' : 'date_came'} = '${new Date().toLocaleString()}' WHERE cloth_id = ${clothId} RETURNING *`)
        res.status(200).json(updatedCloth.rows[0])
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err })
    }
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
