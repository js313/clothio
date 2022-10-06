import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material"
import React, { useState } from "react"

function NewClothForm(props) {
    const [formType, setFormType] = useState('')

    async function submitHandler(event) {
        event.preventDefault()
        await fetch('/clothes', {
            method: 'POST',
            body: JSON.stringify({
                name: event.target.name.value,
                description: event.target.description.value,
                image: event.target.image.value,
                type: formType
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        props.setFormModal(false)
        props.resetClothesList()
        props.resetCount()
    }

    return (
        <Modal
            open={props.formModal}
            onClose={() => props.setFormModal(false)}
        >
            <Box component="form" sx={{ position: 'absolute', top: '10%', left: 0, right: 0, ml: 'auto', mr: 'auto', width: '24%', minWidth: 300, bgcolor: 'background.paper', borderRadius: 1, p: 3, pt: 2, pb: 2, display: 'flex', flexDirection: 'column' }} onSubmit={submitHandler}>
                <Typography color='gray' component='h1' variant='h5' sx={{ m: 1, mb: 3 }}>Add a Cloth</Typography>
                <TextField name="name" label="Name" variant="outlined" sx={{ mb: 3 }} />
                <TextField name="image" label="Image URL" variant="outlined" sx={{ mb: 3 }} />
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