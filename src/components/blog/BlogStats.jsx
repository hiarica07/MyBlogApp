import { Paper, Box, Typography } from "@mui/material"
import Grid from "@mui/material/Grid2";
import {
  Article as ArticleIcon,
  Visibility as VisibilityIcon,
  FavoriteBorder as FavoriteIcon,
  ChatBubbleOutline as CommentIcon,
  Publish as PublishIcon,
  Save as DraftIcon,
} from "@mui/icons-material"
import useBlogCalls from "../../hooks/useBlogCalls";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const StatCard = ({ icon, title, value, color }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        height: "100%",
        borderRadius: 2,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            p: 1.5,
            borderRadius: 2,
            bgcolor: `${color}.50`,
            color: `${color}.main`,
            mr: 2,
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography variant="h5" component="div" fontWeight="bold">
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
        </Box>
      </Box>
    </Paper>
  )
}

const BlogStats = ({ currentUserId }) => {
  const {getSingleUserBlogs, getBlogStats} = useBlogCalls()
  const {stats, loading} = useSelector(state => state.blog)

  useEffect(() => {
    getBlogStats(currentUserId)
  }, [currentUserId])

  console.log("BlogStats stats", stats);
  
  const totalBlogs = stats?.totalRecords || 0
  const publishedBlogs = stats?.published || 0
  const draftBlogs = stats?.draft || 0
  const totalViews = stats?.totalVisitors || 0
  const totalLikes = stats?.totalLikes || 0
  const totalComments = stats?.totalComments || 0

  return (
    <Box sx={{ mb: 4 }}>
      <Grid container spacing={2}>
        <Grid size={{xs: 12, sm: 6, md: 2}}>
          <StatCard icon={<ArticleIcon />} title="Total Blogs" value={totalBlogs} color="primary" />
        </Grid>
        <Grid size={{xs: 12, sm: 6, md: 2}}>
          <StatCard icon={<PublishIcon />} title="Published" value={publishedBlogs} color="success" />
        </Grid>
        <Grid size={{xs: 12, sm: 6, md: 2}}>
          <StatCard icon={<DraftIcon />} title="Drafts" value={draftBlogs} color="warning" />
        </Grid>
        <Grid size={{xs: 12, sm: 6, md: 2}}>
          <StatCard icon={<VisibilityIcon />} title="Total Views" value={totalViews} color="info" />
        </Grid>
        <Grid size={{xs: 12, sm: 6, md: 2}}>
          <StatCard icon={<FavoriteIcon />} title="Total Likes" value={totalLikes} color="error" />
        </Grid>
        <Grid size={{xs: 12, sm: 6, md: 2}}>
          <StatCard icon={<CommentIcon />} title="Comments" value={totalComments} color="secondary" />
        </Grid>
      </Grid>
    </Box>
  )
}

export default BlogStats
