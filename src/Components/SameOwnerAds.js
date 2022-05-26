import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getSameOwnerAds } from '../actions/adActions'
import { apiUrl } from '../helper'

const SameOwnerAds = ({id}) => {
  const dispatch = useDispatch();

  const sameTypeAds = useSelector(s => s.sameTypeAds);
  const { loading, ads, error } = sameTypeAds;

  useEffect(()=>{
    dispatch(getSameOwnerAds(id));
    // console.log(ads);
  },[dispatch])

  return (
    <Container fluid className='pb-1 bg-dark' id='novi'>
        <h4 className='text-uppercase pt-3 text-warning text-start'>Oglasi istog prodavca:</h4>
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

export default SameOwnerAds