import React, { useState, useEffect } from "react"
import { List, Avatar, Typography, Box, Button, CircularProgress, Paper, IconButton, Tooltip } from "@mui/material"
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Edit as EditIcon,
  Delete as DeleteOutlineIcon,
  Person as PersonIcon,
} from "@mui/icons-material"
import CommentModal from "../Modals/CommentModal"
import useCommentCall from "../../hooks/useCommentCall"
import { useSelector } from "react-redux"

const CommentCard = ({ blogId }) => {
  const { getSingleBlogComments, deleteComment, postLikeComment } = useCommentCall()
  const { singleBlogComments, loading, error } = useSelector((state) => state.comments)
  const { currentUserId } = useSelector((state) => state.auth)

  useEffect(() => {
    getSingleBlogComments(blogId)
  }, [blogId])

  const [open, setOpen] = useState(false)
  const [selectedComment, setSelectedComment] = useState(null)

  const handleOpen = (comment) => {
    setSelectedComment(comment)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedComment(null)
  }

  const usersComment = (comment) => {
    if (currentUserId !== comment?.userId?._id) return false
    return currentUserId === comment?.userId?._id
  }

  const likedComment = (comment) => {
    if (!comment?.likes || !currentUserId) return false
    return comment?.likes.some((like) => like === currentUserId)
  }

  if (loading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" p={3}>
        <CircularProgress color="primary" size={30} />
      </Box>
    )
  }

  if (singleBlogComments.length === 0) {
    return (
      <Paper sx={{ p: 3, textAlign: "center", bgcolor: "background.paper" }}>
        <Typography variant="body1" color="text.secondary">
          Henüz yorum yapılmamış. İlk yorumu siz yapın!
        </Typography>
      </Paper>
    )
  }

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper", borderRadius: 1 }}>
      {singleBlogComments.map((comment, index) => {
        const formattedDate = new Date(comment.createdAt).toLocaleDateString("tr-TR", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })

        return (
          <React.Fragment key={comment._id || index}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                mb: 2,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar sx={{ bgcolor: "primary.main" }}>
                    {comment?.userId?.username?.[0]?.toUpperCase() || <PersonIcon />}
                  </Avatar>

                  <Box>
                    <Typography variant="subtitle2">{comment?.userId?.username || "Anonim"}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formattedDate}
                    </Typography>
                  </Box>
                </Box>

                {usersComment(comment) && (
                  <Box>
                    <Tooltip title="Düzenle">
                      <IconButton size="small" onClick={() => handleOpen(comment)}>
                        <EditIcon fontSize="small" color="primary" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Sil">
                      <IconButton size="small" onClick={() => deleteComment(comment._id, comment.blogId)}>
                        <DeleteOutlineIcon fontSize="small" color="error" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                )}
              </Box>

              <Typography
                variant="body1"
                sx={{
                  mt: 2,
                  mb: 2,
                  px: 1,
                  py: 1,
                  borderRadius: 1,
                }}
              >
                {comment?.comment}
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  size="small"
                  startIcon={likedComment(comment) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  onClick={() => postLikeComment(comment?._id, comment)}
                  color={likedComment(comment) ? "error" : "default"}
                  variant="text"
                >
                  {comment?.likes?.length || 0} Beğeni
                </Button>
              </Box>
            </Paper>

            {index < singleBlogComments.length - 1 && <Box sx={{ my: 2 }} />}
          </React.Fragment>
        )
      })}

      {/* Comment Edit Modal */}
      {selectedComment && <CommentModal open={open} handleClose={handleClose} comment={selectedComment} />}
    </List>
  )
}

export default CommentCard