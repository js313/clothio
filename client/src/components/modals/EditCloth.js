import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";

function EditModal(props) {
    return (
        <Modal
            open={!!props.deleteModal}
            onClose={() => props.setEditModal(false)}
        >
            <Box sx={{ position: 'absolute', top: '30%', left: 0, right: 0, ml: 'auto', mr: 'auto', maxWidth: 300, bgcolor: 'background.paper', borderRadius: 1, p: 3, pt: 2, pb: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography color='darkgray' component='h1' variant='h6' sx={{ m: 1, mb: 3 }}>This action cannot be undone, are you sure?</Typography>
                <Button sx={{ mb: 1 }}>Delete</Button>
                <Button variant='contained' sx={{ mb: 2 }}>Cancel</Button>
            </Box>
        </Modal>
    )
}

export default EditModal