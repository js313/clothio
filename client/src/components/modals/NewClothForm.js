import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material"
import React, { useState } from "react"

function NewClothForm(props) {
    const [formType, setFormType] = useState('')
    const [imageString, setImageString] = useState('')

    async function imageToBase64(image) {
        let reader = new FileReader()
        reader.readAsDataURL(image)
        reader.onload = function () {
            setImageString(reader.result);
        }
        reader.onerror = function () {
            throw new Error("Could not upload image")
        }
    }

    async function submitHandler(event) {
        event.preventDefault()
        await fetch('/clothes', {
            method: 'POST',
            body: JSON.stringify({
                name: event.target.name.value,
                description: event.target.description.value,
                image: imageString,
                type: formType
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        props.setFormModal(false)
        props.resetClothesList()
        props.resetClothesCount()
    }

    return (
        <Modal
            open={props.formModal}
            onClose={() => props.setFormModal(false)}
        >
            <Box component="form" sx={{ position: 'absolute', top: '10%', left: 0, right: 0, ml: 'auto', mr: 'auto', width: '24%', minWidth: 300, bgcolor: 'background.paper', borderRadius: 1, p: 3, pt: 2, pb: 2, display: 'flex', flexDirection: 'column' }} onSubmit={submitHandler}>
                <Typography color='gray' component='h1' variant='h5' sx={{ m: 1, mb: 3 }}>Add a Cloth</Typography>
                <TextField name="name" label="Name" variant="outlined" sx={{ mb: 3 }} />
                <Button component="label" variant="contained" sx={{ mb: 3 }} >Upload Image {imageString ? '✓' : ''}<input type="file" name="clothImage" onChange={(event) => { imageToBase64(event.target.files[0]) }} hidden></input></Button>
                <TextField name="description" label="Description" variant="outlined" sx={{ mb: 3 }} multiline />
                <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel id="cloth-type-select-label">Type</InputLabel>
                    <Select
                        labelId="cloth-type-select-label"
                        id="cloth-type-select"
                        value={formType}
                        label="type"
                        onChange={(value) => { setFormType(value.target.value) }}
                    >
                        <MenuItem value={'tshirt'}>T-Shirt</MenuItem>
                        <MenuItem value={'pj'}>Pyajama</MenuItem>
                        <MenuItem value={'shirt'}>Shirt</MenuItem>
                        <MenuItem value={'jeans'}>Jeans</MenuItem>
                        <MenuItem value={'blanket'}>Blanket</MenuItem>
                        <MenuItem value={'sheet'}>Sheet</MenuItem>
                        <MenuItem value={'pillowcover'}>Pillow Cover</MenuItem>
                    </Select>
                </FormControl>
                <Button type='submit' variant='contained' sx={{ mb: 3 }}>Submit</Button>
            </Box>
        </Modal>
    )
}

export default NewClothForm