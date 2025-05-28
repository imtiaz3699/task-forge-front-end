import React, { useEffect } from 'react'
import { generatePageRange } from '../../../utils/helpers'
function Pagination({ pagination, handlePaginationClick }) {
    const [pages, setPages] = React.useState([])
    console.log(pagination.page,pagination.totalPages,'paglakjshflajds')
    useEffect(() => {
        const res = generatePageRange(pagination.page, pagination.totalPages)
        console.log(res,'fasdfahsldfhasdlk')
        
        if (res?.length < 5 && res?.length > 0 && pagination.totalPages > 5) {
            const arr = Array.from({ length: 5 }, (_, i) => res - i);
            console.log(arr,'army')
            setPages(arr.reverse());
        } else {
            console.log(res,'army')
            setPages(res);
        }
    }, [pagination])
    console.log(pages,'fasdlfspages')
    return (
        <div className='w-full flex flex-row items-center justify-end '>
            <div aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px text-sm">
                    <li >
                        <span onClick={() => handlePaginationClick('prev')} className={`flex cursor-pointer items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 ${pagination.page === 1 ? "dark:bg-gray-800 dark:text-gray-700 dark:hover:text-gray-700 dark:border-gray-700 dark:hover:bg-gray-800 cursor-text " : "dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"}   hover:text-gray-700  `}>Previous</span>
                    </li>
                    {
                        pages?.map((element, idx) => {
                            return <li key={idx} onClick={() => handlePaginationClick(element)}>
                                <span className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border  border-gray-300 hover:bg-gray-100 hover:text-gray-700  dark:border-gray-700 
                        ${pagination?.page === element ? "bg-gray-700 dark:bg-gray-700 dark:text-white" : "dark:bg-gray-800 cursor-pointer"} dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>{element}</span>
                            </li>
                        })
                    }
                    <li>
                        <span onClick={() => handlePaginationClick('next')}
                            className={`flex cursor-pointer items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg ${pagination.page.toString() === pagination.totalPages.toString() ? "dark:bg-gray-800 dark:hover:bg-gray-800 dark:text-gray-700 dark:hover:text-gray-700 dark:border-gray-700" : "dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"} hover:bg-gray-100 hover:text-gray-700 `}>Next</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Pagination
