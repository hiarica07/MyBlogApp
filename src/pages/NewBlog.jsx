import React from "react";
import {
  TextField,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import useBlogCalls from "../hooks/useBlogCalls";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCategoryCall from "../hooks/useCategoryCall";

const NewBlog = () => {

  const navigate = useNavigate()
  const { postBlog } = useBlogCalls();
  const { getAllCategories } = useCategoryCall();

  useEffect(() => {
    getAllCategories();
  }, []);

  const { categories } = useSelector((state) => state.category);
  // console.log("categories", categories);

  const [initialState, setInitialState] = useState({
    categoryId: "",
    title: "",
    content: "",
    image: "",
    isPublish: ""
  })

  const [newBlog, setNewBlog] = useState(initialState)

  const handleChange = (e) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log("newBlog", newBlog)
    postBlog("blogs", newBlog)
    navigate("/")
  }

  // console.log(newBlog);  

  return (
    <Box
      sx={{
        mt: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography>NEW BLOG</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: 400,
          margin: "auto",
          padding: 2,
        }}
      >
        <TextField
          label="Title"
          name="title"
          variant="outlined"
          id="title"
          type="text"
          value={newBlog.title}
          onChange={handleChange}
          required
        />
        <TextField
          label="Image URL"
          name="image"
          variant="outlined"
          id="image"
          type="img"
          value={newBlog.image}
          onChange={handleChange}
          required
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" required>
            Category
          </InputLabel>
          <Select
            labelId="demo-category-select-label"
            id="demo-category-select"
            value={newBlog.categoryId}
            name="categoryId"
            label="Category"
            onChange={handleChange}
            required
          >
            <MenuItem value="" disabled>Please choose...</MenuItem>
            {categories?.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-status-select-label" required>
            Status
          </InputLabel>
          <Select
            labelId="demo-status-select-label"
            id="demo-status-select"
            value={newBlog.isPublish}
            name="isPublish"
            label="Status"
            onChange={handleChange}
            required
          >
            <MenuItem value="" disabled>Please choose...</MenuItem>
            <MenuItem value={false}>Draft</MenuItem>
            <MenuItem value={true}>Publish</MenuItem>
            
          </Select>
        </FormControl>
        <TextField
          label="Content"
          name="content"
          variant="outlined"
          id="content"
          type="text"
          value={newBlog.content}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained">
          New Blog
        </Button>
      </Box>
    </Box>
  );
};

export default NewBlog;
