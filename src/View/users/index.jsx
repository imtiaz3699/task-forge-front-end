import React from 'react'
import Pagination from '../../Components/SharedComponents/Pagination'
import { useUser } from '../../context/userContext'
import axios from 'axios'
import { BASE_URL } from '../../utils/config'
function Users() {
  const { token } = useUser()

  const [data, setData] = React.useState([])
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 10,
    totalPages: 0,
    totalRecords: 0,
    total: 0,
    displayPages: 5,
  })
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/auth/get-users?page=${pagination.page}&limit=${pagination.limit}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}` // Uncomment if you need to send a token
          }
        });
        if (response?.status === 200) {
          setData(response?.data?.users);
          setPagination(prev => ({
            ...prev,
            totalPages: response?.data?.totalPages ?? 0,
            totalRecords: response?.data?.totalRecords ?? 0,
            total: response?.data?.total ?? 0,
            page: response?.data?.page,
            limit: response?.data?.limit,

          }))
        }
      } catch (e) {
        console.error('Error fetching data:', e);
      }
    }
    fetchData();
  }, [pagination.page, pagination.limit])
  const handlePaginationClick = (value) => {
    if (value === 'next') {
      if (pagination.totalPages === pagination.page) return;
      setPagination(prev => ({
        ...pagination,
        page: pagination.page + 1,
      }))
    } else if (value === 'prev') {
      if (pagination.page === 1) return;
      setPagination(prev => ({
        ...prev,
        page: pagination.page - 1
      }))
    } else {
      if (pagination.page === value) return;
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
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {
              data?.map((element, idx) => {
                return <tr key={element?._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {element?.name}
                  </th>
                  <td className="px-6 py-4">
                    {element?.email}
                  </td>
                  <td className="px-6 py-4">
                    {element?.role}
                  </td>
                  <td className="px-6 py-4">
                    
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

export default Users
