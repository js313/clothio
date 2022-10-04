import React, { useEffect, useState } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Box, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material';
import NewClothForm from './NewClothForm';
import ClothDetail from './ClothDetail';

function ListClothes() {
    const [clothes, setClothes] = useState([])
    const [paperElevation, setPaperElevation] = useState(5)
    const [clothType, setClothType] = useState('all')
    const [formModal, setFormModal] = useState(false)
    const [detailModal, setDetailModal] = useState(false)

    useEffect(() => {
        if (clothes && clothes instanceof Array && clothes.length > 0) return
        (async () => {
            const clothesList = await (await fetch('/clothes')).json()
            setClothes(clothesList)
        })()
    }, [clothes])

    function mouseEnter() {
        setPaperElevation(10)
    }
    function mouseLeave() {
        setPaperElevation(5)
    }
    function resetClothesList() {
        setClothes([])
    }

    return (
        <>
            <Box justifyContent='space-between' alignItems='center' sx={{ display: 'flex', pt: 3, pb: 3 }}>
                <Typography color='Gray' variant='h4' sx={{ display: 'inline-block' }}>Clothes</Typography>
                <FormControl fullWidth sx={{ maxWidth: 145 }}>
                    <InputLabel id="cloth-type-select-label">Type</InputLabel>
                    <Select
                        labelId="cloth-type-select-label"
                        id="cloth-type-select"
                        value={clothType || 'all'}
                        label="type"
                        onChange={(value) => { setClothType(value.target.value) }}
                        sx={{ maxHeight: 50 }}
                    >
                        <MenuItem value={'all'}>All</MenuItem>
                        <MenuItem value={'tshirt'}>T-Shirts</MenuItem>
                        <MenuItem value={'pj'}>Pyajamas</MenuItem>
                        <MenuItem value={'shirt'}>Shirts</MenuItem>
                        <MenuItem value={'jeans'}>Jeans</MenuItem>
                        <MenuItem value={'blanket'}>Blankets</MenuItem>
                        <MenuItem value={'sheet'}>Sheets</MenuItem>
                        <MenuItem value={'pillowcover'}>Pillow Covers</MenuItem>
                    </Select>
                </FormControl>
                <IconButton color='primary' aria-label="add" onClick={() => setFormModal(true)}><AddRoundedIcon /></IconButton>
                <NewClothForm formModal={formModal} setFormModal={setFormModal} resetClothesList={resetClothesList} />
            </Box>
            <Paper elevation={paperElevation} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
                <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {clothes && clothes.map(cloth =>
                        <ListItem
                            key={cloth.cloth_id}
                            secondaryAction={
                                <FormControl fullWidth>
                                    <Select
                                        variant='standard'
                                        labelId="cloth-status-select-label"
                                        id="cloth-status-select"
                                        value={cloth.status || 0}
                                        label="Status"
                                    // onChange={handleChange}
                                    >
                                        <MenuItem value={0} disabled>Unknown</MenuItem>
                                        <MenuItem value={'washing'}>In washing</MenuItem>
                                        <MenuItem value={'washed'}>Washed</MenuItem>
                                        <MenuItem value={'dirty'}>Dirty</MenuItem>
                                    </Select>
                                </FormControl>
                            }
                            disablePadding
                            sx={{ mb: 1 }}
                            onClick={() => setDetailModal(cloth.cloth_id)}
                        >
                            <ListItemButton>
                                <ListItemAvatar>
                                    <Avatar src={cloth.image} />
                                </ListItemAvatar>
                                <ListItemText primary={cloth.name} />
                            </ListItemButton>
                        </ListItem>
                    )}
                    <ClothDetail detailModal={detailModal} setDetailModal={setDetailModal} />
                </List>
            </Paper>
        </>
    )
}

export default ListClothes