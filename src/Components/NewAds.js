import React, { useEffect } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getNewAds } from '../actions/adActions'
import Ad from './Ad'

const NewAds = () => {
  const dispatch = useDispatch();

  const newAds = useSelector(s => s.newAds);
  const { loading, ads, error } = newAds;

  useEffect(()=>{
    dispatch(getNewAds());
  },[dispatch])

  return (
    loading ? 
      <div className='py-5 bg-dark'>
        <Spinner animation="border" variant="warning"/>
      </div> 
      :
      error ? 
        <div id='novi' className='py-5 m-0 bg-dark center justify-content-center'>
          <h5 className='text-light w-100 px-5 py-5 text-start p-0 m-0'>{error}</h5>
        </div> 
        :
        ads.length > 0 ?
          <Container fluid className='p-5 px-md-5 px-4 bg-dark' id='novi'>
            <Container className='no-shadow' id='novi'>
                <h4 className='text-uppercase pt-3 text-warning text-start'>novi oglasi:</h4>
                <Row className='my-5'>
                  {ads.map(n => 
                    <Col key={n.id} md='3' className='p-2'>
                      <Ad ad={n}/>
                    </Col>
                  )}
                </Row>
                <Link className='text-warning text-start' to={'/svi-oglasi'}><h5 className='pb-3'>Pogledajte sve</h5></Link>
            </Container>
          </Container>
          :
          <div id='novi' className='py-5 px-5 m-0 bg-dark flex-column center align-items-start'>
            <h2 className='text-light pt-3 pb-0 m-0'>Trenutno nema objavljenih oglasa!</h2>
            <h5 className='text-light text-muted pb-3 pt-0 m-0'>Molimo Vas da proverite kasnije...</h5>
          </div>
  )
}

export default NewAds