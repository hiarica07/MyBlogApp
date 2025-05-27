import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Typography,
  Box,
  Paper,
  Chip,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import useBlogCalls from "../hooks/useBlogCalls";
import BlogCard from "../components/blog/BlogCard";
import FeaturedBlog from "../components/blog/FeaturedBlog";
import HomeHeader from "../components/home/homeHeader";
import PaginationComponent from "../components/PaginationComponent";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const { publishedBlogs, loading } = useSelector((state) => state.blog);
  const { getPublishedBlogs } = useBlogCalls();

  // State for search
  const [searchTerm, setSearchTerm] = useState("");
  // State for current page data
  const [currentPageItems, setCurrentPageItems] = useState([]);

  // Handle search change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    
    // Arama yapıldığında, tüm blogları getir (sayfalama olmadan)
    if (searchTerm.trim() !== "") {
      // Limit parametresini çok yüksek bir değere ayarlayarak tüm verileri alalım
      getPublishedBlogs("publishedBlogs", { params: { limit: 100 } });
    } else {
      // Arama temizlendiğinde, normal sayfalı verileri getir
      getPublishedBlogs("publishedBlogs");
    }
  };

  // Arama sonuçlarını filtreleyip, doğru şekilde sayfalayalım
  const searchFilteredBlog =
    searchTerm.trim() === ""
      ? publishedBlogs
      : publishedBlogs?.filter((blog) =>
          [blog?.title, blog?.content, blog?.categoryId?.name]
            .filter(Boolean)
            .some((field) =>
              field.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );


        

  // Get featured blog (first blog or most viewed)
  const featuredBlog =
    publishedBlogs && publishedBlogs?.length > 0
      ? [...publishedBlogs].sort(
          (a, b) => b.countOfVisitors - a.countOfVisitors
        )[0]
      : null;

  // Callback function to get current page items from PaginationComponent
  const handleCurrentPageItems = (items) => {
    setCurrentPageItems(items);
  };

  useEffect(() => {
    getPublishedBlogs("publishedBlogs");
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <HomeHeader />
        {/* Search Bar */}
        <SearchBar
          handleSearchSubmit={handleSearchSubmit}
          handleSearchChange={handleSearchChange}
          searchTerm={searchTerm}
        />
        {/* Featured Blog */}
        {featuredBlog && !searchTerm && <FeaturedBlog {...featuredBlog} />}
        {/* Blog Grid */}
        <Box sx={{ mb: 6 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
              {searchTerm ? "Search Results" : "Latest Posts"}
            </Typography>

            {searchTerm && (
              <Chip
                label={`Results for: "${searchTerm}"`}
                onDelete={() => {
                  setSearchTerm("");
                  getPublishedBlogs("publishedBlogs");
                }}
                color="primary"
              />
            )}
          </Box>

          {searchFilteredBlog?.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: "center" }}>
              <Typography variant="h6" color="text.secondary">
                No blogs found matching your search.
              </Typography>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {currentPageItems?.map((blog) => (
                <Grid key={blog._id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <BlogCard {...blog} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* Pagination - Sadece bir tane PaginationComponent kullanıyoruz */}
        {searchFilteredBlog && searchFilteredBlog.length > 0 && (
          <PaginationComponent
            endpoint={"blogs/publishedBlogs"}
            slice={"pagPublishedBlogs"}
            data={searchFilteredBlog}
            onPageItems={handleCurrentPageItems}
          />
        )}
      </Container>
    </Box>
  );
};

export default Home;
