import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box, Button, CircularProgress } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CommentModal from "../Modals/CommentModal";
import useCommentCall from "../../hooks/useCommentCall";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const CommentCard = ({ blogId }) => {
  const {getSingleBlogComments, deleteComment, postLikeComment} = useCommentCall()
  const {singleBlogComments, loading, error} = useSelector((state) => state.comments)
  // console.log("singleBlogComments", singleBlogComments);
  const {currentUserId} = useSelector(state => state.auth)
  // console.log("currentUserId", currentUserId);
  

  useEffect(() => {
    getSingleBlogComments(blogId);
  }, [blogId]);

  const [open, setOpen] = useState(false); // Modal control
  const [selectedComment, setSelectedComment] = useState(null); // Seçilen yorumu tutar

  // Modal'ı açarken tıklanan yorumu seçer ve state'e ekler
  const handleOpen = (comment) => {
    setSelectedComment(comment);
    setOpen(true);
  };

  // Close Modal
  const handleClose = () => {
    setOpen(false);
    setSelectedComment(null);
  };

  const usersComment = (comment) => {
    if (currentUserId !== comment?.userId?._id) return false
    return currentUserId === comment?.userId?._id
  }

  const likedComment = (comment) => {
    if (!comment?.likes || !currentUserId) return false
    return comment?.likes.some((like) => like === currentUserId)
  }

  // console.log(comments);
  if (loading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh">
        <CircularProgress color="primary" />
      </Box>
    )
  }  

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper", mt: 4 }}>
      {singleBlogComments.map((comment, index) => {
        const formattedDate = new Date(comment.createdAt).toLocaleDateString(
          "en-GB",
          {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          }
        );
        return (
          <ListItem key={index} alignItems="flex-start" sx={{my: 4}}>
            <ListItemAvatar>
              <Avatar alt={comment?.userId?.username} src="/static/images/avatar/1.jpg" />
              <Typography>{comment?.userId?.username}</Typography>
              <Typography>{formattedDate}</Typography>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: "text.primary", display: "inline" }}
                >
                  {comment?.comment}
                </Typography>
              }
            />
            <br />
            <Divider />
            {usersComment(comment) ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  gap: "10px"
                }}
              >
                {/* Like Button */}
                <Button 
                  size="small" 
                  onClick={() => postLikeComment(comment?._id, comment)} 
                  sx={{
                    gap: "3px"
                  }}
                >
                  {likedComment(comment) ? (
                    <FavoriteIcon sx={{color: "red"}}/>
                  ) : (
                    <FavoriteBorderIcon sx={{ color: "red" }} />
                  )}
            
                  <span>{comment?.likes?.length}</span>
                </Button>
                {/* Edit Button */}
                <Button size="small" onClick={() => handleOpen(comment)}>
                  <EditIcon sx={{color: "blue"}}/>
                </Button>

                {/* CommentModal */}
                {selectedComment && (
                  <CommentModal
                    open={open}
                    handleClose={handleClose}
                    comment={selectedComment} // Seçilen yorumu modal'a gönder
                  />
                )}

                {/* Delete Button */}
                <Button size="small" onClick={() => deleteComment(comment._id, comment.blogId)}>
                  <DeleteOutlineIcon sx={{color: "red"}}/>
                </Button>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "10px"
                }}
              >
                {/* Like Button */}
                <Button 
                  size="small" 
                  onClick={() => postLikeComment(comment?._id, comment)} 
                  sx={{
                    gap: "3px"
                  }}
                >
                  {likedComment(comment) ? (
                    <FavoriteIcon sx={{color: "red"}}/>
                  ) : (
                    <FavoriteBorderIcon sx={{ color: "red" }} />
                  )}            
                  <span>{comment?.likes?.length}</span>
                </Button>                
              </Box>
            )}            
          </ListItem>
        );
      })}
    </List>
  );
};

export default CommentCard;