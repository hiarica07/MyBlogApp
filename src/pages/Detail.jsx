import {
  Box,
  Button,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";
import { axiosPublic } from "../hooks/useAxios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CommentIcon from "@mui/icons-material/Comment";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import useBlogCalls from "../hooks/useBlogCalls";
// import CommentCard from "../components/blog/CommentCard";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CommentForm from "../components/blog/CommentForm";
import UpdateMyBlogModal from "../components/Modals/UpdateMyBlogModal";
import CommentCard from "../components/blog/CommentCard";

const Detail = () => {
  const navigate = useNavigate();

  const { getSingleBlog, deleteBlog, postLikeBlog, getBlogsData } = useBlogCalls();

  const { blog, loading, categories } = useSelector((state) => state.blog);
  const { currentUserId } = useSelector((state) => state.auth);

  console.log("categories", categories);


  const [open, setOpen] = useState(false);
  const toggleComments = () => setOpen(!open);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const handleEditModalOpen = () => setEditModalOpen(true);
  const handleEditModalClose = () => setEditModalOpen(false);

  const { _id } = useParams();

  const {
    comments,
    content,
    countOfVisitors,
    createdAt,
    image,
    isPublish,
    likes,
    title,
    userId,
    categoryId
  } = blog;

  console.log(blog);

  useEffect(() => {
    getSingleBlog(_id);
    getBlogsData("categories");
  }, []);

  const likedBlog = () => {
    if (!likes || !currentUserId) return false;
    return likes.some((like) => like === currentUserId);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Container
      maxWidth={"lg"}
      sx={{ display: "flex", flexDirection: "column", m: 4 }}
    >
      {/* Blog Image */}
      <CardMedia
        sx={{ height: 140, width: 140 }}
        image={image}
        title={title}
        component="img"
      />

      {/* User info */}
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <div>
          <AccountBoxIcon />
        </div>
        <div>
          <Typography gutterBottom variant="body2" component="div">
            {userId?.username}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
            {new Date(createdAt).toLocaleString("tr-TR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </Typography>
        </div>

        <br />
        <Divider />
      </CardContent>
      {/* Blog Info */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
          }}
        >
          {content}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
          }}
        >
          Category: {categoryId?.name}
        </Typography>
      </CardContent>
      {/* Blog Icons / Like-Comments-CountofVisitors */}
      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        <Box>
          <Button size="small" onClick={() => postLikeBlog(_id)}>
            {likedBlog() ? (
              <FavoriteIcon sx={{ color: "red" }} />
            ) : (
              <FavoriteBorderIcon sx={{ color: "red" }} />
            )}

            <span>{likes?.length}</span>
          </Button>
          <Button size="small" onClick={toggleComments}>
            <CommentIcon sx={{ color: "navy" }} />
            <span>{comments?.length}</span>
          </Button>
          <Button size="small">
            <VisibilityIcon sx={{ color: "secondary.second" }} />
            <span>{countOfVisitors}</span>
          </Button>
        </Box>
        {/* Icons / Edit-Delete */}
        <Box>
          <Button size="small" onClick={handleEditModalOpen}>
            <EditIcon sx={{ color: "blue" }} />
          </Button>
          <Button
            size="small"
            onClick={() => {
              deleteBlog(_id);
              navigate("/");
            }}
          >
            <DeleteOutlineIcon sx={{ color: "red" }} />
          </Button>
        </Box>
      </Box>

      {/* Edit Blog Modal */}
      <Box>
        {editModalOpen && (
          <UpdateMyBlogModal
            open={editModalOpen}
            handleClose={handleEditModalClose}
            blog={blog}
            categories={categories}
          />
        )}
      </Box>
      {/* Comment Form */}
      <Box>
        {open && (
          <CommentForm
            open={open}
            setOpen={setOpen}
           // initialState={initialState}
           // setInitialState={setInitialState}

            _id={_id}
          />
        )}
      </Box>
      {/* Comment Card  */}
      <Box>
        {open && (
          <CommentCard
            blogId={_id}
            // open={open}
            // setOpen={setOpen}

            // initialState={initialState}
            // setInitialState={setInitialState}
          />
        )}
      </Box>
      {/* Go Back Button */}
      <Box
        sx={{display: "flex", justifyContent: "center", alignItems: "center", my: "5px", mx: "10px"}}
        onClick={() => {
          navigate(-1);
        }}
      >
        <Button
          size="small"
          sx={{border: "1px solid gray", py: "10px", px: "20px"}}
        >         
          Go Back
        </Button>
      </Box>
    </Container>
  );
};

export default Detail;
