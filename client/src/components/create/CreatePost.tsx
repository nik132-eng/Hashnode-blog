import React, { useState, useEffect, useContext } from 'react';

import { styled, Box, TextareaAutosize, Button, InputBase, FormControl } from '@mui/material';
// import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import blogbanner from '../../../public/blogbanner.jpg'
import { API } from '../../service/api';
import { DataContext } from '../../App';

interface Post {
  title: string;
  description: string;
  picture: string;
  username: string;
  categories: string;
  createdDate: Date;
}

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
`;

const Textarea = styled(TextareaAutosize)`
  width: 100%;
  border: none;
  margin-top: 50px;
  font-size: 18px;
  &:focus-visible {
    outline: none;
  }
`;

const initialPost: Post = {
  title: '',
  description: '',
  picture: '',
  username: '',
  categories: '',
  createdDate: new Date()
};

const CreatePost = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [post, setPost] = useState<Post>(initialPost);
  const [file, setFile] = useState<File | null>(null);
  const account = useContext(DataContext);

  const url = post.picture ? post.picture : blogbanner;
  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append('name', file.name);
        data.append('file', file);

        const response = await API.uploadFile(data);
        setPost({ ...post, picture: response.data });
      }
    };
    getImage();
    setPost({ ...post, categories: location.search?.split('=')[1] || 'All', username: account?.account?.username || "" });
  }, [file]);

  const savePost = async () => {
    await API.createPost(post);
    navigate('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  // const upload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (!e.target || !e.target.files) return;
  //   const file = e.target.files[0];
  //   setFile(file);
  // }

  return (
    <Container>
      <Image src={url} alt="post" />

      <StyledFormControl>
        {/* <label htmlFor="fileInput">
          <Add fontSize="large" color="action" />
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={upload}
          /> */}
        <InputTextField onChange={handleChange} name='title' placeholder="Title" />
        <Button onClick={savePost} variant="contained" color="primary">Publish</Button>
      </StyledFormControl>

      <Textarea
        minRows={5}
        placeholder="Tell your story..."
        name='description'
        onChange={handleChange}
      />
    </Container>
  );
};

export default CreatePost;