import React, { useEffect } from 'react'
import { routes, BASE_URL } from '../../utils/config';
import PageHeading from '../../Components/SharedComponents/PageHeading';
import axios from 'axios';
import { useUser } from '../../context/userContext';
import Pagination from '../../Components/SharedComponents/Pagination';
function Task() {
    const { token } = useUser()

    const [data, setData] = React.useState([])
    const [pagination, setPagination] = React.useState({
        page: 1,
        limit: 5,
        totalPages: 2,
        totalRecords: 27,
        total: 20,
        displayPages:5,
    })
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/task/get-task?page=${pagination.page}&limit=${pagination.limit}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}` // Uncomment if you need to send a token
                    }
                });
                
                if (response?.status === 200) {
                    setData(response?.data?.task);
                    setPagination(prev => ({
                        ...prev,
                        totalPages: response?.data?.totalPages,
                        totalRecords: response?.data?.totalRecords,
                        total: response?.data?.total
                    }))
                }
                console.log(response, 'responsefemal'
                );
            } catch (e) {
                console.error('Error fetching data:', e);
            }
        }
        fetchData();
    }, [pagination.page, pagination.limit])
    const handlePaginationClick = (value) => {
        if (value === 'next') {
            if(pagination.totalPages === pagination.page) return;
            setPagination(prev => ({
                ...pagination,
                page:pagination.page + 1,
            }))
        } else if (value === 'prev') {
            if(pagination.page === 1) return;   
            setPagination(prev => ({
                ...prev,
                page:pagination.page -1
            }))
        } else {
            if(pagination.page === value) return;
            setPagination(prev => ({
                ...prev,
                page: value
            }))
        }
    }
    return (
        <div className='pb-20 w-full flex flex-col gap-5'>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg flex flex-col ">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Created By
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Assigned To
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Priority
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Due Date
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((element, idx) => {
                                return <tr key={element?._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {element?.title}
                                    </th>
                                    <td className="px-6 py-4">
                                        {element?.description}
                                    </td>
                                    <td className="px-6 py-4">
                                        {element?.created_by?.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {element?.assigned_to?.name || 'Unassigned'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {element?.status}
                                    </td>
                                    <td className="px-6 py-4">
                                        {element?.priority}
                                    </td>
                                    <td className="px-6 py-4">
                                        {element?.due_date}
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>

            </div>
            <Pagination pagination={pagination} handlePaginationClick={handlePaginationClick} />
        </div>
    )
}

export default Task
