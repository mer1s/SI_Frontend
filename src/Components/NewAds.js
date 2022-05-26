import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getNewAds } from '../actions/adActions'
import { apiUrl } from '../helper'

const NewAds = () => {
  const dispatch = useDispatch();

  const newAds = useSelector(s => s.newAds);
  const { loading, ads, error } = newAds;

  useEffect(()=>{
    dispatch(getNewAds());
  },[dispatch])

  return (
      <Container fluid className='p-5 bg-dark' id='novi'>
          <h4 className='text-uppercase pt-3 text-warning text-start'>novi oglasi:</h4>
          <Row className='my-5'>
            {loading ? '' : error ? <h3 className='text-white text-start'>{error}</h3> : ads.map(n => 
              <Col key={n.id} md='3' className='p-2 newAdCard'>
                <Link to={`/oglas/${n.id}`} className='text-decoration-none'>
                  {n.titlePath && <img alt={n.name} className='w-100' height={'335px'} src={`${apiUrl}/Images/${n.titlePath}`}></img>}
                  <h4 className='pt-2 text-light ps-2'>{n.name}, <span style={{fontSize:'1.25rem'}} className='text-gray'>{n.location}</span></h4>
                </Link>
              </Col>
            )}
          </Row>
          <Link className='text-warning text-start' to={'/svi-oglasi'}><h5 className='pb-3'>Pogledajte sve</h5></Link>
      </Container>
  )
}

export default NewAds