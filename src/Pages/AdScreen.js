import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Col, Container, ListGroup, ListGroupItem, Row, Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAd } from '../actions/adActions';
import moment from 'moment'
import SameTypeAds from '../Components/SameTypeAds';
import SameOwnerAds from '../Components/SameOwnerAds';

const AdScreen = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const singleAd = useSelector(state => state.singleAd);
  const { loading, error, ad } = singleAd;

  const [selected, setSelected] = useState('');
  
  useEffect(()=>{
    dispatch(getAd(id));
  },[dispatch, id])

  return (
    <Container fluid className='pt-header bg-dark'>
      {loading ? 
        <div className='d-flex justify-content-center height-min-pt-header align-items-center'>
          <Spinner animation="border" variant="warning"/>
        </div> : error ? 'error' 
        : 
        error ? <h3>{error}</h3> :
      <Container fluid className='p-5 pt-1 text-light'>
        <Row>
          <Col md={6}>
            {ad && <img alt='ok' className='w-100 mainImg' src={`https://localhost:7007/Images/${selected ? selected : ad.titlePath}`}></img>}
          </Col>
          <Col md={2} className='image-scroll'>
            {ad.images.map(n =>  
              <img key={n.id} alt='ok' onClick={() => setSelected(n.path)} className={`w-100 mb-2 ${selected === n.path ? 'selectedImg border-warning' : ''}`} height={'125px'} src={`https://localhost:7007/Images/${n.path}`}></img>
            )}
            <h6 className='text-center pt-3'>Nije dostupno više slika.</h6>
          </Col>
          <Col className='bg-dark ps-5'>
            <ListGroup variant='flush'>
              <ListGroupItem className='text-left pb-1 text-start bg-dark text-light border-bottom border-light'>
                <h3 className='text-warning'>{ad.name}</h3>
                <h5 className='text-light'>Objavljeno: {moment(ad.created).format("DD.MM.yyyy.")}</h5>
              </ListGroupItem>

              <ListGroupItem className='text-left pb-1 text-start bg-dark text-light border-bottom border-light'>
                <h5 className='text-warning pb-2 text-uppercase'>Opšte informacije:</h5>
                <h6 className='d-flex justify-content-between'>Tip nekretnine: <span className='ms-auto'>{ad.type}</span></h6>
                <h6 className='d-flex justify-content-between'>Lokacija: <span className='ms-auto'>{ad.location}</span></h6>
                <h6 className='d-flex justify-content-between'>Kvadratura: <span className='ms-auto'>{ad.size} kv m</span></h6>
              </ListGroupItem>
             
             <ListGroupItem className='text-left pb-1 text-start bg-dark text-light border-bottom border-light'>
                <h5 className='text-warning pb-2 text-uppercase'>Detalji nekretnine:</h5>
                <h6 className='d-flex justify-content-between'>Ukupno soba: <span className='ms-auto'>{ad.rooms}</span></h6>
                <h6 className='d-flex justify-content-between'>Broj kupatila: <span className='ms-auto'>{ad.bathrooms}</span></h6>
                <h6 className='d-flex justify-content-between'>Parking: <span className='ms-auto'>{ad.parkingSize > 0 ? `Da (${ad.parkingSize})` : 'Ne'}</span></h6>
                <h6 className='d-flex justify-content-between'>Stanje nekretnine: <span className='ms-auto'>{ad.propState}</span></h6>
             </ListGroupItem>
             
             <ListGroupItem className='text-left pb-1 text-start bg-dark text-light border-bottom border-light'>
                <h5 className='text-warning pb-2 text-uppercase'>Oprema:</h5>
                <h6 className='d-flex justify-content-between'>Dodatna opremljenost: <span className='ms-auto'>{ad.standardEquipment}</span></h6>
                <h6 className='d-flex justify-content-between'>Tehnička opremljenost: <span className='ms-auto'>{ad.techEquipment}</span></h6>
                <h6 className='d-flex justify-content-between'>Sigurnosna opremljenost: <span className='ms-auto'>{ad.securityEquipment}</span></h6>
             </ListGroupItem>
             
             <ListGroupItem className='text-left d-flex justify-content-between pb-1 text-start bg-dark text-light border-bottom border-light'>
               <h5>Cena nekretnine:</h5>
               <h5 className='text-warning'>{ad.price}.00e</h5>
             </ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={12} className='p-5'>
            <h4 className='text-warning text-start ps-5 pb-2'>Opis nekretnine:</h4>
            <h5 className='px-5 text-start'>{ad.description}</h5>
          </Col>
        </Row>
        <SameTypeAds type={ad.type}/>
        <SameOwnerAds type={ad.id}/>
      </Container>
    }
    </Container>
  )
}

export default AdScreen