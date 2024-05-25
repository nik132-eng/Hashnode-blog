// import React, { useState, useEffect } from 'react';

// import { Box, styled, TextareaAutosize, Button, FormControl, InputBase } from '@mui/material';
// import { AddCircle as Add } from '@mui/icons-material';
// import { useNavigate, useParams } from 'react-router-dom';

// import { API } from '../../service/api';

// interface Post {
//   title: string;
//   description: string;
//   picture: string;
//   username: string;
//   categories: string;
//   createdDate: Date;
// }

// const Container = styled(Box)(({ theme }) => ({
//   margin: '50px 100px',
//   [theme.breakpoints.down('md')]: {
//     margin: 0
//   }
// }));

// const Image = styled('img')({
//   width: '100%',
//   height: '50vh',
//   objectFit: 'cover'
// });

// const StyledFormControl = styled(FormControl)`
//   margin-top: 10px;
//   display: flex;
//   flex-direction: row;
// `;

// const InputTextField = styled(InputBase)`
//   flex: 1;
//   margin: 0 30px;
//   font-size: 25px;
// `;

// const StyledTextArea = styled(TextareaAutosize)`
//   width: 100%;
//   border: none;
//   margin-top: 50px;
//   font-size: 18px;
//   &:focus-visible {
//     outline: none;
//   }
// `;

// const initialPost: Post = {
//   title: '',
//   description: '',
//   picture: '',
//   username: 'codeforinterview',
//   categories: 'Tech',
//   createdDate: new Date()
// };

// const Update = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const [post, setPost] = useState<Post>(initialPost);
//   const [file, setFile] = useState<File | null>(null);
//   const [imageURL, setImageURL] = useState('');

//   const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

//   useEffect(() => {
//     const fetchData = async () => {
//       let response = await API.getPostById(id);
//       if (response.isSuccess) {
//         setPost(response.data);
//       }
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     const getImage = async () => {
//       if (file) {
//         const data = new FormData();
//         data.append('name', file.name);
//         data.append('file', file);

//         const response = await API.uploadFile(data);
//         if (response.isSuccess) {
//           post.picture = response.data;
//           setImageURL(response.data);
//         }
//       }
//     };
//     getImage();
//   }, [file]);

//   const updateBlogPost = async () => {
//     await API.updatePost(post);
//     navigate(`/details/${id}`);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setPost({ ...post, [e.target.name]: e.target.value });
//   };

//   return (
//     <Container>
//       <Image src={post.picture || url} alt="post" />

//       <StyledFormControl>
//         <label htmlFor="fileInput">
//           <Add fontSize="large" color="action" />
//         </label>
//         <input
//           type="file"
//           id="fileInput"
//           style={{ display: "none" }}
//           onChange={(e) => setFile(e.target.files?.[0])}
//         />
//         <InputTextField onChange={handleChange} value={post.title} name='title' placeholder="Title" />
//         <Button onClick={updateBlogPost} variant="contained" color="primary">Update</Button>
//       </StyledFormControl>

//       <StyledTextArea
//         minRows={5}
//         placeholder="Tell your story..."
//         name='description'
//         onChange={handleChange}
//         value={post.description}
//       />
//     </Container>
//   );
// };

// export default Update;