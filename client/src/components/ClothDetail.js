import { Box, Modal, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"

function ClothDetail(props) {
    const [clothData, setClothData] = useState(null)
    useEffect(() => {
        if (clothData || !props.detailModal) return
        (async () => {
            const response = await fetch(`/clothes/${props.detailModal}`)
            setClothData(await response.json())
        })()
    }, [clothData, props.detailModal])  //props.detailModal just to supress warning
    if (!clothData) return (<></>)
    return (
        <Modal
            open={props.detailModal}
            onClose={() => props.setDetailModal(false)}
            onClick={() => props.setDetailModal(false)}
        >
            <Box sx={{ position: 'absolute', top: '2%', left: 0, right: 0, ml: 'auto', mr: 'auto', maxWidth: 400, bgcolor: 'background.paper', borderRadius: 1, p: 3, pt: 2, pb: 2, display: 'flex', flexDirection: 'column' }}>
                <img src={clothData.image} alt={clothData.name} style={{ maxHeight: 250 }} />
                <Typography color='gray' component='h1' variant='h5' sx={{ m: 1, mb: 3 }}>Name: {clothData.name}</Typography>
                <Typography color='gray' component='h1' variant='h5' sx={{ m: 1, mb: 3 }}>Detail: {clothData.description}</Typography>
                <Typography color='gray' component='h1' variant='h5' sx={{ m: 1, mb: 3 }}>Sent {clothData.date_given}</Typography>
                <Typography color='gray' component='h1' variant='h5' sx={{ m: 1, mb: 3 }}>Came {clothData.date_came}</Typography>
                <Typography color='gray' component='h1' variant='h5' sx={{ m: 1, mb: 3 }}>Type: {clothData.type}</Typography>
                <Typography color='gray' component='h1' variant='h5' sx={{ m: 1, mb: 3 }}>Status: {clothData.status}</Typography>
            </Box>
        </Modal>
    )
}

export default ClothDetail