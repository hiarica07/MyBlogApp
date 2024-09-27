import Grid from '@mui/material/Grid2';
import React from 'react'
import useBlogsCall from '../hooks/useBlogCalls'
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import BlogCard from '../components/blog/BlogCard';

const Home = () => {

    const {getBlogsData} = useBlogsCall()

    const {blogs} = useSelector(state=>state.blog)
    
    useEffect(()=>{
        getBlogsData("blogs")
    
    },[])

    console.log("blogs:",blogs);

    
    

    return (
        <Grid container spacing={2} mt={3}>
          {blogs.map((blog) => (
            <Grid key={blog._id} xs={12} md={6} lg={4} xl={3}>
              <BlogCard {...blog} />
            </Grid>
          ))}
        </Grid>
      );
      
}

export default Home