import { useEffect, useState } from "react"
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Chip,
  Divider,
  Avatar,
  IconButton,
//   Grid,
  Tooltip,
  CircularProgress,
} from "@mui/material"
import Grid from "@mui/material/Grid2";
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Visibility as VisibilityIcon,
  Comment as CommentIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowBack as ArrowBackIcon,
  Share as ShareIcon,
  BookmarkAdd as BookmarkIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  Category as CategoryIcon,
} from "@mui/icons-material"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import useBlogCalls from "../hooks/useBlogCalls"
import CommentForm from "../components/blog/CommentForm"
import CommentCard from "../components/blog/CommentCard"
import UpdateMyBlogModal from "../components/Modals/UpdateMyBlogModal"

const MyBlogDetail = () => {
  const navigate = useNavigate()
  const { _id } = useParams()

  const { getSingleBlog, deleteBlog, postLikeBlog, getBlogsData } = useBlogCalls()
  const { blog, loading, categories } = useSelector((state) => state.blog)
  const { currentUserId } = useSelector((state) => state.auth)

  // State for comments section
  const [commentsOpen, setCommentsOpen] = useState(false)
  const toggleComments = () => setCommentsOpen(!commentsOpen)

  // State for edit modal
  const [editModalOpen, setEditModalOpen] = useState(false)
  const handleEditModalOpen = () => setEditModalOpen(true)
  const handleEditModalClose = () => setEditModalOpen(false)

  // Extract blog data
  const { comments, content, countOfVisitors, createdAt, image, isPublish, likes, title, userId, categoryId } = blog

  // Check if current user has liked the blog
  const likedBlog = () => {
    if (!likes || !currentUserId) return false
    return likes.some((like) => like === currentUserId)
  }

  // Format date
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : ""

  const formattedTime = createdAt
    ? new Date(createdAt).toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : ""

  // Fetch blog data
  useEffect(() => {
    getSingleBlog(_id)
    getBlogsData("categories")
  }, [_id])

  // Handle delete blog
  const handleDeleteBlog = () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      deleteBlog(_id)
      navigate("/myblogs")
    }
  }

  if (loading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh">
        <CircularProgress color="primary" />
      </Box>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Back Button */}
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate("/myblogs")} sx={{ mb: 3 }} variant="outlined">
        Back to My Blogs
      </Button>

      <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
        {/* Blog Header with Image */}
        <Box sx={{ position: "relative" }}>
          <Box
            component="img"
            src={image || "/placeholder.svg?height=400&width=800"}
            alt={title}
            sx={{
              width: "100%",
              height: { xs: 200, sm: 300, md: 400 },
              objectFit: "cover",
            }}
          />

          {/* Status Chip */}
          <Chip
            label={isPublish ? "Published" : "Draft"}
            color={isPublish ? "success" : "default"}
            size="small"
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              zIndex: 1,
            }}
          />
        </Box>

        {/* Blog Content */}
        <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
          {/* Title and Actions */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
            <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
              {title}
            </Typography>

            <Box sx={{ display: "flex", gap: 1 }}>
              <Tooltip title="Edit">
                <IconButton onClick={handleEditModalOpen} color="primary">
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton onClick={handleDeleteBlog} color="error">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Share">
                <IconButton>
                  <ShareIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Save">
                <IconButton>
                  <BookmarkIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* Meta Information */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid size={{xs: 12, sm: 6}}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  <PersonIcon />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2">Author</Typography>
                  <Typography variant="body2">{userId?.username || "Anonymous"}</Typography>
                </Box>
              </Box>
            </Grid>

            <Grid size={{xs: 12, sm: 6}}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar sx={{ bgcolor: "secondary.main" }}>
                  <CalendarIcon />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2">Published Date</Typography>
                  <Typography variant="body2">
                    {formattedDate} {formattedTime}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {categoryId?.name && (
              <Grid size={{xs: 12, sm: 6}}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar sx={{ bgcolor: "info.main" }}>
                    <CategoryIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2">Category</Typography>
                    <Typography variant="body2">{categoryId.name}</Typography>
                  </Box>
                </Box>
              </Grid>
            )}

            <Grid size={{xs: 12, sm: 6}}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar sx={{ bgcolor: "success.main" }}>
                  <VisibilityIcon />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2">Views</Typography>
                  <Typography variant="body2">{countOfVisitors}</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Blog Content */}
          <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8 }}>
            {content}
          </Typography>

          <Divider sx={{ my: 3 }} />

          {/* Engagement Stats */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                startIcon={likedBlog() ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                onClick={() => postLikeBlog(_id)}
                variant="outlined"
                size="small"
              >
                {likes?.length || 0} Likes
              </Button>

              <Button startIcon={<CommentIcon />} onClick={toggleComments} variant="outlined" size="small">
                {comments?.length || 0} Comments
              </Button>

              <Button startIcon={<VisibilityIcon />} variant="outlined" size="small" disabled>
                {countOfVisitors} Views
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Comments Section */}
      {commentsOpen && (
        <Paper elevation={1} sx={{ mt: 3, p: 3, borderRadius: 2 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Comments
          </Typography>

          <CommentForm _id={_id} />

          <Box sx={{ mt: 3 }}>
            <CommentCard blogId={_id} />
          </Box>
        </Paper>
      )}

      {/* Edit Blog Modal */}
      {editModalOpen && (
        <UpdateMyBlogModal
          open={editModalOpen}
          handleClose={handleEditModalClose}
          blog={blog}
          categories={categories}
        />
      )}
    </Container>
  )
}

export default MyBlogDetail