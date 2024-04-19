import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const logoutHandler = async() => {
    await authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button onClick={logoutHandler} className="inline-block px-6 py-2 text-[#ffffff] duration-200 hover:bg-[#87812f] rounded-full">
      Logout
    </button>
  );
};

export default Logout;
