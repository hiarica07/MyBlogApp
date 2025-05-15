"use client"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import { useState } from "react"
import { FormControl, TextField, Backdrop } from "@mui/material"
// import useBlogCalls from "../../hooks/useBlogCalls";
import useCommentCall from "../../hooks/useCommentCall"

// Bottom drawer style instead of centered modal
const style = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  width: "100%",
  maxHeight: "50vh", // Takes up to 50% of viewport height
  overflowY: "auto", // Enables scrolling within the modal
  bgcolor: "background.paper",
  borderTopLeftRadius: "16px",
  borderTopRightRadius: "16px",
  boxShadow: 24,
  p: 4,
  transform: "none", // Remove the translate transform
}

const CommentModal = ({ comment, open, handleClose, initialState }) => {
  // console.log(comment)
  const { putComment } = useCommentCall()

  const [info, setInfo] = useState({
    blogId: comment.blogId,
    comment: comment.comment,
  })

  const handleChange = (e) => {
    // setInfo({...info, [e.target.name]: e.target.value})
    setInfo({ ...info, comment: e.target.value })
  }
  // console.log(info)

  const id = comment._id
  // console.log(id)

  const handleSubmit = (e) => {
    e.preventDefault()
    putComment(id, info)
    handleClose()
    setInfo({
      blogId: "",
      comment: "",
    })
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        // Allow scrolling of the background content
        disableScrollLock={true}
        // Customize backdrop to be semi-transparent
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: "rgba(0, 0, 0, 0.1)", // Semi-transparent backdrop
            },
          },
        }}
        // Animation for sliding up from bottom
        sx={{
          "& .MuiBox-root": {
            transition: "transform 3s ease-out",
            transform: open ? "translateY(0)" : "translateY(100%)",
          },
        }}
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2" gutterBottom>
            Edit Your Comment
          </Typography>
          <FormControl component="form" onSubmit={handleSubmit} fullWidth sx={{ mt: 3 }}>
            <TextField
              label="Comment"
              name="comment"
              id="comment"
              variant="outlined"
              value={info.comment}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
            />
            <Button variant="contained" type="submit" sx={{ mt: 3 }}>
              Edit Comment
            </Button>
            <Button variant="outlined" onClick={handleClose} sx={{ mt: 1 }}>
              Cancel
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </div>
  )
}

export default CommentModal
