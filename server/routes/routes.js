import express from 'express'

import { signupUser, loginUser } from '../controller/user-controller.js'
import { getImage, uploadImage } from '../controller/image-controller.js';
import upload from '../utils/upload.js';
import { authenticateToken } from '../controller/jwt-controller.js';
import { createPost, deletePost, getAllPosts, getPost, updatePost } from '../controller/post-controller.js';

const router = express.Router();


router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);
router.post('/create', authenticateToken, createPost);


router.get('/post', authenticateToken, getPost);
router.get('/posts', authenticateToken, getAllPosts);

router.put('/update', authenticateToken, updatePost);
router.delete('/delete', authenticateToken, deletePost);

export default router;