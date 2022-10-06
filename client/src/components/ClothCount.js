import React, { useEffect, useState } from 'react'
import { Button, Grid, Paper } from '@mui/material'

function ClothCount({ counts, setCounts, clothStatus, setClothStatus }) {
    const [paperElevation, setPaperElevation] = useState(5)

    useEffect(() => {
        if (counts instanceof Array && counts.length > 0) return
        (async () => {
            const data = await (await fetch('/clothes/count')).json()
            const countsArray = ['?', '?', '?']
            try {
                data.forEach(el => {
                    let index
                    if (el.status === "washing") index = 0
                    else if (el.status === "washed") index = 1
                    else index = 2
                    countsArray[index] = el.count
                })
            } catch (err) {
                console.log(err)
            }
            setCounts(countsArray)
        })()
    }, [counts, setCounts])

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
                    <Button sx={{ pt: 2, pb: 2, pl: 1, pr: 1, width: '100%' }} variant={clothStatus === "washing" ? 'contained' : 'text'} onClick={() => setClothStatus((prevState) => {
                        if (prevState === "washing") return ''
                        return "washing"
                    })}><b>Washing: {counts ? counts[0] : '?'}</b></Button>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: 'center' }}>
                    <Button sx={{ pt: 2, pb: 2, pl: 1, pr: 1, width: '100%' }} variant={clothStatus === "washed" ? 'contained' : 'text'} onClick={() => setClothStatus((prevState) => {
                        if (prevState === "washed") return ''
                        return "washed"
                    })}> <b>Washed: {counts ? counts[1] : '?'}</b></Button>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: 'center' }}>
                    <Button sx={{ pt: 2, pb: 2, pl: 1, pr: 1, width: '100%' }} variant={clothStatus === "dirty" ? 'contained' : 'text'} onClick={() => setClothStatus((prevState) => {
                        if (prevState === "dirty") return ''
                        return "dirty"
                    })}> <b>Dirty: {counts ? counts[2] : '?'}</b></Button>
                </Grid>
            </Grid >
        </Paper >
    )
}

export default ClothCount