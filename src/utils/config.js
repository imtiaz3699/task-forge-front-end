export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const routes = {
    TASK: "/admin/task",
    USERS: "/admin/users",
    CREATE_TASK: "/admin/create"
}
export const statusOptions = [
    {
        label: "Pending",
        value: "pending"
    },
    {
        label: "In Progress",
        value: "inprogress"
    },
    {
        label: "Completed",
        value: "completed"
    }
]
export const priorityOptions = [
    {
        label: "Low",
        value: "low"
    },
    {
        label: "Medium",
        value: "medium"
    },
    {
        label: "High",
        value: "high"
    }
]