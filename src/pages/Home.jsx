import Grid from '@mui/material/Grid2';
import React from 'react'
import useBlogsCall from '../hooks/useBlogCalls'
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import BlogCard from '../components/blog/BlogCard';
import { useState } from 'react';

const Home = () => {

    const {getBlogsData,postLike} = useBlogsCall()
    // const [countOfLike,getCountOfLike] = useState("0")

    const {blogs} = useSelector(state=>state.blog)
    const [page,setPage] = useState(2) // dön de bir bak.
    
    useEffect(()=>{
        getBlogsData("blogs",{params:{limit:10,page}})

    },[page])

    console.log("blogs:",blogs);

    
    

    return (
        <Grid container spacing={2} mt={3}>
          {blogs.map((blog) => (
            <Grid key={blog._id} xs={12} md={6} lg={4} xl={3}>
              <BlogCard {...blog} postLike={postLike} />
            </Grid>
          ))}
        </Grid>

      );
      
}

export default Home