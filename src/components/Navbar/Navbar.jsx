import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import ButtonApp from "../../shared/buttonApp/ButtonApp";

export function AppNavbar() {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AuthContext);
  console.log(userData);

  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }
  return (
    <Navbar>
      <NavbarBrand as={Link} to="/">
        <span className="logo self-center whitespace-nowrap text-3xl font-semibold dark:text-white">
          Kudo
        </span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            userData ? (
              <Avatar alt="User settings" img={userData.photo} rounded />
            ) : (
              <Avatar
                alt="User settings"
                img={
                  "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                }
                rounded
              />
            )
          }
        >
          {token ? (
            <>
              {userData && (
                <>
                  <DropdownHeader>
                    <span className="block text-sm">{userData.name}</span>
                    <span className="block truncate text-sm font-medium">
                      {userData.email}
                    </span>
                  </DropdownHeader>
                  <DropdownItem as={NavLink} to="/profile">
                    profile
                  </DropdownItem>
                  <DropdownDivider />
                  <DropdownItem as={Button} onClick={handleLogout}>
                    Sign out
                  </DropdownItem>
                </>
              )}
            </>
          ) : (
            <>
              <DropdownItem as={NavLink} to="/login">
                login
              </DropdownItem>
              <DropdownItem as={NavLink} to="/register">
                register
              </DropdownItem>
            </>
          )}
        </Dropdown>
        <NavbarToggle />
      </div>
      {token && (
        <NavbarCollapse>
          <NavbarLink as={NavLink} to="/posts" active>
            Home
          </NavbarLink>

          <NavbarLink as={NavLink} to="/profile">
            profile
          </NavbarLink>
        </NavbarCollapse>
      )}
    </Navbar>
  );
}
