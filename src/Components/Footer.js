import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Footer = () => {
  const userLogin = useSelector(s => s.userLogin)
  const {userInfo} = userLogin
  return (
    <Container fluid className='bg-light px-md-5'>
      <Container className='pt-3 bg-light px-5 d-flex align-items-center justify-content-center flex-column'>
        <Row className='pt-md-3 pt-5 pb-5 px-md-5 w-100'>
          <Col md='4' className='d-flex justify-content-center align-items-center flex-column'>
            <h1><span className='text-warning text-center'>Real</span>Estate</h1>
            <p className='m-0 p-0'>Tehnička podrška:<br></br>+381 62 826 4606</p>
          </Col>
          <Col className='text-center py-md-3 py-5 my-1' md='4'>
            <h5 className='border-bottom mx-md-5'>Mapa sajta</h5>
            <Link className='text-dark p-0 m-0' to='/'><p className='p-0 m-0'>Početna</p></Link>
            <Link className='text-dark p-0 m-0' to='/svi-oglasi'><p className='p-0 m-0'>Svi oglasi</p></Link>
            <Link className='text-dark p-0 m-0' to='/o-nama'><p className='p-0 m-0'>O nama</p></Link>
            {!userInfo && <Link className='text-dark p-0 m-0' to='/prijava'><p className='p-0 m-0'>Prijava</p></Link>}
            {!userInfo && <Link className='text-dark p-0 m-0' to='/registracija'><p className='p-0 m-0'>Registracija</p></Link>}
          </Col>
          <Col className='text-center  py-3'>
            <h5 className='border-bottom mx-md-5'>Kontakt</h5>
            <p className='p-0 m-0'>merisahmatovic@gmail.com</p>
            <p className='p-0 m-0'>meris.ahm</p>
            <p className='p-0 m-0'>+381 62 826 4606</p>
          </Col>
        </Row>
        <h6 className='border-top m-0 text-center w-100 w-md-75 py-2'>Copyright Ⓒ 2022 Meris Ahmatović - Sva prava zadržana</h6>
      </Container>
    </Container>
  )
}

export default Footer