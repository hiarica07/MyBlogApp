import {
  Box,
  Button,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { fetchFail, fetchStart } from "../features/blogSlice";
import { axiosPublic } from "../hooks/useAxios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CommentIcon from "@mui/icons-material/Comment";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import useBlogCalls from "../hooks/useBlogCalls";
import CommentCard from "../components/blog/CommentCard";
import CommentForm from "../components/blog/CommentForm";

const Detail = () => {
  const [blogDetail, setBlogDetail] = useState("");
  const [open, SetOpen] = useState(false)
  const toggleComments = () => SetOpen(!open)

  // console.log(open);
  

  const { _id } = useParams();

  const {comments, content, countOfVisitors, createdAt, image, isPublish, likes, title, userId} = blogDetail;

  const dispatch = useDispatch();

  const getSingleBlog = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosPublic(`blogs/${_id}`);
      setBlogDetail(data.data);

      // console.log(data.data);
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  useEffect(() => {
    getSingleBlog();
  }, []);

  const { postLike } = useBlogCalls();

  console.log("comments", comments);

  return (
    <Container
      maxWidth={"lg"}
      sx={{ display: "flex", flexDirection: "column", m: 4 }}
    >      
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
      </CardContent>
      <Box>
        <Button size="small">
          <FavoriteIcon onClick={() => postLike(_id)} />
          <span>{likes?.length}</span>
        </Button>
        <Button 
          size="small"
          onClick={toggleComments}
        >
          <CommentIcon />
          <span>{comments?.length}</span>
        </Button>
        <Button size="small">
          <VisibilityIcon />
          <span>{countOfVisitors}</span>
        </Button>
      </Box>
      <Box>
        {open && <CommentForm open={open} comments={comments} /> }
        
      </Box>
    </Container>
  );
};

export default Detail;