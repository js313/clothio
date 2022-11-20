import { Box, Modal, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"

function ClothDetail(props) {
    const [clothData, setClothData] = useState(null)
    useEffect(() => {
        if (!props.clothId) return
        (async () => {
            const response = await fetch(`/clothes/${props.clothId}`)
            const data = await response.json()
            if (data.date_given) {
                const dateGiven = new Date(data.date_given).toLocaleDateString()
                const timeGiven = new Date(data.date_given).toLocaleTimeString()
                data.date_given = dateGiven + ", " + timeGiven
            }
            if (data.date_came) {
                const dateCame = new Date(data.date_came).toLocaleDateString()
                const timeCame = new Date(data.date_came).toLocaleTimeString()
                data.date_came = dateCame + ", " + timeCame
            }
            setClothData(data)
        })()
    }, [props.clothId])
    if (!clothData) return (<></>)
    return (
        <Modal
            open={!!props.clothId}
            onClose={() => props.setClothIdModal('')}
            onClick={() => props.setClothIdModal('')}
        >
            <Box sx={{ position: 'absolute', top: '2%', left: 0, right: 0, ml: 'auto', mr: 'auto', maxWidth: 300, backgroundColor: '#202124', borderRadius: 1, p: 3, pt: 2, pb: 2, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <img src={clothData.image} alt={clothData.name} style={{ maxHeight: '40%', maxWidth: '100%' }} />
                </Box>
                <Typography color='gray' component='h1' variant='h6' sx={{ m: 1, mb: 1 }}>Name:<Typography color='black' component='span' variant='h6' fontSize={18} sx={{ m: 1, mb: 1, color: '#D6D6D7' }}>{clothData.name}</Typography></Typography>
                <Typography color='gray' component='h1' variant='h6' sx={{ m: 1, mb: 1 }}>Detail:<Typography color='black' component='span' variant='h6' fontSize={18} sx={{ m: 1, mb: 1, color: '#D6D6D7' }}>{clothData.description}</Typography></Typography>
                <Typography color='gray' component='h1' variant='h6' sx={{ m: 1, mb: 1 }}>Sent:<Typography color='black' component='span' variant='h6' fontSize={18} sx={{ m: 1, mb: 1, color: '#D6D6D7' }}>{clothData.date_given}</Typography></Typography>
                <Typography color='gray' component='h1' variant='h6' sx={{ m: 1, mb: 1 }}>Came:<Typography color='black' component='span' variant='h6' fontSize={18} sx={{ m: 1, mb: 1, color: '#D6D6D7' }}>{clothData.date_came}</Typography></Typography>
                <Typography color='gray' component='h1' variant='h6' sx={{ m: 1, mb: 1 }}>Type:<Typography color='black' component='span' variant='h6' fontSize={18} sx={{ m: 1, mb: 1, color: '#D6D6D7' }}>{clothData.type}</Typography></Typography>
                <Typography color='gray' component='h1' variant='h6' sx={{ m: 1, mb: 1 }}>Status:<Typography color='black' component='span' variant='h6' fontSize={18} sx={{ m: 1, mb: 1, color: '#D6D6D7' }}>{clothData.status}</Typography></Typography>
            </Box>
        </Modal>
    )
}

export default ClothDetail