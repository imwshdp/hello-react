
import React, { useEffect, useState, useRef } from 'react';
import { usePosts } from '../hooks/usePosts';
import { useFetching } from '../hooks/useFetching';
import { getPagesCount } from '../utils/pages.js';

// import ClassCounter from './components/ClassCounter';
// import Counter from './components/Counter';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/modal/MyModal';
import MyButton from '../components/UI/button/MyButton';
import PostService from '../API/PostService';
import Loader from '../components/UI/loader/Loader';
import Pagination from '../components/UI/pagination/Pagination';
import { useObserver } from '../hooks/useObserver';
import MySelect from '../components/UI/select/MeSelect';

function Posts() {

    // состояние для списка
    const [posts, setPosts] = useState([])
          
    // общее количество заметок
    const [totalPages, setTotalPages] = useState(0)
  
    // состояния подгруженных заметок (пагинация)
    const [limit, setLimit] = useState(5)
    const [page, setPage] = useState(1)
  
    // состояние фильтра (сортировка + поиск)
    const [filter, setFilter] = useState({sort: '', query: ''})
  
    //состояние видимости модального окна
    const [modal, setModal] = useState(false)
  
    // фильтрация + сортировка (кастомный хук)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

    // нижний блок, используемый intersection observer
    const lastElement = useRef()
  
    // обработка состояний индикации загрузки и обработки ошибки (кастомный хук)
    const [fetchPosts, isPostsLoading, postError] = useFetching( async (limit, page) => {
        const response = await PostService.getAll(limit, page)
        setPosts([...posts, ...response.data])
        const totalPagesCount = response.headers['x-total-count']
        setTotalPages(getPagesCount(totalPagesCount, limit))
    })
  
    // подгрузка данных с сервера при монтировании
    useEffect(() => {
        fetchPosts(limit, page)
    }, [page, limit])

    useObserver(lastElement, (page < totalPages), isPostsLoading, () => { setPage(page + 1) } )
  
    // callback-функция для изменения состояния post
    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }
  
    // callback-функция для изменения состояния post
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }
  
    const changePage = (page) => {
        setPage(page)
    }
  
    return (
        <div className="App">
            <MyButton
                style={{marginTop: 30}}
                onClick={() => setModal(true)}>
                New note
            </MyButton>
    
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
    
            <hr style={{margin: "15px 0"}}></hr>
    
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />

            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue={'Uploade notes'}
                options={[
                    {value: 5, name: 'by 5'},
                    {value: 10, name: 'by 10'},
                    {value: 25, name: 'by 25'},
                    {value: 100, name: 'All'},
                ]}
            />

            {postError &&
                <h1>Error occured: {postError}</h1>
            }

            <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Notes list"/>
            <div ref={lastElement} style={{height: 5, background: 'transperent'}}></div>

            {isPostsLoading &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>
                    <Loader/>
                </div>
            }            
            
            <Pagination
                totalPages={totalPages}
                page={page}
                changePage={changePage}
            />      
        </div>
    );
};

export default Posts;