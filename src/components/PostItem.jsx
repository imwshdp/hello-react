import React from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import MyButton from "./UI/button/MyButton";

const PostItem = (props) => {
    const router = useNavigate()

    return (
        <div className="post">

            <div className='post-content'>
            <strong>{props.post.id}. {props.post.title}</strong>
            <div>
                {props.post.body}
            </div>
            </div>

            <div className="btns-wrapper">
                <div className='post-btns'>
                    <MyButton
                        onClick={() => router(`/posts/${props.post.id}`)}>
                            Open
                    </MyButton>
                </div>

                <div className='post-btns'>
                    <MyButton onClick={() => props.remove(props.post)}>Delete</MyButton>
                </div>
            </div>

      </div>
    );
};

export default PostItem;