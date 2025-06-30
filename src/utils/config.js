import Dashboard from "../View/dashboard";

export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const BASE_URL_TWO = import.meta.env.VITE_BASE_URL_INVOICE_MATE;
export const routes = {
  TASK: "/admin/task",
  CREATE_TASK: "/admin/create",
  UPDATE_TASK: "/admin/update-task",
  USERS: "/admin/users",
  CREATE_USERS: "/admin/create-user",
  UPDATE_USERS: "/admin/update-user",
  TEAMS: "/admin/teams",
  CREATE_TEAMS: "/admin/create-teams",
  UPDATE_TEAMS: "/admin/update-teams",
  VIEW_TEAMS: "/admin/teams/view-team",
  CREATE_TASK_TEAMS: "/admin/teams/create-task",
  INVOICE_MATE: {
    INDEX:"/invoice-mate",
    SIGNUP:"/invoice-mate/signup",
    DASHBOARD: "/invoice-mate/dashboard",
    CREATE_INVOICE:"/invoice-mate/create-invoice",
    CLIENT_MANAGEMENT: "/invoice-mate/client-management",
    TRANSACTION_MANAGEMENT:"/invoice-mate/transactions-management",
    INVOICE_MANAGEMENT: "/invoice-mate/invoice-management",
    EXPENSE_MANAGEMENT: "/invoice-mate/expense-management",
    SETTINGS:"/invoice-mate/settings",
    PRODUCT:"/invoice-mate/product",
    CREATE_PRODUCT:"/invoice-mate/create-product",
    UPDATE_PRODUCT:"/invoice-mate/update-product",
    CATEGORIES:"/invoice-mate/category"
  },
};
export const statusOptions = [
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "In Progress",
    value: "inprogress",
  },
  {
    label: "Completed",
    value: "completed",
  },
];
export const priorityOptions = [
  {
    label: "Select Priority",
    value: "",
  },
  {
    label: "Low",
    value: "low",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "High",
    value: "high",
  },
];
