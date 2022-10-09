import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";

function ConfirmDelete(props) {

    async function deleteHandler() {
        props.resetClothesList()
        props.setDeleteModal(false)
        await fetch(`/clothes/${props.deleteModal}`, {
            method: 'DELETE'
        })
    }

    return (
        <Modal
            open={Boolean(props.deleteModal)}
            onClose={() => props.setDeleteModal(false)}
        >
            <Box sx={{ position: 'absolute', top: '30%', left: 0, right: 0, ml: 'auto', mr: 'auto', maxWidth: 300, bgcolor: 'background.paper', borderRadius: 1, p: 3, pt: 2, pb: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography color='darkgray' component='h1' variant='h6' sx={{ m: 1, mb: 3 }}>This action cannot be undone, are you sure?</Typography>
                <Button onClick={deleteHandler} sx={{ mb: 1, pt: 1, pb: 1 }}>Delete</Button>
                <Button variant='contained' onClick={() => props.setDeleteModal(false)} sx={{ mb: 2, pt: 1, pb: 1 }}>Cancel</Button>
            </Box>
        </Modal>
    )
}

export default ConfirmDelete