import Grid from '@mui/material/Grid2';
import useBlogsCall from '../hooks/useBlogCalls';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import BlogCard from '../components/blog/BlogCard';
import { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Home = () => {

  const { getBlogsData, postLike } = useBlogsCall();
  const { blogs } = useSelector(state => state.blog);
  const [page, setPage] = useState(1); // İlk sayfa 1 olsun

  const handlePageChange = (event, value) => {
    setPage(value); // event-value şeklinde yapının sadece value kullanıyoruz. // OnChange iki parametre alır ikinci parametre tıklanan değeri alıyor. Bu pagination yapısının altında yatan bir durum.
  };

  useEffect(() => {
    getBlogsData("blogs", { params: { limit: 10, page } });
  }, [page]);

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between" 
      sx={{ minHeight: '100vh' , py:5 , m:2}}
    >
      <Grid item container spacing={2} sx={{ flex: '1 0 auto' }}>
        {blogs.map((blog) => (
          <Grid key={blog._id} xs={12} md={6} lg={4} xl={3}>
            <BlogCard {...blog} postLike={postLike} />
          </Grid>
        ))}
      </Grid>

      <Grid 
        item 
        sx={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          py: 5  // Üst ve alt boşluk
        }}
      >
        <Stack spacing={2}>
          <Pagination 
            count={10}   // Toplam sayfa sayısı
            page={page}  // Mevcut sayfa
            onChange={handlePageChange} // Sayfa değişikliği
          />
        </Stack>
      </Grid>
    </Grid>
  );
}

export default Home;
