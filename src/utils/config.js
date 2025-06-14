export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const routes = {
    TASK: "/admin/task",
    CREATE_TASK: "/admin/create",
    UPDATE_TASK: "/admin/update-task",
    USERS: "/admin/users",
    CREATE_USERS: "/admin/create-user",
    UPDATE_USERS: "/admin/update-user",
    TEAMS:"/admin/teams",
    CREATE_TEAMS:"/admin/create-teams",
    UPDATE_TEAMS:"/admin/update-teams",
    VIEW_TEAMS:"/admin/teams/view-team",
    CREATE_TASK_TEAMS:"/admin/teams/create-task"
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