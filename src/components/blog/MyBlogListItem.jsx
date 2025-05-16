import { useState } from "react"
import {
  Paper,
  Box,
  Typography,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
//   Grid,
  Tooltip,
} from "@mui/material"
import Grid from "@mui/material/Grid2";
import {
  MoreVert as MoreVertIcon,
  Visibility as VisibilityIcon,
  FavoriteBorder as FavoriteIcon,
  ChatBubbleOutline as CommentIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ContentCopy as DuplicateIcon,
  Share as ShareIcon,
  OpenInNew as OpenInNewIcon,
} from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

const MyBlogListItem = ({
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
}) => {
  const navigate = useNavigate()
  const [menuAnchorEl, setMenuAnchorEl] = useState(null)

  // Handle menu open/close
  const handleMenuClick = (event) => {
    event.stopPropagation()
    setMenuAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setMenuAnchorEl(null)
  }

  // Handle item click to navigate to details
  const handleItemClick = () => {
    navigate("/details/" + _id)
  }

  // Handle edit click
  const handleEditClick = (event) => {
    event.stopPropagation()
    navigate("/edit-blog/" + _id)
    handleMenuClose()
  }

  // Format date
  const formattedDate = new Date(createdAt).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 2,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          cursor: "pointer",
        },
      }}
      onClick={handleItemClick}
    >
      <Grid container spacing={2}>
        {/* Image */}
        <Grid item xs={12} sm={2}>
          <Box
            sx={{
              height: 100,
              borderRadius: 1,
              overflow: "hidden",
              backgroundImage: `url(${image || "/placeholder.svg?height=100&width=100"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </Grid>

        {/* Content */}
        <Grid item xs={12} sm={8}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography variant="h6" component="div" noWrap sx={{ mr: 1 }}>
              {title}
            </Typography>
            <Chip
              label={isPublish ? "Published" : "Draft"}
              color={isPublish ? "success" : "default"}
              size="small"
              sx={{ ml: 1 }}
            />
            {categoryId?.name && <Chip label={categoryId.name} size="small" sx={{ ml: 1 }} variant="outlined" />}
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              mb: 1,
            }}
          >
            {content}
          </Typography>

          <Typography variant="caption" color="text.secondary">
            {formattedDate}
          </Typography>
        </Grid>

        {/* Stats and Actions */}
        <Grid item xs={12} sm={2}>
          <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            {/* Stats */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
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

            {/* Actions */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: "auto" }}>
              <Tooltip title="View">
                <IconButton size="small" onClick={handleItemClick}>
                  <OpenInNewIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Edit">
                <IconButton size="small" onClick={handleEditClick}>
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="More">
                <IconButton size="small" onClick={handleMenuClick}>
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              {/* Menu */}
              <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleEditClick}>
                  <ListItemIcon>
                    <EditIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Edit</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <ListItemIcon>
                    <DeleteIcon fontSize="small" color="error" />
                  </ListItemIcon>
                  <ListItemText>Delete</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <ListItemIcon>
                    <DuplicateIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Duplicate</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <ListItemIcon>
                    <ShareIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Share</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default MyBlogListItem