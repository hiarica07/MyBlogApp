import { useEffect, useState, lazy, Suspense } from "react"
import { useSelector } from "react-redux"
import { Box, Typography, Container, Tabs, Tab, IconButton, Menu, MenuItem, Paper, CircularProgress } from "@mui/material"
import Grid from "@mui/material/Grid2";
import ViewModuleIcon from "@mui/icons-material/ViewModule"
import ViewListIcon from "@mui/icons-material/ViewList"
import SortIcon from "@mui/icons-material/Sort"
import useBlogCalls from "../hooks/useBlogCalls"
import MyBlogCard from "../components/blog/MyBlogCard"
import MyBlogListItem from "../components/blog/MyBlogListItem"
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const BlogStats = lazy(() => import("../components/blog/BlogStats"))
const PaginationComponent = lazy(() => import("../components/PaginationComponent"))

const MyBlogs = () => {
  const { getSingleUserBlogs, getBlogStats } = useBlogCalls()
  const { currentUserId } = useSelector((state) => state.auth)
  const { singleUserBlogs: {data, details}, loading, stats} = useSelector((state) => state.blog)
  console.log("Blog stats", stats);
  // console.log("data", data);
  // console.log("details", details);
  
  
  const [searchParams] = useSearchParams()

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1
  const limit = searchParams.get("limit") ? Number(searchParams.get("limit")) : 24
  const search = searchParams.get("search[title]") || ""
  // const category = searchParams.get("category") || ""

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

  useEffect(() => {
    // getSingleUserBlogs("userBlogs", { params: { limit: 10, page } })
    // getSingleUserBlogs("userBlogs")
    const filter = {"filter[userId": currentUserId}
    if (activeTab === 1 ) filter["filter[isPublish]"] = true
    if (activeTab === 2 ) filter["filter[isPublish]"] = false

    let sort = undefined
    if (sortOption === "newest") sort = "-createdAt"
    else if (sortOption === "oldest") sort = "createdAt"
    else if (sortOption === "mostViewed") sort = "-countOfVisitors"
    else if (sortOption === "mostLiked") sort = "-likes"
    else if (sortOption === "mostCommented") sort = "-comments"

    const options = {limit, page, ...filter, "search[title]": search,}
    if (sort) options.sort = sort
    getSingleUserBlogs("userBlogs", { params: options })
  }, [page, limit, search, activeTab, sortOption, currentUserId])

  // if (loading) {
  //   return (
  //     <Box
  //       display="flex"
  //       alignItems="center"
  //       justifyContent="center"
  //       minHeight="100vh"
  //     >
  //       <CircularProgress color="primary" />
  //     </Box>
  //   );
  // }

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
      <Suspense fallback = {<CircularProgress sx={{ display: "block", margin: "auto", mt: 4 }} />}>
        <BlogStats currentUserId={currentUserId} />
      </Suspense>

      {/* Filters and Controls */}
      <Paper elevation={0} sx={{ p: 2, mb: 3, borderRadius: 2, bgcolor: "background.paper" }}>
        <Grid container spacing={2} alignItems="center">
          {/* Tabs for filtering */}
          <Grid size={{xs: 12,md: 5}}>
            <Tabs value={activeTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
              <Tab label={`All (${stats?.totalRecords})`} />
              <Tab label={`Published (${stats?.published})`} />
              <Tab label={`Drafts (${stats?.draft})`} />
            </Tabs>
          </Grid>

          {/* Search */}
          <SearchBar/>

          {/* View and Sort Controls */}
          <Grid size={{xs: 12,md: 3}}>
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
          {/* {sortedBlogs?.map((blog) => ( */}
          {data?.map((blog) => (
            <Grid key={blog._id} size={{xs: 12, sm: 6, md: 4}}>
              <MyBlogCard {...blog} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box>
          {/* {sortedBlogs?.map((blog) => ( */}
          {data?.map((blog) => (
            <MyBlogListItem key={blog._id} {...blog} />
          ))}
        </Box>
      )}

      {/* Empty State */}
      {(!data || data.length === 0) && (
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
      <Suspense fallback={<CircularProgress sx={{ display: "block", margin: "auto", mt: 4 }} />}>
        <PaginationComponent details={details} />
      </Suspense>
      
    </Container>
  )
}

export default MyBlogs
