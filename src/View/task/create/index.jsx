import React, { useEffect } from 'react'
import CustomInput from '../../../Components/SharedComponents/CustomInput'
import CustomSelect from '../../../Components/SharedComponents/CustomSelect'
import DatePicker from '../../../Components/SharedComponents/DatePicker'
import { useFormik } from 'formik'
import { priorityOptions, statusOptions } from '../../../utils/config'
import axios from 'axios'
import { BASE_URL, routes } from '../../../utils/config'
import dayjs from 'dayjs'
import { useUser } from "../../../context/userContext"
import * as Yup from 'yup'
import { useNavigate } from 'react-router'
const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required."),
    assigned_to: Yup.string().required("Assigned to is required."),
    status: Yup.string().required("Status is required."),
    priority: Yup.string().required("Priority is required."),
    due_date: Yup.string().required("Due date is required."),
})
function CreateTask() {
    const { user, token } = useUser();
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            assigned_to: '',
            status: '',
            priority: '',
            due_date: dayjs(new Date())
        },
        validationSchema,
        onSubmit: async (values, { isSubmitting }) => {
            values.due_date = dayjs(values.due_date).format('YYYY-MM-DD');
            values.created_by = user?._id;
            try {
                const res = await axios.post(`${BASE_URL}/task/create-task`, values, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (res?.status === 201) {
                    alert("Task created successfully!");
                    navigate(routes.TASK, { replace: true });
                }
            } catch (e) {
                console.error('Error creating task:', e);
            }
        }
    })
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${BASE_URL}/auth/get-users`);
                response?.data?.forEach((item) => (
                    setData(prevData => [...prevData, { label: item.name, value: item._id }])
                ))

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [])

    const handleDateChange = (date) => {
        formik.setFieldValue('due_date', dayjs(date));
    }
    return (
        <form onSubmit={formik.handleSubmit} >
            <div className='flex flex-col space-y-5  '>
                <div className='flex flex-row items-center justify-between gap-10'>
                    <CustomInput
                        label="Title"
                        placeholder={"Title"}
                        color={true}
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        error={formik.touched.title && formik.errors.title}
                    />
                    <CustomInput
                        label="Description"
                        placeholder={"Description"}
                        color={true}
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.touched.description && formik.errors.description}
                    />
                </div>
                <div className='flex flex-row items-center justify-between gap-10'>
                    <CustomSelect
                        label="Assign To"
                        color={true}
                        onChange={formik.handleChange}
                        options={data}
                        name="assigned_to"
                        value={formik.values.assigned_to}
                        error={formik.touched.assigned_to && formik.errors.assigned_to}
                    />
                    <CustomSelect
                        label="Status"
                        color={true}
                        options={statusOptions}
                        onChange={formik.handleChange}
                        name="status"
                        value={formik.values.status}
                        error={formik.touched.status && formik.errors.status}
                    />
                </div>
                <div className='flex flex-row items-start justify-between gap-10'>
                    <CustomSelect
                        label="Priority"
                        color={true}
                        options={priorityOptions}
                        onChange={formik.handleChange}
                        name="priority"
                        value={formik.values.priority}
                        error={formik.touched.priority && formik.errors.priority}
                    />
                    <DatePicker
                        label="Due Date"
                        name="due_date"
                        value={dayjs(formik.values.due_date)}
                        onChange={handleDateChange}
                    />
                </div>
            </div>
            <div className='flex flex-row items-center w-full justify-end gap-5 mt-5'>
                <button type='submit' className='cursor-pointer border-[1px] border-blue-500  text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300'>
                    Cancel
                </button>
                <button type='submit' className='cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300'>
                    Create Task
                </button>
            </div>
        </form>
    )
}

export default CreateTask