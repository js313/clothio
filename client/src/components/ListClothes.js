import React, { useCallback, useEffect, useState } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Box, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Typography } from '@mui/material';
import NewClothForm from './modals/NewClothForm';
import ClothDetail from './modals/ClothDetail';
import ConfirmDelete from './modals/ConfirmDelete';
import EditModal from './modals/EditCloth';

function ListClothes(props) {
    const [clothes, setClothes] = useState([])
    const [paperElevation, setPaperElevation] = useState(5)
    const [clothType, setClothType] = useState('')
    const [formModal, setFormModal] = useState(false)
    const [clothIdModal, setClothIdModal] = useState('')
    const [deleteModal, setDeleteModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [listMode, setListMode] = useState(0)

    const getClothes = useCallback(async () => {
        const clothesList = await (await fetch(`/clothes?type=${clothType}&status=${props.clothStatus}`)).json()
        setClothes(clothesList.length > 0 ? clothesList : null)
    }, [clothType, props.clothStatus])

    useEffect(() => {
        if ((clothes instanceof Array && clothes.length > 0)) return
        getClothes()
    }, [clothes, clothType, getClothes])
    useEffect(() => {
        resetClothesList()
        resetClothesCount()
        // eslint-disable-next-line
    }, [props.clothStatus])

    function mouseEnter() {
        setPaperElevation(10)
    }
    function mouseLeave() {
        setPaperElevation(5)
    }
    function resetClothesList() {
        setClothes([])
    }
    function resetClothesCount() {
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
            resetClothesCount()
        }
    }

    return (
        <>
            <Box justifyContent='space-between' alignItems='center' sx={{ display: 'flex', pt: 3, pb: 3 }}>
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
                <IconButton color='info' aria-label="add" onClick={() => setFormModal(true)}><AddRoundedIcon /></IconButton>
                <IconButton color='secondary' aria-label="edit" onClick={() => setListMode((prevState) => prevState === 1 ? 0 : 1)}><EditRoundedIcon /></IconButton>
                <IconButton color='error' aria-label="delete" onClick={() => setListMode((prevState) => prevState === 2 ? 0 : 2)}><DeleteRoundedIcon /></IconButton>
                <NewClothForm formModal={formModal} setFormModal={setFormModal} resetClothesList={resetClothesList} resetClothesCount={resetClothesCount} />
            </Box>
            <Paper elevation={paperElevation} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
                <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {clothes && clothes.length > 0 ? clothes.map(cloth =>
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
                            <ListItemButton onClick={() => { listMode === 0 ? setClothIdModal(cloth.cloth_id) : listMode === 1 ? setEditModal(cloth.cloth_id) : setDeleteModal(cloth.cloth_id) }}>
                                {listMode ? <IconButton sx={{ ml: -1, mr: 1, p: 1 }} color={listMode === 1 ? 'secondary' : 'error'}>{listMode === 1 ? <EditRoundedIcon /> : <DeleteRoundedIcon />}</IconButton> : ''}
                                <ListItemAvatar>
                                    <Avatar src={cloth.image} />
                                </ListItemAvatar>
                                <ListItemText primary={cloth.name} />
                            </ListItemButton>
                        </ListItem>
                    ) : <Typography variant='h4' component='h1' sx={{ textAlign: 'center', p: 3, color: 'gray' }}>No clothes found</Typography>
                    }
                    <ClothDetail clothId={clothIdModal} setClothIdModal={setClothIdModal} />
                    <ConfirmDelete deleteModal={deleteModal} setDeleteModal={setDeleteModal} resetClothesList={resetClothesList} />
                    <EditModal editModal={editModal} setEditModal={setEditModal} />
                </List>
            </Paper>
        </>
    )
}

export default ListClothes