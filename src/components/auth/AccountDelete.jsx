import { useState } from "react"
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
} from "@mui/material"

const AccountDelete = ({ id, isActive }) => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = () => {
    console.log("Deleting account with ID:", id)
    // In a real application, you would call your API here
    // changeMyStatus(id)
    setOpen(false)
  }

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        maxWidth: "576px",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 2,
        mt: 4,
      }}
    >
      <Typography variant="h6" fontWeight="500">
        Danger Zone
      </Typography>

      <Paper
        elevation={0}
        sx={{
          width: "100%",
          p: 4,
          border: 3,
          borderColor: "error.main",
          bgcolor: "error.light",
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="subtitle1" fontWeight="600" color="error.dark">
              Delete Account
            </Typography>
            <Typography variant="body2" color="error.dark">
              Permanently remove your account and all of your content. This action is not reversible.
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleClickOpen}
              sx={{
                borderRadius: 1,
                fontWeight: 600,
                "&:hover": {
                  bgcolor: "background.paper",
                  color: "error.main",
                  border: "2px solid",
                  borderColor: "error.main",
                },
              }}
            >
              Delete Account
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Confirmation Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete your account?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone. Your account and all your data will be permanently deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Yes, Delete My Account
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default AccountDelete