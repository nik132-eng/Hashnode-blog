import { useState, useEffect } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom'
import blogbanner from '../../../public/blogbanner.jpg'

import { API } from '../../service/api';
// import { DataContext } from '../../App';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    },
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const Heading = styled(Typography)`
    font-size: 38px;
    font-weight: 600;
    text-align: center;
    margin: 50px 0 10px 0;
`;

const Author = styled(Box)(({ theme }) => ({
    color: '#878787',
    display: 'flex',
    margin: '20px 0',
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    },
}));

const DetailView: React.FC = () => {
    const url = blogbanner;

    const [post, setPost] = useState<any | null>(null);
    // const account = useContext(DataContext);
    const accountString = localStorage.getItem("account");
    const account = accountString ? JSON.parse(accountString) : null;
  
    const navigate = useNavigate();
    const { id } = useParams<any>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.getPostById(id);
                if (response.isSuccess) {
                    setPost(response.data);
                }
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };
        fetchData();
    }, [id]);

    const deleteBlog = async () => {
        if (post) {
            await API.deletePost(post._id);
            navigate('/');
        }
    }

    return (
        <Container style={{ maxWidth: '100%', wordWrap: 'break-word' }}>
        {post && (
          <>
            <Image src={post.picture || url} alt="post" />
            <Box style={{ float: 'right' }}>
              {account?.username === post.username && (
                <>
                  <Link to={`/update/${post._id}`} style={{ cursor: 'pointer' }}>
                    <EditIcon color="primary" />
                  </Link>
                  <DeleteIcon onClick={deleteBlog} color="error" style={{ cursor: 'pointer' }} />
                </>
              )}
            </Box>
            <Heading  style={{ overflowWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{post.title}</Heading>
      
            <Author>
              <Link to={`/?username=${post.username}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography>Author: <span style={{ fontWeight: 600 }}>{post.username}</span></Typography>
              </Link>
              <Typography style={{ marginLeft: 'auto' }}>{new Date(post.createdDate).toDateString()}</Typography>
            </Author>
      
            <Typography style={{ overflowWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{post.description}</Typography>
          </>
        )}
      </Container>      
    )
}

export default DetailView;
