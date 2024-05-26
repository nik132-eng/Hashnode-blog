import React, { useEffect, useState } from 'react';
import { Grid, Box, Link } from '@mui/material';
import { API } from '../../../service/api';
import Post from './Post';

interface PostData {
    _id: string;
    title: string;
    description: string;
    username: string;
    picture?: string;
    categories: string;
}

const Posts: React.FC = () => {
    const [posts, setPosts] = useState<PostData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.getAllPosts();
                if (response.isSuccess) {
                    setPosts(response.data);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {
                posts?.length ? posts.map(post => (
                    <Grid item lg={3} sm={4} xs={12}>
                        <Link style={{textDecoration: 'none', color: 'inherit'}} href={`details/${post._id}`}>
                            <Post post={post} />
                        </Link>
                    </Grid>
                )) : <Box style={{color: '878787', margin: '30px 80px', fontSize: 18}}>
                        No data is available for selected category
                    </Box>
            }
        </>
    );
};

export default Posts;