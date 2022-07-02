import React from 'react'
import { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { USER_LOGOUT } from '../constants/accountContstants';
import { FiAlignRight } from 'react-icons/fi'

const Header = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = () =>{
      dispatch({
        type: USER_LOGOUT
      });
      navigate('/prijava');
      localStorage.clear();
    }

    const userLogin = useSelector(s => s.userLogin);
    const { userInfo, error } = userLogin

    const basket = useSelector(s => s.basket);
    const { items } = basket

    const [variant, setVariant] = useState('light');
    
    const { pathname } = useLocation();

    // window.addEventListener("scroll", ()=>{
    //     if(window.scrollY > 0.5){
    //         setVariant('light');
    //     } else{
    //         setVariant('transparent');
    //     }
    // })

  return (
    <> 
    {/* && pathname === "/kreiraj-oglas" */}
    <Navbar collapseOnSelect expand="md" variant='light' className={`fixed-top ${variant === 'transparent' ? 'hasNoBg' : 'hasBg'}`}>
      <Container className='d-flex'>
      <Navbar.Brand as={Link} to='/' className={variant === 'transparent' && pathname !== '/registracija' && pathname !== "/kreiraj-oglas" ? 'text-light' : 'text-dark'}><span className='text-warning'>Real</span>Estate</Navbar.Brand>
           
      <Navbar.Toggle className='text-dark' aria-controls="responsive-navbar-nav"><FiAlignRight/></Navbar.Toggle>
      <Navbar.Collapse collapseOnSelect id="responsive-navbar-nav">
        <Nav collapseOnSelect className="ms-auto">
          <Nav.Link onClick={props.basketClose} as={Link} to='/' className={`link ${pathname === '/' ? 'border-bottom border-warning' : ''} ${variant !== 'transparent' ? 'text-dark' : 'text-light'}`} eventKey="1">Početna</Nav.Link>
          <Nav.Link onClick={props.basketClose} as={Link} to='/svi-oglasi' className={`link ${pathname === '/svi-oglasi' ? 'border-bottom border-warning' : ''} ${variant !== 'transparent' ? 'text-dark' : 'text-light'}`} eventKey="2">Svi oglasi</Nav.Link>
          <Nav.Link onClick={props.basketClose} as={Link} to='/o-nama' className={`link ${pathname === '/o-nama' ? 'border-bottom border-warning' : ''} ${variant !== 'transparent' ? 'text-dark' : 'text-light'}`} eventKey="3">O nama</Nav.Link>
          {!userInfo ? 
            <Nav.Link as={Link} eventKey="4" to='/prijava' className={`link ${pathname === '/registracija' ? 'border-bottom border-warning' : ''} ${variant !== 'transparent' ? 'text-dark' : 'text-light'}`}>Prijava</Nav.Link>
            :
            ''
          }
          {pathname !== '/profil/moji-oglasi' && pathname !== '/kreiraj-oglas' && <Nav.Link eventKey="5" onClick={props.basketClose} as={Link} to='/kreiraj-oglas' className={`ms-2 link bg-danger mt-1 py-1 px-2 rounded text-light`}>Kreiraj oglas +</Nav.Link>}
          {userInfo ? 
            <>
              <NavDropdown
                menuVariant="dark" 
                className='ms-2 dark' 
                title={<span className={variant === 'transparent' ? 'text-light' : 'text-dark'}>{userInfo.username}</span>} 
                id="basic-nav-dropdown"
                eventKey="6"
              >
                <NavDropdown.Item
                eventKey="14"
                >
                  <Nav.Link as={Link} to='/profil' className={`p-0 text-light m-0`}>Profil</Nav.Link>
                </NavDropdown.Item>
                <NavDropdown.Item
                eventKey="13"
                >
                  <Nav.Link as={Link} to='/profil/moji-oglasi' className={`p-0 text-light m-0`}>Moji oglasi</Nav.Link>
                </NavDropdown.Item>
                {userInfo.role[0] === "Admin" ? 
                  <>
                    <NavDropdown.Item
                    eventKey="12"
                    >
                      <Nav.Link as={Link} to='/korisnici' className={`p-0 text-light m-0`}>Upravljanje korisnicima</Nav.Link>
                    </NavDropdown.Item>
                  </> : ''
                }
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <button className={`p-0 w-100 text-light d-flex justify-content-between m-0 bg-transparent border-none btn p-0 m-0`}
                      onClick = {props.basketShow}
                      eventKey="11"
                    >
                      Favoriti
                      {items && <span className='text-warning'>({items.length})</span>}
                    </button>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <button className={`p-0 text-light m-0 bg-transparent border-none btn p-0 m-0`}
                    onClick = {logout}
                    eventKey="10"
                  >
                    Odjavi se
                  </button>
                </NavDropdown.Item>
              </NavDropdown>
            {/* <Nav.Link as={Link} to='/profil' className={`ms-2 link rounded`}>
              {userInfo.profilePic ? <img src={`${apiUrl}/Images/${userInfo.profilePic}`} className='rounded-circle' height='27.5px' width='30px'/> : ''}
            </Nav.Link> </> */}
            </>
            :
            ''
          }
        </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  </>
  )
}

export default Header