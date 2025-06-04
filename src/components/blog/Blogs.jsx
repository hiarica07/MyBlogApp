import React from "react";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import useBlogCalls from "../../hooks/useBlogCalls";
import { useSelector } from "react-redux";
import BlogCard from "./BlogCard";

const Blogs = () => {
  const { blogs: {data}, loading } = useSelector((state) => state.blog);
  const { getBlogsDataNew } = useBlogCalls();
  // console.log("blogs data", data);

  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 24;
  const search = searchParams.get("search[title]") || "";

  useEffect(() => {
    const params = { limit, page, "filter[isPublish]": true };
    if (search) params["search[title]"] = search;
    getBlogsDataNew("blogs", { params });
  }, [limit, page, search]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {data && data?.length === 0 ? (
        <Paper sx={{ p: 2, textAlign: "center", mt: 2 }}>
          <Typography variant="h6" color="text.secondary">
            No blogs found matching your search.
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {data?.map((blog, index) => (
            <Grid key={blog.id || index} size={{ xs: 12, sm: 6, md: 4 }}>
              <BlogCard {...blog} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Blogs;
