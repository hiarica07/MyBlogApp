import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Pagination, Stack, Container, Typography, Box, Paper, InputBase, IconButton, Chip } from "@mui/material"
import Grid from "@mui/material/Grid2"
import SearchIcon from "@mui/icons-material/Search"
import useBlogCalls from "../hooks/useBlogCalls"
import BlogCard from "../components/blog/BlogCard"
import FeaturedBlog from "../components/blog/FeaturedBlog"

const Home = () => {
  const { getBlogsData } = useBlogCalls()
  const { blogs } = useSelector((state) => state.blog)

  // State for pagination
  const [page, setPage] = useState(1)

  // State for search
  const [searchTerm, setSearchTerm] = useState("")

  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Handle search change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  // Handle search submit
  const handleSearchSubmit = (event) => {
    event.preventDefault()
    // You could add additional search functionality here
  }

  // Filter blogs based on search term
  const filteredBlogs = blogs?.filter((blog) => {
    if (!searchTerm) return true

    return (
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.categoryId?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  // Get featured blog (first blog or most viewed)
  const featuredBlog =
    blogs && blogs.length > 0 ? [...blogs].sort((a, b) => b.countOfVisitors - a.countOfVisitors)[0] : null

  // Get remaining blogs (excluding featured)
  const remainingBlogs = featuredBlog ? filteredBlogs?.filter((blog) => blog._id !== featuredBlog._id) : filteredBlogs

  useEffect(() => {
    getBlogsData("blogs", { params: { limit: 10, page } })
  }, [page])

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
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

          {/* Search Bar */}
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              maxWidth: 500,
              mx: "auto",
              mb: 2,
            }}
            elevation={1}
            onSubmit={handleSearchSubmit}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>

        {/* Featured Blog */}
        {featuredBlog && !searchTerm && (
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: "bold" }}>
              Featured Post
            </Typography>
            <FeaturedBlog {...featuredBlog} />
          </Box>
        )}

        {/* Blog Grid */}
        <Box sx={{ mb: 6 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
              {searchTerm ? "Search Results" : "Latest Posts"}
            </Typography>

            {searchTerm && (
              <Chip label={`Results for: "${searchTerm}"`} onDelete={() => setSearchTerm("")} color="primary" />
            )}
          </Box>

          {filteredBlogs?.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: "center" }}>
              <Typography variant="h6" color="text.secondary">
                No blogs found matching your search.
              </Typography>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {filteredBlogs?.map((blog) => (
                <Grid key={blog._id} xs={12} sm={6} md={4}>
                  <BlogCard {...blog} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* Pagination */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6, mb: 2 }}>
          <Stack spacing={2}>
            <Pagination
              count={10}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
              sx={{
                "& .MuiPaginationItem-root": {
                  fontSize: "1rem",
                },
              }}
            />
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}

export default Home