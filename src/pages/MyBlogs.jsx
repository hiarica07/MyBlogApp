import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Pagination, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import useBlogCalls from "../hooks/useBlogCalls";
import BlogCard from "../components/blog/BlogCard";

const MyBlogs = () => {
  const { getBlogsData } = useBlogCalls();
  const { currentUserId } = useSelector((state) => state.auth);
  console.log(currentUserId);

  // const [initialState, setInitialState] = useState({
  //   error: false,
  //   didUserLike: false,
  //   countOfLikes: 0,
  // });

  const [page, setPage] = useState(1); // İlk sayfa 1 olsun

  const handlePageChange = (event, value) => {
    setPage(value); // event-value şeklinde yapının sadece value kullanıyoruz. // OnChange iki parametre alır ikinci parametre tıklanan değeri alıyor. Bu pagination yapısının altında yatan bir durum.
  };

  useEffect(() => {
    getBlogsData("blogs", { params: { limit: 10, page } });
  }, [page]);

  const { blogs } = useSelector((state) => state.blog);
  console.log("blog:", blogs);

  const myBlogs = blogs?.filter((blog) => blog?.userId?._id === currentUserId);
  console.log(myBlogs);

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      sx={{ minHeight: "100vh", py: 5, m: 2, bgcolor: "secondary.main" }}
    >
      <Grid
        container
        spacing={2}
        mt={6}
        sx={{
          flex: "1 0 auto",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {myBlogs?.map((blog) => (
          <Grid
            key={blog._id}
            xs={12}
            md={6}
            lg={4}
            xl={3}
            sx={{ boxShadow: "0 0 10px gray", borderRadius: "20px" }}
          >
            <BlogCard
              {...blog}
              // initialState={initialState}
              // setInitialState={setInitialState}
            />
          </Grid>
        ))}
      </Grid>

      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 5, // Üst ve alt boşluk
        }}
      >
        <Stack spacing={2}>
          <Pagination
            count={10} // Toplam sayfa sayısı
            page={page} // Mevcut sayfa
            onChange={handlePageChange} // Sayfa değişikliği
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default MyBlogs;
