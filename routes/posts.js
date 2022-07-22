
//In index.js, created the app.use('/posts',postRoutes), it means http://localhost:5000/posts

import express from 'express';

import {commentPost, getPostById, getPostsBySearch,getPosts, createPost, updatePost, likePost, deletePost } from '../controllers/posts.js';

import auth from '../middleware/auth.js';



const router = express.Router();

router.get('/search',getPostsBySearch);
router.get('/', getPosts);
router.get('/:id',getPostById);
router.post('/', auth,createPost);
router.patch('/:id',auth, updatePost);
router.delete('/:id',auth, deletePost);
router.patch('/:id/likePost',auth, likePost);
router.post('/:id/commentPost',auth, commentPost);

export default router;