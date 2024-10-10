import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import useBlogCalls from "../../hooks/useBlogCalls";
import CommentModal from "../Modals/CommentModal";

const CommentCard = ({ comments }) => {
  const { deleteComment } = useBlogCalls();

  const [open, setOpen] = useState(false); // Modal açık mı kontrolü
  const [selectedComment, setSelectedComment] = useState(null); // Seçilen yorumu tutar

  // Modal'ı açarken tıklanan yorumu seçer ve state'e ekler
  const handleOpen = (comment) => {
    setSelectedComment(comment);
    setOpen(true);
  };

  // Modal'ı kapatır ve seçilen yorumu sıfırlar
  const handleClose = () => {
    setOpen(false);
    setSelectedComment(null);
  };

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper", mt: 4 }}>
      {comments.map((comment) => {
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
          <ListItem key={comment._id} alignItems="flex-start">
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* Edit Butonu */}
              <Button size="small" onClick={() => handleOpen(comment)}>
                <EditIcon />
              </Button>

              {/* CommentModal */}
              {selectedComment && (
                <CommentModal
                  open={open}
                  handleClose={handleClose}
                  comment={selectedComment} // Seçilen yorumu modal'a gönder
                />
              )}

              {/* Delete Butonu */}
              <Button size="small" onClick={() => deleteComment(comment._id)}>
                <DeleteOutlineIcon />
              </Button>
            </Box>
          </ListItem>
        );
      })}
    </List>
  );
};

export default CommentCard;
