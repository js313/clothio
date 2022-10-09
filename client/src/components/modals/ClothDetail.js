import { Box, Modal, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"

function ClothDetail(props) {
    const [clothData, setClothData] = useState(null)
    useEffect(() => {
        if (!props.clothId) return
        (async () => {
            const response = await fetch(`/clothes/${props.clothId}`)
            setClothData(await response.json())
        })()
    }, [props.clothId])
    if (!clothData) return (<></>)
    return (
        <Modal
            open={!!props.clothId}
            onClose={() => props.setClothIdModal('')}
            onClick={() => props.setClothIdModal('')}
        >
            <Box sx={{ position: 'absolute', top: '2%', left: 0, right: 0, ml: 'auto', mr: 'auto', maxWidth: 300, bgcolor: 'background.paper', borderRadius: 1, p: 3, pt: 2, pb: 2, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <img src={clothData.image} alt={clothData.name} style={{ maxHeight: '40%', maxWidth: '100%' }} />
                </Box>
                <Typography color='gray' component='h1' variant='h6' sx={{ m: 1, mb: 1 }}>Name: <Typography color='black' component='span' variant='h6' sx={{ m: 1, mb: 1 }}>{clothData.name}</Typography></Typography>
                <Typography color='gray' component='h1' variant='h6' sx={{ m: 1, mb: 1 }}>Detail: <Typography color='black' component='span' variant='h6' sx={{ m: 1, mb: 1 }}>{clothData.description}</Typography></Typography>
                <Typography color='gray' component='h1' variant='h6' sx={{ m: 1, mb: 1 }}>Sent: <Typography color='black' component='span' variant='h6' sx={{ m: 1, mb: 1 }}>{clothData.date_given}</Typography></Typography>
                <Typography color='gray' component='h1' variant='h6' sx={{ m: 1, mb: 1 }}>Came: <Typography color='black' component='span' variant='h6' sx={{ m: 1, mb: 1 }}>{clothData.date_came}</Typography></Typography>
                <Typography color='gray' component='h1' variant='h6' sx={{ m: 1, mb: 1 }}>Type: <Typography color='black' component='span' variant='h6' sx={{ m: 1, mb: 1 }}>{clothData.type}</Typography></Typography>
                <Typography color='gray' component='h1' variant='h6' sx={{ m: 1, mb: 1 }}>Status: <Typography color='black' component='span' variant='h6' sx={{ m: 1, mb: 1 }}>{clothData.status}</Typography></Typography>
            </Box>
        </Modal>
    )
}

export default ClothDetail