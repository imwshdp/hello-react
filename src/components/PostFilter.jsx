import React from "react";
import MySelect from './UI/select/MeSelect';
import MyInput from './UI/input/MyInput';

const PostFilter = ({filter, setFilter}) => {
    return (
        <div>

            {/* Поиск заметки */}
            <MyInput
                value={filter.query}
                onChange={e => setFilter({...filter, query: e.target.value})}
                placeholder="Search..."
            />

            {/* Сортировка по названию/описанию */}
            <MySelect
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                defaultValue={"Sort"}
                options = {[
                    {value: 'title', name: 'By title'},
                    {value: 'body', name: 'By description'}
                ]}
            />
        </div>
    );
}

export default PostFilter;