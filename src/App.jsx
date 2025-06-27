import React, { Suspense, useState } from "react";
import "./App.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import Auth from "./Components/Auth/index";
import Signup from "./View/Signup/index";
import AdminLayouts from "./layouts/AdminLayouts";
import Dashboard from "./View/dashboard";
import Users from "./View/users";
import Task from "./View/task";
import CreateTask from "./View/task/create";
import { message } from "antd";
import CreateUser from "./View/users/create";
import Teams from "./View/teams";
import CreateTeams from "./View/teams/Create";
import ProtectedRoute from "./Components/ProtectedRoute";
import { UserProvider } from "./context/userContext";
import TaskList from "./View/teams/task";
import CreateTeamsTask from "./View/teams/task/create";
import InvoiceLayout from "./View/invoicemate/invoiceLayout";
// import InvoiceDashboard from "./View/invoicemate/invoiceDashboard/InvoiceDashboard";

import InvoiceManagement from "./View/invoicemate/InvoiceManagement/InvoiceManagement";
import ExpenseManagement from "./View/invoicemate/ExpenseManagement/ExpenseManagement";
import InvoiceAuth from "./View/invoicemate/invoiceAuth/InvoiceAuth";
import { InvoiceMateUserProvider } from "./context/invoiceContext";
import { routes } from "./utils/config";
import InvoiceSignup from "./View/invoicemate/invoiceAuth/InvoiceSignup";
import InvoiceSubLayout from "./layouts/InvoiceSubLayout";
import Transactions from "./View/invoicemate/transactions/Transactions";
import ClientManagement from "./View/invoicemate/ClientManagement/ClientManagement";
import InvoiceSettings from "./View/invoicemate/InvoiceSettings/InvoiceSettings";
import CreateInvoice from "./View/invoicemate/InvoiceManagement/create/CreateInvoice";
import InvoiceProduct from "./View/invoicemate/invoiceProduct/InvoiceProduct";
import CreateProduct from "./View/invoicemate/invoiceProduct/Create";
import Category from "./View/invoicemate/Category";
const InvoiceDashboard = React.lazy(() =>
  import("./View/invoicemate/invoiceDashboard/InvoiceDashboard")
);
function App() {
  const [messageApi, contextHolder] = message.useMessage();
  return (
    <div className="w-full bg-gray-900 h-screen">
      {contextHolder}
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <UserProvider>
            <InvoiceMateUserProvider>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Auth />} />
                <Route path="/auth/signup" element={<Signup />} />

                {/* Protected Admin Routes */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminLayouts />
                    </ProtectedRoute>
                  }
                >
                  <Route path="users" element={<Users />} />
                  <Route path="create-user" element={<CreateUser />} />
                  <Route path="update-user/:id" element={<CreateUser />} />
                  <Route path="task" element={<Task />} />
                  <Route path="create" element={<CreateTask />} />
                  <Route path="update-task/:id" element={<CreateTask />} />

                  {/* Nested team routes */}
                  <Route path="teams" element={<Teams />} />
                  <Route path="create-teams" element={<CreateTeams />} />
                  <Route path="update-teams/:id" element={<CreateTeams />} />
                  <Route
                    path="teams"
                    element={<Outlet context={[messageApi]} />}
                  >
                    <Route path="view-team/:id" element={<TaskList />} />
                    <Route path="create-task" element={<CreateTeamsTask />} />
                  </Route>
                </Route>

                {/* InvoiceMate App Routes */}
                <Route path="/invoice-mate" element={<InvoiceLayout />}>
                  <Route index element={<InvoiceAuth />} />
                  <Route path="signup" element={<InvoiceSignup />} />
                  <Route element={<InvoiceSubLayout />}>
                    <Route path="dashboard" element={<InvoiceDashboard />} />
                    <Route
                      path="transactions-management"
                      element={<Transactions />}
                    />
                    <Route
                      path="client-management"
                      element={<ClientManagement />}
                    />
                    <Route
                      path="invoice-management"
                      element={<InvoiceManagement />}
                    />
                    <Route
                      path="create-invoice"
                      element={<CreateInvoice />}
                    />
                    <Route
                      path="expense-management"
                      element={<ExpenseManagement />}
                    />
                    <Route
                      path="product"
                      element={<InvoiceProduct />}
                    />
                    <Route
                      path="create-product"
                      element={<CreateProduct />}
                    />
                    <Route
                      path="category"
                      element={<Category />}
                    />
                    <Route
                      path="settings/:id"
                      element={<InvoiceSettings />}
                    />
                  </Route>
                </Route>

                {/* Optionally add a 404 fallback */}
                <Route path="*" element={<div>404 - Page Not Found</div>} />
              </Routes>
            </InvoiceMateUserProvider>
          </UserProvider>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
