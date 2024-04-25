import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from './assets/websitelogo.jpg';

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Kullanıcının oturum durumunu kontrol et
    const sessionIdCookie = document.cookie
      .split(';')
      .find(cookie => cookie.startsWith('access_token'));
    setIsLoggedIn(!!sessionIdCookie);
   
    
  }, []);

  return (
    <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
  );
}

function Header({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Oturum bilgilerini sil
    document.cookie = 'sessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // Oturumu sonlandır ve giriş sayfasına yönlendir
    document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setIsLoggedIn(false);
    window.location.reload();
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="custom-navbar bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/" >
            <img
              alt="anasayfa"
              src={logo}
              width="200"
              height="100"
              
              className=" d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link href="/?cat=sondakika" className="exclamation-text">
                <span role="img" aria-label="Exclamation">❗</span> SON DAKİKA
              </Nav.Link>
              <Nav.Link href="/?cat=astroloji">ASTROLOJİ</Nav.Link>
              <Nav.Link href="/?cat=balikesir">BALIKESİR</Nav.Link>
              
              <Nav.Link href="/?cat=ayvalik">AYVALIK HABER</Nav.Link>
              <Nav.Link href="/?cat=gundem" className='gundemisolaal'>GUNDEM</Nav.Link>
              <NavDropdown title="KATEGORİLER" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="/?cat=teknoloji" >TEKNOLOJİ</NavDropdown.Item>
                <NavDropdown.Item href="/?cat=spor" >SPOR</NavDropdown.Item>
                <NavDropdown.Item href="/?cat=yerelhaber" >YEREL HABER</NavDropdown.Item>
                <NavDropdown.Item href="/?cat=guncelhaber" >GÜNCEL HABER</NavDropdown.Item>
             
               
                <NavDropdown.Item href="/?cat=siyaset" >SİYASET</NavDropdown.Item>
                <NavDropdown.Item href="/?cat=ekonomi" >EKONOMİ</NavDropdown.Item>
                <NavDropdown.Item href="/?cat=magazin" >MAGAZİN</NavDropdown.Item>
                <NavDropdown.Item href="/?cat=yasam">YAŞAM</NavDropdown.Item>
                  
                <NavDropdown.Item href="/?cat=saglik">SAĞLIK</NavDropdown.Item>
                <NavDropdown.Item href="/?cat=finans">FİNANS</NavDropdown.Item>
                <NavDropdown.Item href="/?cat=seyehat">SEYEHAT</NavDropdown.Item>
                <NavDropdown.Item href="/?cat=turizm">TURİZM</NavDropdown.Item>
                <NavDropdown.Item href="/?cat=kultursanat">KÜLTÜR SANAT</NavDropdown.Item>
                <NavDropdown.Item href="/?cat=otomobil">OTOMOBİL</NavDropdown.Item>

              </NavDropdown>
              
            </Nav>
            <Nav>
             
              {isLoggedIn && (
                
                <Nav.Link href='/habergfyazz'  className='cikisyap'>Yeni Haber</Nav.Link>
                
              )}
               {isLoggedIn && (
                
                <Nav.Link href='/' onClick={handleLogout} className='cikisyap'>Çıkış Yap</Nav.Link>
                
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> 
      <br />
      <Nav variant="tabs" defaultActiveKey="/home" className='ikiheadarkaplan justify-content-center navbar-expand sticky-top' style={{  gap: '0px', fontSize: '14', flexWrap: 'nowrap', backgroundColor: 'white' }}>
        <Nav.Item>
          <Nav.Link href="/?cat=sondakika">
            <span role="img" aria-label="Exclamation">❗</span> SON DAKİKA
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="/?cat=guncelhaber">GÜNCEL HABER</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/?cat=yerelhaber" >YEREL HABER</Nav.Link>
        </Nav.Item>
      </Nav>
      <br />
      <br />

     
    </>
  );
}

export default App;
