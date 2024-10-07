import React from 'react';
import { Box, Button, Container, FormControl, TextField } from "@mui/material";
import CommentCard from './CommentCard';
import { useState } from 'react';
import useBlogCalls from '../../hooks/useBlogCalls';

const CommentForm = ({ open, comments, SetOpen, initialState, setInitialState, _id }) => {
  const [info, setInfo] = useState(initialState);

  const { postComments } = useBlogCalls();

  const handleChange = (e) => {
    setInfo({ ...info, blogId: _id, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postComments("comments", info);
    
  };

  return (
    <Container>
      <FormControl fullWidth sx={{ mt: 3 }} component="form" onSubmit={handleSubmit}>
        <TextField
          label="Comment"
          name="comment"
          id="comment"
          variant="outlined"
          placeholder="Add a comment..."
          value={info.comment || ""}
          onChange={handleChange}
        />
        <Button 
          variant="contained" 
          type="submit" 
          sx={{ mt: 6 }}
          
        >
          Add Comment
        </Button>
      </FormControl>
      <Box>
        {open && <CommentCard comments={comments} open={open} SetOpen={SetOpen} />}
      </Box>
    </Container>
  );
};

export default CommentForm;
