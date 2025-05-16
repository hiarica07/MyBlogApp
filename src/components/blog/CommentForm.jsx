import { Box, Button, Container, FormControl, TextField } from "@mui/material";
import { useState } from "react";
import useCommentCall from "../../hooks/useCommentCall"

const CommentForm = ({
  _id,
  
}) => {
  const { postComment } = useCommentCall();

   const [info, setInfo] = useState({
    blogId: "",
    comment: "",
  });
  
  
  const handleChange = (e) => {
    setInfo({ ...info, blogId: _id, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postComment("comments", info);
    setInfo({
      blogId: "",
      comment: "",
    });
  };

  return (
    <Container>
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
          placeholder="Add a comment..."
          value={info.comment}
          onChange={handleChange}
        />
        <Button variant="contained" type="submit" sx={{ mt: 6 }}>
          Add Comment
        </Button>
      </FormControl>
      
    </Container>
  );
};

export default CommentForm;
