import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Divider } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CommentIcon from '@mui/icons-material/Comment';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchFail, fetchStart } from "../../features/authSlice";
import { axiosPublic } from "../../hooks/useAxios";
import { useEffect } from "react";

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
  postLike
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {currentUser} = useSelector(state => state.auth)


  const getSingeBlog = async (id) => {
    dispatch(fetchStart())
    
    try {

      const {data} = await axiosPublic(`blogs/${id}`)
      console.log("SingleBlog:",data);
      
      
    } catch (error) {
      dispatch(fetchFail())
      console.log("error");
      
    }
  
  
  }

  useEffect(()=>{
    getSingeBlog()
  },[])
  
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
          Published Date: {createdAt}
        </Typography>
      </CardContent>
      <CardActions 
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Button size="small">
            <FavoriteIcon
              onClick={() => postLike(_id)}
            /> 
            <span>{likes?.length}</span>
          </Button>
          <Button size="small">
            <CommentIcon/> 
            <span>{comments.length}</span>
          </Button>
          <Button size="small">
            <VisibilityIcon/> 
            <span>{countOfVisitors}</span>
          </Button> 
          
        </Box>
        {currentUser ? (
          <Box>
          <Button
            size="small"
            onClick={() => {
              navigate("/details")
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
              navigate("/login")
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