import { Card, CardMedia, CardContent, CardActions, Typography, Button, Box, Chip, Avatar } from "@mui/material"
import {
  Visibility as VisibilityIcon,
  Favorite as FavoriteIcon,
  Comment as CommentIcon,
  AccessTime as AccessTimeIcon,
} from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const BlogCard = ({ _id, title, content, image, createdAt, countOfVisitors, likes, comments, userId, categoryId }) => {
  const navigate = useNavigate()
  const { currentUser } = useSelector((state) => state.auth)

  // Format date
  const formattedDate = new Date(createdAt).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  // Estimate reading time (roughly 200 words per minute)
  const wordCount = content?.split(/\s+/).length || 0
  const readingTime = Math.max(1, Math.ceil(wordCount / 200))

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        overflow: "hidden",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
        },
      }}
    >
      {/* Image with Category Badge */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="200"
          image={image || "/placeholder.svg?height=200&width=400"}
          alt={title}
          sx={{ objectFit: "cover" }}
        />
        {categoryId?.name && (
          <Chip
            label={categoryId.name}
            color="primary"
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              fontWeight: "bold",
            }}
          />
        )}
      </Box>

      {/* Content */}
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: "bold",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            lineHeight: 1.3,
            height: "2.6em",
          }}
        >
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
            mb: 2,
            height: "4.5em",
          }}
        >
          {content}
        </Typography>

        {/* Author and Date */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Avatar src={userId?.profileImg || ""} alt={userId?.username || "User"} sx={{ width: 32, height: 32, mr: 1 }}>
            {userId?.username ? userId.username[0].toUpperCase() : "U"}
          </Avatar>
          <Box>
            <Typography variant="subtitle2" sx={{ fontSize: "0.875rem" }}>
              {userId?.username || "Anonymous"}
            </Typography>
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
      </CardContent>

      {/* Actions */}
      <CardActions sx={{ px: 3, pb: 3, pt: 0, justifyContent: "space-between" }}>
        {/* Stats */}
        <Box sx={{ display: "flex", gap: 2 }}>
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

        {/* Read More Button */}
        {currentUser ? (
          <Button
            size="small"
            color="primary"
            variant="outlined"
            onClick={() => navigate(`/details/${_id}`)}
            sx={{
              borderRadius: 4,
              fontWeight: "medium",
            }}
          >
            Read More
          </Button>
        ) : (
          <Button
            size="small"
            color="primary"
            variant="outlined"
            onClick={() => navigate("/login")}
            sx={{
              borderRadius: 4,
              fontWeight: "medium",
            }}
          >
            Read More
          </Button>
        )}
      </CardActions>
    </Card>
  )
}

export default BlogCard