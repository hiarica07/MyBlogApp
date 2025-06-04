import { useState } from "react"
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material"
import {
  MoreVert as MoreVertIcon,
  Visibility as VisibilityIcon,
  FavoriteBorder as FavoriteIcon,
  ChatBubbleOutline as CommentIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ContentCopy as DuplicateIcon,
  Share as ShareIcon,
} from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import UpdateMyBlogModal from "../Modals/UpdateMyBlogModal"
import useBlogCalls from "../../hooks/useBlogCalls"

const MyBlogCard = ({
  _id,
  image,
  comments,
  content,
  title,
  createdAt,
  countOfVisitors,
  isPublish,
  likes,
  categoryId,
  categories
}) => {
  const blog = {_id, image, comments, content, title, createdAt, countOfVisitors, isPublish, likes, categoryId }
  const navigate = useNavigate()
  const { deleteBlog } = useBlogCalls()
  const [menuAnchorEl, setMenuAnchorEl] = useState(null)

  // State for edit modal
  const [editModalOpen, setEditModalOpen] = useState(false)
  const handleEditModalOpen = () => setEditModalOpen(true)
  const handleEditModalClose = () => setEditModalOpen(false)

  // Handle menu open/close
  const handleMenuClick = (event) => {
    event.stopPropagation()
    setMenuAnchorEl(event.currentTarget)
    // console.log(event);    
  }

  const handleMenuClose = (e) => {
    if (e) e.stopPropagation()
    setMenuAnchorEl(null)
  }

  // Handle card click to navigate to details
  const handleCardClick = () => {
    navigate("/my-blog-details/" + _id)
  }

  // Handle edit click
  const handleEditClick = (event) => {
    event.stopPropagation()
    // navigate("/edit-blog/" + _id)
    handleMenuClose()
    handleEditModalOpen()
  }

  // Handle delete blog
  const handleDeleteBlog = () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      handleMenuClose()
      deleteBlog(_id)
      navigate("/myblogs")
    }
  }

  // Format date
  const formattedDate = new Date(createdAt).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  console.log("All categories object in MyBlogCard", categories);
  

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
          cursor: "pointer",
        },
        position: "relative",
      }}
      onClick={handleCardClick}
    >
      {/* Status Chip */}
      <Chip
        label={isPublish ? "Published" : "Draft"}
        color={isPublish ? "success" : "warning"}
        size="small"
        sx={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 1,
          opacity: 0.9,
        }}
      />

      {/* Menu Button */}
      <IconButton
        sx={{
          position: "absolute",
          top: 5,
          right: 5,
          zIndex: 1,
          bgcolor: "rgba(255,255,255,0.7)",
          "&:hover": {
            bgcolor: "rgba(255,255,255,0.9)",
          },
        }}
        onClick={(e) => {
          e.stopPropagation()
          handleMenuClick(e)
        }}
      >
        <MoreVertIcon />
      </IconButton>

      {/* Menu */}
      <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleMenuClose} onClick={(e) => e.stopPropagation()}>
        <MenuItem onClick={handleEditClick}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDeleteBlog}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
        <MenuItem onClick={(event) => {
            event.stopPropagation()
            handleMenuClose()
          }}>
          <ListItemIcon>
            <DuplicateIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Duplicate</ListItemText>
        </MenuItem>
        <MenuItem onClick={(event) => {
            event.stopPropagation()
            handleMenuClose()
          }}>
          <ListItemIcon>
            <ShareIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Share</ListItemText>
        </MenuItem>
      </Menu>

      {/* Blog Image */}
      <CardMedia
        component="img"
        height="160"
        image={image || "/placeholder.svg?height=160&width=320"}
        alt={title}
        sx={{ objectFit: "cover" }}
      />

      {/* Content */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            mb: 1,
            height: "3.6em",
          }}
        >
          {content}
        </Typography>

        {/* Category */}
        {categoryId?.name && <Chip label={categoryId.name} size="small" sx={{ mt: 1, mr: 1 }} variant="outlined" />}

        {/* Date */}
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
          {formattedDate}
        </Typography>
      </CardContent>

      {/* Stats */}
      <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Tooltip title="Views">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <VisibilityIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
              <Typography variant="body2" color="text.secondary">
                {countOfVisitors}
              </Typography>
            </Box>
          </Tooltip>

          <Tooltip title="Likes">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <FavoriteIcon fontSize="small" color="error" sx={{ mr: 0.5 }} />
              <Typography variant="body2" color="text.secondary">
                {likes?.length || 0}
              </Typography>
            </Box>
          </Tooltip>

          <Tooltip title="Comments">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CommentIcon fontSize="small" color="primary" sx={{ mr: 0.5 }} />
              <Typography variant="body2" color="text.secondary">
                {comments?.length || 0}
              </Typography>
            </Box>
          </Tooltip>
        </Box>
      </CardActions>

      {/* Edit Blog Modal */}
      {editModalOpen && (
        <UpdateMyBlogModal
          open={editModalOpen}
          handleClose={handleEditModalClose}
          blog={blog}
          categories={categories?.data}
        />
      )}
    </Card>
  )
}

export default MyBlogCard