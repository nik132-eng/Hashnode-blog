import React, { useState, useEffect, useContext, FC } from 'react';

import { styled, Box, TextareaAutosize, Button, InputBase, FormControl } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../../App';
import blogbanner from '../../../public/blogbanner.jpg'

interface Post {
  title: string;
  description: string;
  picture: string;
  username: string;
  categories: string;
  createdDate: Date;
}

const initialPost: Post = {
  title: '',
  description: '',
  picture: '',
  username: '',
  categories: '',
  createdDate: new Date()
};

interface CreatePostProps {

}

const CreatePost: FC<CreatePostProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [post, setPost] = useState<Post>(initialPost);
  const [file, setFile] = useState<File | null>(null);
  const account  = useContext(DataContext);

  const url = post.picture ? post.picture : blogbanner;

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append('name', file.name);
        data.append('file', file);

        const response = await API.uploadFile(data);
        post.picture = response.data;
      }
    };

    getImage();

    post.categories = location.search?.split('=')[1] || 'All';
    post.username = account?.account?.username ?? '';
  }, [file]);

  const savePost = async () => {
    await API.createPost(post);
    navigate('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <label htmlFor="fileInput">
        <Image src={url} alt="post" />
      </label>
      <input
        type="file"
        id="fileInput"
        style={{ display: 'none' }}
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <StyledFormControl>
        <InputTextField onChange={handleChange} name="title" placeholder="Title" />
        <Button onClick={savePost} variant="contained" color="primary">
          Publish
        </Button>
      </StyledFormControl>

      <Textarea
        minRows={5}
        placeholder="Tell your story..."
        name="description"
        onChange={handleChange}
      />
    </Container>
  );
};

const Container = styled(Box)(({ theme }) => ({
  margin: '50px 100px',
  [theme.breakpoints.down('md')]: {
    margin: 0
  }
}));

const Image = styled('img')({
  width: '100%',
  height: '50vh',
  objectFit: 'cover'
});

const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 25px;
  font-family: Arial, Helvetica, sans-serif;
`;

const Textarea = styled(TextareaAutosize)`
  margin: 10px 0;
  width: 100%;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  font-family: Arial, Helvetica, sans-serif;
`;

export default CreatePost;