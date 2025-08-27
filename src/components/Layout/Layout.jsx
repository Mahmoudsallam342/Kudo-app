import React from "react";
import { AppNavbar } from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { AppFooter } from "../Footer/Footer";
import { Offline, Online } from "react-detect-offline";
import { Toast, ToastToggle } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";
function Layout() {
  return (
    <>
      <div className="main dark:bg-gray-900 dark:text-gray-200">
        <AppNavbar />
        <div className="min-h-screen">
          <div>
            {/* <Online>
              <Toast className="fixed top-24 right-10 z5">
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                  <HiCheck className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm font-normal">you're online</div>
                <ToastToggle />
              </Toast>
            </Online> */}
            <Offline>
              <Toast className="fixed top-24 right-10 z5">
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                  <HiX className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm font-normal">you're offline</div>
                <ToastToggle />
              </Toast>
              ;
            </Offline>
          </div>
          <Outlet />
        </div>
        <AppFooter />
      </div>
    </>
  );
}

export default Layout;
