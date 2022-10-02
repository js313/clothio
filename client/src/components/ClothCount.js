import React, { useEffect, useState } from 'react'
import { Button, Grid, Paper } from '@mui/material'

function ClothCount() {
    // const [clothes, setClothes] = useState([])
    const [paperElevation, setPaperElevation] = useState(5)
    useEffect(() => {
        // if (clothes && clothes instanceof Array && clothes.length > 0) return
        // (async () => {
        //     const clothesList = await (await fetch('/clothes')).json()
        //     setClothes(clothesList)
        // })()
    }, [])

    function mouseEnter() {
        setPaperElevation(10)
    }
    function mouseLeave() {
        setPaperElevation(5)
    }

    return (
        <Paper elevation={paperElevation} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
            <Grid container spacing={0}>
                <Grid item xs={4} sx={{ textAlign: 'center' }}>
                    <Button sx={{ pt: 2, pb: 2, width: '100%' }}><b>Washing: {3}</b></Button>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: 'center' }}>
                    <Button sx={{ pt: 2, pb: 2, width: '100%' }}><b>Washed: {30}</b></Button>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: 'center' }}>
                    <Button sx={{ pt: 2, pb: 2, width: '100%' }}><b>Dirty: {3}</b></Button>
                </Grid>
            </Grid>
        </Paper >
    )
}

export default ClothCount