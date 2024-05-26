import React, { useEffect, useState } from 'react';
import { Grid, Box } from '@mui/material';
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
            {posts.length !== 0 ? (
                <Grid container spacing={3}>
                    {posts.map((post) => (
                        <Grid item lg={3} sm={4} xs={12} key={post._id}>
                            <Post post={post} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Box style={{ color: '#878787', margin: '30px 80px', fontSize: 18 }}>
                    No data is available for the selected category
                </Box>
            )}
        </>
    );
};

export default Posts;