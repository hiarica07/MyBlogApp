import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, CircularProgress, Divider } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CommentIcon from "@mui/icons-material/Comment";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { fetchFail, fetchStart } from "../../features/blogSlice";
// import { axiosPublic } from "../../hooks/useAxios";
// import { useEffect } from "react";

const BlogCard = ({
  _id,
  image,
  comments,
  content,
  title,
  createdAt,
  countOfVisitors,
  isPublish,
  likes,
  categoryId
}) => {
  const navigate = useNavigate();
  const { currentUser, loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh">
        <CircularProgress color="primary" />
      </Box>
    )
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={image}
        title={title}
        component="img"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {content}
        </Typography>
        <br />
        <Divider />
        <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
          Category: {categoryId?.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
          Published Date: {new Date(createdAt).toLocaleDateString(
          "en-GB",
          {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Button size="small" disabled>
            <FavoriteIcon sx={{color: "red"}}/>
            <span><strong>{likes?.length}</strong></span>
          </Button>
          <Button size="small" disabled>
            <CommentIcon sx={{color: "navy"}}/>
            <span><strong>{comments.length}</strong></span>
          </Button>
          <Button size="small" disabled>
            <VisibilityIcon sx={{color: "secondary.second"}}/>
            <span><strong>{countOfVisitors}</strong></span>
          </Button>
        </Box>
        {currentUser ? (
          <Box>
            <Button
              size="small"
              onClick={() => {                
                navigate("/details/" + _id);
              }}
            >
              Read More
            </Button>
          </Box>
        ) : (
          <Box>
            <Button
              size="small"
              onClick={() => {
                navigate("/login");
              }}
            >
              Read More
            </Button>
          </Box>
        )}
      </CardActions>
    </Card>
  );
};

export default BlogCard;
