import { Box, Paper, Typography, Button, Chip, Avatar } from "@mui/material"
import Grid from "@mui/material/Grid2"
import {
  Visibility as VisibilityIcon,
  Favorite as FavoriteIcon,
  Comment as CommentIcon,
  AccessTime as AccessTimeIcon,
} from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

const FeaturedBlog = ({
  _id,
  title,
  content,
  image,
  createdAt,
  countOfVisitors,
  likes,
  comments,
  userId,
  categoryId,
}) => {
  const navigate = useNavigate()

  // Format date
  const formattedDate = new Date(createdAt).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Estimate reading time (roughly 200 words per minute)
  const wordCount = content?.split(/\s+/).length || 0
  const readingTime = Math.max(1, Math.ceil(wordCount / 200))

  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
        },
      }}
    >
      <Grid container>
        {/* Image Section */}
        <Grid xs={12} md={6}>
          <Box
            sx={{
              height: { xs: 240, md: "100%" },
              backgroundImage: `url(${image || "/placeholder.svg?height=400&width=600"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
            }}
          >
            {categoryId?.name && (
              <Chip
                label={categoryId.name}
                color="primary"
                size="small"
                sx={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  fontWeight: "bold",
                }}
              />
            )}
          </Box>
        </Grid>

        {/* Content Section */}
        <Grid xs={12} md={6}>
          <Box sx={{ p: { xs: 3, md: 4 }, height: "100%", display: "flex", flexDirection: "column" }}>
            <Typography variant="h4" component="h3" gutterBottom sx={{ fontWeight: "bold" }}>
              {title}
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mb: 3,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {content}
            </Typography>

            {/* Author and Date */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Avatar src={userId?.profileImg || ""} alt={userId?.username || "User"} sx={{ mr: 2 }}>
                {userId?.username ? userId.username[0].toUpperCase() : "U"}
              </Avatar>
              <Box>
                <Typography variant="subtitle2">{userId?.username || "Anonymous"}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    {formattedDate}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
                    <AccessTimeIcon fontSize="inherit" sx={{ mr: 0.5 }} />
                    {readingTime} min read
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Stats */}
            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <VisibilityIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                <Typography variant="body2" color="text.secondary">
                  {countOfVisitors}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <FavoriteIcon fontSize="small" color="error" sx={{ mr: 0.5 }} />
                <Typography variant="body2" color="text.secondary">
                  {likes?.length || 0}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CommentIcon fontSize="small" color="primary" sx={{ mr: 0.5 }} />
                <Typography variant="body2" color="text.secondary">
                  {comments?.length || 0}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mt: "auto" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(`/details/${_id}`)}
                sx={{
                  borderRadius: 8,
                  px: 3,
                  py: 1,
                  fontWeight: "bold",
                }}
              >
                Read Full Article
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default FeaturedBlog