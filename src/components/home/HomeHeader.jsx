import { Box, Typography } from '@mui/material'

const HomeHeader = () => {
  return (
    <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              backgroundClip: "text",
              textFillColor: "transparent",
              mb: 2,
            }}
          >
            Explore Our Blog
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: "700px", mx: "auto", mb: 4 }}>
            Discover the latest insights, tutorials, and stories from our community
          </Typography>

        </Box>
  )
}

export default HomeHeader