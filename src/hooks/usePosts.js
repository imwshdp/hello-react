import {useMemo} from 'react';

export const useSortedPosts = (posts, sort) => {
    // состояние сортированного списка с мемоизацией
    const sortedPosts = useMemo( () => {
        if(sort) {
            return [...posts].sort(
                (a, b) => a[sort].localeCompare(b[sort])
            )
        }
        return posts;
    }, [sort, posts])

    return sortedPosts;
}

export const usePosts = (posts, sort, query) => {
    const sortedPosts = useSortedPosts(posts, sort);

    // состояние сортированного отфильтрованного списка с мемоизацией
    const sortedAndSearchedPosts = useMemo( () => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()))
    }, [sortedPosts, query])

    return sortedAndSearchedPosts;
}