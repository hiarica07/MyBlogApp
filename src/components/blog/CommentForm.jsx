import React from "react";
import { Box, Button, Container, FormControl, TextField } from "@mui/material";
import CommentCard from "./CommentCard";
import { useState } from "react";
import useBlogCalls from "../../hooks/useBlogCalls";

const CommentForm = ({
  open,
  comments,
  setOpen,
  initialState,
  setInitialState,
  _id,
  getSingleBlog,
}) => {
  const [info, setInfo] = useState(initialState);
  // const [lastComments,setLastComments] = useState([])

  // console.log(info);
  console.log(comments);

  const { postComment } = useBlogCalls();
  // console.log(open);

  const handleChange = (e) => {
    // console.log(e.target);
    console.log(e.target.value);

    setInfo({ ...info, blogId: _id, [e.target.name]: e.target.value });
    // console.log(info);
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
      <Box>
        {open && (
          <CommentCard
            comments={comments}
            open={open}
            setOpen={setOpen}
            initialState={initialState}
            setInitialState={setInitialState}
          />
        )}
      </Box>
    </Container>
  );
};

export default CommentForm;