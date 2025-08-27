import { RouterProvider } from "react-router-dom";
import { router } from "./AppRouting/AppRouting";
import { Button } from "flowbite-react";
import AuthContextProvider from "./authContext/AuthContext";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Helmet } from "react-helmet";
const queryClient = new QueryClient();
function App() {
  return (
    <>
      <Helmet>
        <title>Kudo | App</title>
      </Helmet>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <RouterProvider router={router} />
          <ToastContainer />
          <ReactQueryDevtools />
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
