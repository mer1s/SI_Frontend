import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getSameTypeAds } from '../actions/adActions'
import { apiUrl } from '../helper'

const SameTypeAds = ({type}) => {
  const dispatch = useDispatch();

  const sameTypeAds = useSelector(s => s.sameTypeAds);
  const { loading, ads, error } = sameTypeAds;

  useEffect(()=>{
    dispatch(getSameTypeAds(type));
    // console.log(ads)
  },[dispatch])

  return (
      <Container fluid className='py-1 bg-dark' id='novi'>
          <h4 className='text-uppercase pt-3 text-warning text-start'>Slični oglasi:</h4>
          <Row className='mb-5'>
            {loading ? '' : ads.map(n => 
              <Col key={n.id} md='3' className='p-2 newAdCard'>
                <Link to={`/oglas/${n.id}`} className='text-decoration-none'>
                  {n.titlePath && <img alt={n.name} className='w-100' height={'335px'} src={`${apiUrl}/Images/${n.titlePath}`}></img>}
                  <h4 className='pt-2 text-light ps-2'>{n.name}, <span style={{fontSize:'1.25rem'}} className='text-gray'>{n.location}</span></h4>
                </Link>
              </Col>
            )}
          </Row>
      </Container>
  )
}

export default SameTypeAds