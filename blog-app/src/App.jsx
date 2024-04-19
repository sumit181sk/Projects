import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";
import "./App.css";
import { Footer, Header } from "./components/index.js";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <>
      <div className="min-h-screen rounded-2xl rounded-b-2xl flex flex-wrap content-between ">
        <div className="w-full block   rounded-2xl  ">
          <Header />
          <main className=" text-[#0b1529] min-h-96">
            
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  ) : null;
}

export default App;
