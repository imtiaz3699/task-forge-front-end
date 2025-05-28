import React from 'react'
import { useNavigate } from 'react-router'
import { routes } from '../../../utils/config';
function PageHeading({ url }) {
    const navigate = useNavigate();

    return (
        <div className='w-full flex flex-row items-center justify-between px-5'>
            <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Tasks</h1>
            <button onClick={() => navigate(routes.CREATE_TASK)} className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Create Task
            </button>
        </div>
    )
}

export default PageHeading
