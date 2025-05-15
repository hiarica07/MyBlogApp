import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useBlogCalls from "../../hooks/useBlogCalls";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  maxHeight: "90vh",
  overflowY: "auto",
};

const UpdateMyBlogModal = ({ open, handleClose, blog, categories }) => {
  const {putBlog} = useBlogCalls()
  const [formData, setFormData] = useState({
    title: blog?.title || "",
    content: blog?.content || "",
    image: blog?.image || "",
    categoryId: blog?.categoryId?._id || "",
    isPublish: blog?.isPublish ?? true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSwitchChange = (e) => {
    setFormData({
      ...formData,
      isPublish: e.target.checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    putBlog(blog?._id, formData)
    console.log("Form data:", formData);
    handleClose();
  };

  console.log("categories", categories);
  console.log("Form data:", formData);
  console.log("blog:", blog);
  console.log("blog.categoryId", blog.categoryId);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      }}
    >
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit My Blog
          </Typography>
          <Button onClick={handleClose} sx={{ minWidth: "auto", p: 0.5 }}>
            <CloseIcon />
          </Button>
        </Box>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Blog Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="image"
            label="Blog Picture URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="category-label">Blog Category</InputLabel>
            <Select
              labelId="category-label"
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              label="Blog Category"
              onChange={handleChange}
            >
              {/* Add an empty option */}
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {categories?.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            margin="normal"
            required
            fullWidth
            id="content"
            label="Blog Content"
            name="content"
            multiline
            rows={6}
            value={formData.content}
            onChange={handleChange}
          />

          <FormControlLabel
            control={
              <Switch
                checked={formData.isPublish}
                onChange={handleSwitchChange}
                name="isPublish"
                color="primary"
              />
            }
            label="Publish"
            sx={{ mt: 1 }}
          />

          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleClose} variant="outlined" sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Publish
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default UpdateMyBlogModal;
