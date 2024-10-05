import React from "react";
import { useEffect } from "react";
import useBlogCalls from "../../hooks/useBlogCalls";
import { useSelector } from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const CommentCard = ({comments}) => {

  // const { comments } = useSelector((state) => state.blog);

  // const { getComments } = useBlogCalls();

  // useEffect(() => {
  //   getComments();
  // }, []);

  // console.log("comments:", comments);

  return (
    <List sx={{ width: "100%",  bgcolor: "background.paper" }}>
      {comments.map((comment) => {
        const formattedDate = new Date(comment.createdAt).toLocaleDateString("en-GB", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        });
        return (
        <ListItem key={comment._id} alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt={comment?.userId?.username}
              src="/static/images/avatar/1.jpg"
            />
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
        </ListItem>
      )})}
      
    </List>
  );
};

export default CommentCard;