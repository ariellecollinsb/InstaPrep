import React, { useContext } from "react";
import UserContext from '../../UserContext';
import { Link } from "react-router-dom";
// nodejs library that concatenates strings
import classnames from "classnames";

// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container
} from "reactstrap";
import {
  NavLink
} from "react-router-dom";

function DefaultNavBar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  const user = useContext(UserContext)

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 229 ||
        document.body.scrollTop > 229
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 230 ||
        document.body.scrollTop < 230
      ) {
        setNavbarColor("navbar-transparent");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <Navbar
      className={classnames("fixed-top", navbarColor)}
      color-on-scroll="230"
      expand="lg"
    >
      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            to="/index"
            title="InstaPrep"
            tag={Link}
          >
            InstaPrep
          </NavbarBrand>
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav navbar>
            <NavItem>
              <NavLink className="nav-link" to="/discover">
                Discover
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link" to="/meals">
                Meals
              </NavLink>
            </NavItem>
            {!user.isAuthenticated() ?
              <>
                <NavItem>
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </NavItem>
              </>
              :
              <>
                <NavItem>
                  <NavLink className="nav-link" to="/profile">
                    Profile
                </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/logout">
                    Log Out
                </NavLink>
                </NavItem>
              </>
            }
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default DefaultNavBar;
