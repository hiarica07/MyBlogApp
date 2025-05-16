import { useEffect, useState } from "react"
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
  Paper,
  Divider,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material"
import Grid from "@mui/material/Grid2"
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Visibility as VisibilityIcon,
  Comment as CommentIcon,
  ArrowBack as ArrowBackIcon,
  Share as ShareIcon,
  BookmarkAdd as BookmarkIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  AccessTime as AccessTimeIcon,
} from "@mui/icons-material"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import useBlogCalls from "../hooks/useBlogCalls"
import CommentForm from "../components/blog/CommentForm"
import CommentCard from "../components/blog/CommentCard"
import UpdateMyBlogModal from "../components/Modals/UpdateMyBlogModal"

const Detail = () => {
  const navigate = useNavigate()
  const { _id } = useParams()

  const { getSingleBlog, postLikeBlog, getBlogsData } = useBlogCalls()
  const { blog, loading, categories } = useSelector((state) => state.blog)
  const { currentUserId } = useSelector((state) => state.auth)

  // State for comments section
  const [open, setOpen] = useState(false)
  const toggleComments = () => setOpen(!open)

  // State for edit modal
  const [editModalOpen, setEditModalOpen] = useState(false)
  const handleEditModalClose = () => setEditModalOpen(false)

  // Extract blog data
  const { comments, content, countOfVisitors, createdAt, image, likes, title, userId, categoryId } = blog

  // Check if current user has liked the blog
  const likedBlog = () => {
    if (!likes || !currentUserId) return false
    return likes.some((like) => like === currentUserId)
  }

  // Format date
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : ""

  // Estimate reading time (roughly 200 words per minute)
  const wordCount = content?.split(/\s+/).length || 0
  const readingTime = Math.max(1, Math.ceil(wordCount / 200))

  // Fetch blog data
  useEffect(() => {
    getSingleBlog(_id)
    getBlogsData("categories")
  }, [_id])

  if (loading) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh">
        <CircularProgress color="primary" />
      </Box>
    )
  }

  return (
    <Box sx={{ bgcolor: "#f5f5f5", py: 4, minHeight: "100vh" }}>
      <Container maxWidth="lg">
        {/* Back Button */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mb: 3 }}
          variant="text"
          color="inherit"
        >
          Back
        </Button>

        <Paper elevation={1} sx={{ borderRadius: 2, overflow: "hidden", mb: 4 }}>
          {/* Blog Header with Image */}
          <Box sx={{ position: "relative" }}>
            <Box
              component="img"
              src={image || "/placeholder.svg?height=400&width=1200"}
              alt={title}
              sx={{
                width: "100%",
                height: { xs: 200, sm: 300, md: 400 },
                objectFit: "cover",
              }}
            />

            {categoryId?.name && (
              <Chip
                label={categoryId.name}
                color="primary"
                size="medium"
                sx={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  fontWeight: "bold",
                }}
              />
            )}
          </Box>

          {/* Blog Content */}
          <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
            {/* Title */}
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: "bold",
                mb: 3,
                fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.75rem" },
              }}
            >
              {title}
            </Typography>

            {/* Meta Information */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid xs={12} sm={6} md={3}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar sx={{ bgcolor: "primary.main" }}>
                    {userId?.username ? userId.username[0].toUpperCase() : <PersonIcon />}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2">Author</Typography>
                    <Typography variant="body2">{userId?.username || "Anonymous"}</Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid xs={12} sm={6} md={3}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar sx={{ bgcolor: "secondary.main" }}>
                    <CalendarIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2">Published Date</Typography>
                    <Typography variant="body2">{formattedDate}</Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid xs={12} sm={6} md={3}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar sx={{ bgcolor: "info.main" }}>
                    <AccessTimeIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2">Reading Time</Typography>
                    <Typography variant="body2">{readingTime} min read</Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid xs={12} sm={6} md={3}>
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
            <Typography
              variant="body1"
              sx={{
                mb: 4,
                lineHeight: 1.8,
                fontSize: "1.1rem",
                color: "text.primary",
              }}
            >
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
                  size="medium"
                >
                  {likes?.length || 0} Likes
                </Button>

                <Button startIcon={<CommentIcon />} onClick={toggleComments} variant="outlined" size="medium">
                  {comments?.length || 0} Comments
                </Button>
              </Box>

              <Box>
                <Tooltip title="Share">
                  <IconButton color="primary">
                    <ShareIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Bookmark">
                  <IconButton color="primary">
                    <BookmarkIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* Comments Section */}
        {open && (
          <Paper elevation={1} sx={{ mt: 3, p: 3, borderRadius: 2 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Comments
            </Typography>

            <CommentForm _id={_id} open={open} setOpen={setOpen} />

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

        {/* Go Back Button */}
        <Box
          sx={{ display: "flex", justifyContent: "center", alignItems: "center", my: 3 }}
          onClick={() => {
            navigate(-1)
          }}
        >
          <Button size="medium" variant="outlined" startIcon={<ArrowBackIcon />} sx={{ borderRadius: 8, px: 4, py: 1 }}>
            Go Back
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

export default Detail