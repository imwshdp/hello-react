import React from 'react';
import About from "../pages/About";
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import PostIdPage from "../pages/PostIdPage";
import Login from '../pages/Login';

export const privateRoutes = [
    {path: '*', element: <Error/>, exact: false},
    {path: '', element: <Posts/>, exact: false},
    {path: '/about', element: <About/>, exact: false},
    {path: '/posts', element: <Posts/>, exact: true},
    {path: '/posts/:id', element: <PostIdPage/>, exact: true},
]

export const publicRoutes = [
    {path: '*', element: <Login/>, exact: false},
    {path: '', element: <Login/>, exact: false},
    {path: '/login', element: <Login/>, exact: false},
]