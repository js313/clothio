import React, { useEffect, useRef, useState } from 'react'
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

function ListClothes(props) {
    const [clothes, setClothes] = useState([])
    const [paperElevation, setPaperElevation] = useState(5)
    const [clothType, setClothType] = useState('')
    const [formModal, setFormModal] = useState(false)
    const [clothIdModal, setClothIdModal] = useState('')
    const clothStatusRef = useRef() //to compare old and new values

    useEffect(() => {
        if ((clothes instanceof Array && clothes.length > 0) && (clothStatusRef.value === props.clothStatus)) return
        (async () => {
            clothStatusRef.value = props.clothStatus
            const clothesList = await (await fetch(`/clothes?type=${clothType}&status=${props.clothStatus}`)).json()
            setClothes(clothesList)
        })()
    }, [clothes, clothType, props.clothStatus])

    function mouseEnter() {
        setPaperElevation(10)
    }
    function mouseLeave() {
        setPaperElevation(5)
    }
    function resetClothesList() {
        setClothes([])
    }
    function resetCount() {
        props.resetClothesCount()
    }
    async function handleStatusChange(clothId, newStatus) {
        const data = await (await fetch(`/clothes/${clothId}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ status: newStatus }),
            headers: {
                'Content-Type': 'application/json'
            }
        })).json()
        if (data && data.cloth_id) {
            resetClothesList()
            resetCount()
        }
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
                        value={clothType || ''}
                        label="type"
                        onChange={(event) => {
                            setClothType(event.target.value)
                            setClothes([])
                        }}
                        sx={{ maxHeight: 50 }}
                    >
                        <MenuItem value={''}>All</MenuItem>
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
                <NewClothForm formModal={formModal} setFormModal={setFormModal} resetClothesList={resetClothesList} resetCount={resetCount} />
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
                                        value={cloth.status || ''}
                                        label="Status"
                                        onChange={(event) => { handleStatusChange(cloth.cloth_id, event.target.value) }}
                                    >
                                        <MenuItem value={''} disabled>Unknown</MenuItem>
                                        <MenuItem value={'washing'}>In washing</MenuItem>
                                        <MenuItem value={'washed'}>Washed</MenuItem>
                                        <MenuItem value={'dirty'}>Dirty</MenuItem>
                                    </Select>
                                </FormControl>
                            }
                            disablePadding
                            sx={{ mb: 1 }}
                        >
                            <ListItemButton onClick={() => setClothIdModal(cloth.cloth_id)}>
                                <ListItemAvatar>
                                    <Avatar src={cloth.image} />
                                </ListItemAvatar>
                                <ListItemText primary={cloth.name} />
                            </ListItemButton>
                        </ListItem>
                    )}
                    <ClothDetail clothId={clothIdModal} setClothIdModal={setClothIdModal} />
                </List>
            </Paper>
        </>
    )
}

export default ListClothes