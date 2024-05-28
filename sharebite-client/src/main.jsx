import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AuthProvider from "./providers/AuthProvider.jsx";
import router from "./routes/Router.jsx";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider router={router}>
                <RouterProvider router={router} />
            </AuthProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
