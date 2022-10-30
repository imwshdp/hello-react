import React, {useState} from "react";
import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput'

const PostForm = ({create}) => {

    const[post, setPost] = useState({title: '', body: ''})

    const addNewPost = (e) => {
        e.preventDefault()
        const newPost = {
            ...post, id: Date.now()
        }
        // callback-функция добавления новой заметки
        create(newPost)

        // изменение состояния (очищение полей input)
        setPost({title: '', body: ''})
    }

    return (
        <form>
        {/* Управляемые компоненты MyInput */}
            <MyInput
            type="text"
            value={post.title}
            onChange={e => setPost({...post, title: e.target.value})}
            placeholder='Note title' />

            <MyInput
            type="text"
            value={post.body}
            onChange={e => setPost({...post, body: e.target.value})}
            placeholder='Note description' />
            
            <MyButton onClick={addNewPost}>Create note</MyButton>
        </form>
    );
}

export default PostForm;