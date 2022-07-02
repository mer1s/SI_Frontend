import axios from 'axios';
import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap';

const News = () => {
  useEffect(()=>{
    
  },[])

  return (
    <Container className='overflow-hidden py-5 mb-3 px-3 bg-dark h-all-ads rounded d-flex flex-column justify-content-center text-light'>
      <h4 className='ad-animation-1'>Naš posao je da Vaša nekretnina bude viđena!</h4>
      <h4 className='ad-animation-2 pt-4'>Zato postavite svoj oglas na</h4>
      <h4 className='ad-animation-3 bg-dark text-light rounded text-center pt-3 pb-3 my-4'><span className='text-warning'>Real</span>Estate.com</h4>
      <h4 className='ad-animation-4'>portalu za oglašavanje nekretnina u Srbiji koji raste nezaustavljivo!</h4>
    </Container>
  )
}

export default News