import React from "react";
import { getPagesArray } from '../../../utils/pages.js';

const Pagination = ({totalPages, page, changePage}) => {

    // массив со страницами заметок
    let pagesArray = getPagesArray(totalPages)

    return (
        <div className='page-wrapper'>
            {pagesArray.map(p =>
            <span
                onClick={() =>changePage(p)}
                key={p}
                className={ page === p
                    ? 'page page-current'
                    : 'page'
            }>{p}</span>
            )}
        </div>
    );
}

export default Pagination;