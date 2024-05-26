import React from 'react';
import { styled, Box } from '@mui/material';
import blogbanner from '../../../../public/blogbanner.jpg';

const Container = styled(Box)({
    border: '1px solid #d3cede',
    borderRadius: '10px',
    margin: '10px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    height: '350px',
    '& > img, & > p': {
        padding: '0 5px 5px 5px',
    },
});

const Image = styled('img')({
    width: '100%',
    objectFit: 'cover',
    borderRadius: '10px 10px 0 0',
    height: '150px',
});

interface TextProps {
    children: React.ReactNode;
    color?: string;
    fontSize?: string;
}

const Text = styled('p')<TextProps>(({ color = '#878787', fontSize = '12px' }) => ({
    color,
    fontSize,
}));

const Heading = styled(Text)({
    fontSize: '18px',
    fontWeight: 600,
});

const Details = styled(Text)({
    fontSize: '14px',
    wordBreak: 'break-word',
});

interface PostProps {
    post: {
        _id: string;
        title: string;
        description: string;
        username: string;
        picture?: string;
        categories: string;
    };
}

const Post: React.FC<PostProps> = ({ post }) => {
    const url = post.picture || blogbanner;

    const addEllipsis = (str: string, limit: number) => {
        return str.length > limit ? str.substring(0, limit) + '...' : str;
    };

    return (
        <Container>
            <Image src={url} alt="Blog Banner" />
            <Text>{post.categories}</Text>
            <Heading>{addEllipsis(post.title, 20)}</Heading>
            <Text>Author: {post.username}</Text>
            <Details>{addEllipsis(post.description, 100)}</Details>
        </Container>
    );
};

export default React.memo(Post);
