import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getSameTypeAds } from '../actions/adActions'
import Ad from './Ad'

const SameTypeAds = ({type, thisId}) => {
  const dispatch = useDispatch();

  const sameTypeAds = useSelector(s => s.sameTypeAds);
  const { loading, ads } = sameTypeAds;

  useEffect(()=>{
    dispatch(getSameTypeAds(type, thisId));
    // console.log(ads)
  },[dispatch, thisId, type])

  return (
      <Container className='no-shadow py-1 bg-dark' id='novi'>
          <h4 className='text-uppercase pt-3 text-warning text-start'>Slični oglasi:</h4>
          <Row className='mb-5'>
            {loading ? <h3 className='text-white'>ucitavanje</h3> : ads.map(n => 
              <Col key={n.id} md='3' className='px-4 py-2 px-md-2 py-md-2 '>
                <Ad shadow={false} ad={n}/>
              </Col>
            )}
          </Row>
      </Container>
  )
}

export default SameTypeAds