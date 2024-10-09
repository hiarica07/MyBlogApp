import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { FormControl, TextField } from "@mui/material";
import useBlogCalls from "../../hooks/useBlogCalls";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CommentModal = ({ comment, open, handleClose, initialState }) => {

  console.log(comment);
  const {putComment} = useBlogCalls()

  const [info, setInfo] = useState({
    blogId: comment.blogId,
    comment: comment.comment
  })

  const handleChange = (e) => {
    
    // setInfo({...info, [e.target.name]: e.target.value})
    setInfo({...info, comment: e.target.value})
  }
  console.log(info);    

  const id = comment._id
  console.log(id);
  

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
      >
        <Box sx={style}>
          <FormControl
            component="form"
            onSubmit={handleSubmit}
            fullWidth
            sx={{ mt: 3 }}
          >
            <TextField
              label="Comment"
              name="comment"
              id="comment"
              variant="outlined"
              value={info.comment}
              onChange={handleChange}
            />
            <Button variant="contained" type="submit" sx={{ mt: 6 }}>
              Edit Comment
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
};

export default CommentModal;