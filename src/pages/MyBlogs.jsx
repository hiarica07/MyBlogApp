import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import {
  Box,
  Typography,
  Container,
  Tabs,
  Tab,
  InputBase,
  IconButton,
  Menu,
  MenuItem,
  Pagination,
  Stack,
  // Grid,
  Paper,
} from "@mui/material"
import Grid from "@mui/material/Grid2";
import SearchIcon from "@mui/icons-material/Search"
import ViewModuleIcon from "@mui/icons-material/ViewModule"
import ViewListIcon from "@mui/icons-material/ViewList"
import SortIcon from "@mui/icons-material/Sort"
import useBlogCalls from "../hooks/useBlogCalls"
import MyBlogCard from "../components/blog/MyBlogCard"
import MyBlogListItem from "../components/blog/MyBlogListItem"
import BlogStats from "../components/blog/BlogStats"

const MyBlogs = () => {
  const { getSingleUserBlogs } = useBlogCalls()
  const { currentUserId } = useSelector((state) => state.auth)
  const { singleUserBlogs } = useSelector((state) => state.blog)

  // State for pagination
  const [page, setPage] = useState(1)

  // State for view type (grid or list)
  const [viewType, setViewType] = useState("grid")

  // State for search
  const [searchTerm, setSearchTerm] = useState("")

  // State for filter menu
  const [filterAnchorEl, setFilterAnchorEl] = useState(null)
  const [sortAnchorEl, setSortAnchorEl] = useState(null)

  // State for active tab
  const [activeTab, setActiveTab] = useState(0)

  // State for sort option
  const [sortOption, setSortOption] = useState("newest")

  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value)
  }

  // Handle view type change
  const handleViewTypeChange = (type) => {
    setViewType(type)
  }

  // Handle search change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  // Handle filter menu
  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget)
  }

  const handleFilterClose = () => {
    setFilterAnchorEl(null)
  }

  // Handle sort menu
  const handleSortClick = (event) => {
    setSortAnchorEl(event.currentTarget)
  }

  const handleSortClose = (option) => {
    if (option) {
      setSortOption(option)
    }
    setSortAnchorEl(null)
  }

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  // Filter blogs based on search term and active tab
  const filteredBlogs = singleUserBlogs?.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase())

    // Filter based on active tab (All, Published, Drafts)
    if (activeTab === 1 && !blog.isPublish) return false
    if (activeTab === 2 && blog.isPublish) return false

    return matchesSearch
  })

  // Sort blogs based on sort option
  const sortedBlogs = [...(filteredBlogs || [])].sort((a, b) => {
    if (sortOption === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt)
    } else if (sortOption === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt)
    } else if (sortOption === "mostViewed") {
      return b.countOfVisitors - a.countOfVisitors
    } else if (sortOption === "mostLiked") {
      return b.likes.length - a.likes.length
    } else if (sortOption === "mostCommented") {
      return b.comments.length - a.comments.length
    }
    return 0
  })

  // Calculate blog stats
  const totalBlogs = singleUserBlogs?.length || 0
  const publishedBlogs = singleUserBlogs?.filter((blog) => blog.isPublish).length || 0
  const draftBlogs = totalBlogs - publishedBlogs
  const totalViews = singleUserBlogs?.reduce((sum, blog) => sum + blog.countOfVisitors, 0) || 0
  const totalLikes = singleUserBlogs?.reduce((sum, blog) => sum + blog.likes.length, 0) || 0
  const totalComments = singleUserBlogs?.reduce((sum, blog) => sum + blog.comments.length, 0) || 0

  useEffect(() => {
    getSingleUserBlogs("userBlogs", { params: { limit: 10, page } })
  }, [page])

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          My Blogs
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage and view all your blog posts in one place
        </Typography>
      </Box>

      {/* Stats Cards */}
      <BlogStats
        totalBlogs={totalBlogs}
        publishedBlogs={publishedBlogs}
        draftBlogs={draftBlogs}
        totalViews={totalViews}
        totalLikes={totalLikes}
        totalComments={totalComments}
      />

      {/* Filters and Controls */}
      <Paper elevation={0} sx={{ p: 2, mb: 3, borderRadius: 2, bgcolor: "background.paper" }}>
        <Grid container spacing={2} alignItems="center">
          {/* Tabs for filtering */}
          <Grid size={{xs: 12, md: 5}}>
            <Tabs value={activeTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
              <Tab label={`All (${totalBlogs})`} />
              <Tab label={`Published (${publishedBlogs})`} />
              <Tab label={`Drafts (${draftBlogs})`} />
            </Tabs>
          </Grid>

          {/* Search */}
          <Grid size={{xs: 12, md: 4}}>
            <Paper component="form" sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: "100%" }}>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search blogs"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>

          {/* View and Sort Controls */}
          <Grid size={{xs: 12, md: 3}}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
              {/* View Type Toggle */}
              <IconButton
                color={viewType === "grid" ? "primary" : "default"}
                onClick={() => handleViewTypeChange("grid")}
              >
                <ViewModuleIcon />
              </IconButton>
              <IconButton
                color={viewType === "list" ? "primary" : "default"}
                onClick={() => handleViewTypeChange("list")}
              >
                <ViewListIcon />
              </IconButton>

              {/* Sort Button */}
              <IconButton onClick={handleSortClick}>
                <SortIcon />
              </IconButton>
              <Menu anchorEl={sortAnchorEl} open={Boolean(sortAnchorEl)} onClose={() => handleSortClose()}>
                <MenuItem onClick={() => handleSortClose("newest")}>Newest First</MenuItem>
                <MenuItem onClick={() => handleSortClose("oldest")}>Oldest First</MenuItem>
                <MenuItem onClick={() => handleSortClose("mostViewed")}>Most Viewed</MenuItem>
                <MenuItem onClick={() => handleSortClose("mostLiked")}>Most Liked</MenuItem>
                <MenuItem onClick={() => handleSortClose("mostCommented")}>Most Commented</MenuItem>
              </Menu>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Blog List */}
      {viewType === "grid" ? (
        <Grid container spacing={3}>
          {sortedBlogs?.map((blog) => (
            <Grid key={blog._id} size={{xs: 12, md: 4, sm:6}}>
              <MyBlogCard {...blog} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box>
          {sortedBlogs?.map((blog) => (
            <MyBlogListItem key={blog._id} {...blog} />
          ))}
        </Box>
      )}

      {/* Empty State */}
      {(!sortedBlogs || sortedBlogs.length === 0) && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No blogs found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {searchTerm ? "Try a different search term" : "Start writing your first blog post"}
          </Typography>
        </Box>
      )}

      {/* Pagination */}
      {sortedBlogs && sortedBlogs.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Stack spacing={2}>
            <Pagination
              count={10} // You might want to calculate this based on total blogs
              page={page}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
            />
          </Stack>
        </Box>
      )}
    </Container>
  )
}

export default MyBlogs