import { useEffect, useState } from "react";
import { Container, Logo, Logout } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
 

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

 

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  return ( 
    <header className="py-3 shadow   rounded-t-2xl  ">
      <Container>
        <nav className="flex flex-wrap">
          <div className="mr-4">
            <Link to="/">
              <Logo height={200} width={450}/>
            </Link>
          </div>
          <ul className="flex flex-wrap ml-auto font-mono subpixel-antialiased">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="text-[#ffffff] inline-block px-6 py-2 duration-200 hover:bg-[#87812f] rounded-full "
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <Logout />
                
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
