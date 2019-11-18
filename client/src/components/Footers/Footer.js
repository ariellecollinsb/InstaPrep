import React from "react";
import { Row, Container } from "reactstrap";
import { NavLink } from "react-router-dom";
function Footer() {
  return (
    <footer className="footer footer-black footer-white">
      <Container>
        <Row>
          <nav className="footer-nav">
            <ul>
              <li>
                <a
                  href="https://github.com/#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa fa-github" /> GitHub
                </a>
              </li>
              <li>
                <NavLink to="/Attributions">Attributions</NavLink>
              </li>
            </ul>
          </nav>
          <div className="credits ml-auto">
            <span className="copyright">
              © {new Date().getFullYear()}, Arielle Collins
            </span>
          </div>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
