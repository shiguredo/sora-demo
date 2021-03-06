import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import Sora from "sora-js-sdk";

import { SoraDemoState } from "@/slice";

const Footer: React.FC = () => {
  const { version } = useSelector((state: SoraDemoState) => state);
  return (
    <footer>
      <Navbar variant="dark" bg="sora" expand="md" fixed="bottom" className="p-0">
        <Nav className="mr-auto" />
        <Nav>
          <Navbar.Collapse id="navbar-collapse">
            <a href="https://github.com/shiguredo/sora-demo" className="btn btn-outline-light m-1">
              GitHub: shiguredo/sora-demo: {version}
            </a>
            <a href="https://github.com/shiguredo/sora-js-sdk" className="btn btn-outline-light m-1">
              GitHub: shiguredo/sora-js-sdk: {Sora.version()}
            </a>
          </Navbar.Collapse>
        </Nav>
      </Navbar>
    </footer>
  );
};

export default Footer;
