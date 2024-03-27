// import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Image } from 'react-bootstrap';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';

import '../navbar.css'
function NavBar() {
  return (
    <Navbar expand="sm" className="bg-body-tertiary" data-bs-theme="dark">
      <Container >
        {/* <Navbar.Brand className=" pt-2 pink " href="/">
          SmartRoute
        <Image src="../../public/smart_route_small_logo.png" alt="SmartRoute" style={{ height: '30px' }} />
        </Navbar.Brand> */}
       
          <Nav className="mx-auto">

          {/* <NavLink exact to="/createroute" activeClassName="activeClicked">CreateRoute</NavLink> */}

            <Nav.Link className=" me-5" href="/CreateRoute">CREATE</Nav.Link>
            <Nav.Link className="ms-5 me-5" href="/MapSpaceOld">VIEW</Nav.Link>
            <Nav.Link className="ms-5 " href="/DirectionsList">LIST</Nav.Link>
            {/* <Nav.Link href="/TabInputButton">Input Tests</Nav.Link>
            <Nav.Link href="/LocationSearch">Location Search</Nav.Link>
            <Nav.Link href="/ParentComponent">parent</Nav.Link>
            <Nav.Link href="/APIComponent">API</Nav.Link>
            <Nav.Link href="/GetDirectionsMapOver">GDMO</Nav.Link>
            <Nav.Link href="/addremovestopoutside">ARSO</Nav.Link> */}

          </Nav>
          <Navbar.Brand className=" pt-2 pink " href="/">
          
        <Image src="../../public/smart_route_small_logo.png" alt="SmartRoute" style={{ height: '40px' }} />
        </Navbar.Brand>
       
      </Container>
    </Navbar>
  );
}

export default NavBar;