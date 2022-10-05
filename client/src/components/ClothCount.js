import React, { useEffect, useState } from 'react'
import { Button, Grid, Paper } from '@mui/material'

function ClothCount(props) {
    const [paperElevation, setPaperElevation] = useState(5)
    const [counts, setCounts] = useState(undefined)

    useEffect(() => {
        if (counts instanceof Array && counts.length > 0) return
        (async () => {
            const res = await (await fetch('/clothes/count')).json()
            setCounts(res)
        })()
    }, [counts])

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
                    <Button sx={{ pt: 2, pb: 2, pl: 1, pr: 1, width: '100%' }} variant={props.clothStatus === "washing" ? 'contained' : 'text'} onClick={() => props.setClothStatus((prevState) => {
                        if (prevState === "washing") return ''
                        return "washing"
                    })}><b>Washing: {counts ? counts[0] : '?'}</b></Button>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: 'center' }}>
                    <Button sx={{ pt: 2, pb: 2, pl: 1, pr: 1, width: '100%' }} variant={props.clothStatus === "washed" ? 'contained' : 'text'} onClick={() => props.setClothStatus((prevState) => {
                        if (prevState === "washed") return ''
                        return "washed"
                    })}> <b>Washed: {counts ? counts[1] : '?'}</b></Button>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: 'center' }}>
                    <Button sx={{ pt: 2, pb: 2, pl: 1, pr: 1, width: '100%' }} variant={props.clothStatus === "dirty" ? 'contained' : 'text'} onClick={() => props.setClothStatus((prevState) => {
                        if (prevState === "dirty") return ''
                        return "dirty"
                    })}> <b>Dirty: {counts ? counts[2] : '?'}</b></Button>
                </Grid>
            </Grid >
        </Paper >
    )
}

export default ClothCount