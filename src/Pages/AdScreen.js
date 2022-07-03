import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Col, Container, FloatingLabel, Form, ListGroup, ListGroupItem, Row, Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteAdAction, getAd } from '../actions/adActions';
import moment from 'moment'
import SameTypeAds from '../Components/SameTypeAds';
import { USER_CONTACT_RESET } from '../constants/accountContstants';
import { contactUser } from '../actions/accountActions';
import { AD_DELETE_RESET, AD_UPDATE_SELECT } from '../constants/addConstants';
import { BASKET_REMOVE } from '../constants/basketConstants';
import { apiUrl } from '../helper';

const AdScreen = () => {
  const { id } = useParams();

  const navigate = useNavigate()

  const dispatch = useDispatch();

  const singleAd = useSelector(state => state.singleAd);
  const { loading, error, ad } = singleAd;
  
  const userLogin = useSelector(s => s.userLogin);
  const { userInfo } = userLogin

  const userContact = useSelector(state => state.userContact);
  const { loading: contactLoading, success: contactSuccess } = userContact;
  
  const deleteAd = useSelector(state => state.deleteAd);
  const { loading: deleteLoading, success: deleteSuccess } = deleteAd;

  const basket = useSelector(s => s.basket)
  const { items } = basket

  const [selected, setSelected] = useState('');
  const [contact, setContact] = useState(false);

  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  const contactHandler = (e) =>{
    e.preventDefault();
    if(validate())
      dispatch(contactUser(ad.appUserId, subject, content))
  }
  const [err, setErr] = useState({ 
    subError: '', 
    conError: ''
  })

  function validate() {
    let subError = "";
    let conError = "";
    
    if (!subject) {
      subError = "Tema poruke ne sme biti prazna";
    }

    if (!content) {
      conError = "Sadržaj poruke ne sme biti prazan";
    }

    if (subError || conError) {
      setErr({ subError, conError });
      return false;
    }
    
    setErr({ 
      subError: '', 
      conError: '', 
    })

    return true;
  }

  const removeAd = (id) =>{
    if(window.confirm('Da li ste sigurni?'))
      dispatch(deleteAdAction(id));
      if(items.some(n => n.ad.id === id)){
        dispatch({
          type: BASKET_REMOVE,
          payload: id
        })
      }
  }

  const editAd = (ad) =>{
    dispatch({
      type: AD_UPDATE_SELECT,
      payload: ad
    })
    navigate(`/kreiraj-oglas/?updateId=${ad.id}`)
  }

  const openContact = () =>{
    if(userInfo)
      setContact(true)
    else 
      navigate('/prijava')
  }

  useEffect(()=>{
    // if(error == ''){
    //   navigate('/404')
    // }
    // dispatch({
    //   type: GET_SINGLE_AD_RESET
    // })
  },[dispatch, error])

  useEffect(()=>{
    if(deleteSuccess){
      dispatch({
        type: AD_DELETE_RESET
      })
      navigate('/svi-oglasi')
    }
  },[deleteSuccess, dispatch, navigate])

  useEffect(()=>{
    if(contactSuccess){
      setContact(false)
      dispatch({
        type: USER_CONTACT_RESET
      })
      setContent('')
      setSubject('')
    }
  
    dispatch(getAd(id));
    
  },[dispatch, id, contactSuccess])

  return (
    <Container fluid className='pt-7 px-0 bg-dark'>
      {deleteLoading && 
        <Container fluid className='overlay d-flex align-items-center justify-content-center'>
          <Spinner animation="border" variant="warning"/>
        </Container>
      }
      {contact ? 
        <Container fluid className='overlay d-flex align-items-center justify-content-center'>
          {!contactLoading ?
            <div className='bg-light p-4 rounded'>
                <h5 className='px-2'>Molimo Vas da unesete temu i sadržaj poruke:</h5>
                <Form onSubmit={contactHandler}>
                  <FloatingLabel
                    label="Tema poruke"
                    className=" p-0"
                  >
                    <Form.Control value={subject} onChange={e => {setSubject(e.target.value)}} size="xs" type="text" placeholder="E-mail adresa" />
                  </FloatingLabel>
                  {err.subError ? 
                    <div className='d-flex justify-content-center'>
                      <Form.Text className='text-start ps-1 w-100 text-danger p-0 m-0'>
                          {err.subError}
                      </Form.Text>
                    </div> : ''
                  }
                  <FloatingLabel
                    label="Sadržaj poruke"
                    className="mt-3 p-0"
                  >
                      <Form.Control 
                        as="textarea"
                        placeholder="Podsetnik"
                        style={{ height: '150px' }} size="xs"
                        value={content} onChange={e => {setContent(e.target.value)}}
                      />
                  </FloatingLabel>
                  {err.conError ?
                    <div className='d-flex justify-content-center'>
                      <Form.Text className='text-start w-100 text-danger ps-1 p-0 m-0'>
                          {err.conError}
                      </Form.Text>
                    </div> : ''
                  }
                  <input type='submit' value='Pošalji poruku' className='btn btn-warning w-100 mt-3 my-2'/>
                </Form>
                <button 
                  onClick={() => {
                    setContact(false)
                    setErr({ 
                      subError: '', 
                      conError: '', 
                    })
                  }} 
                  className='btn w-100 btn-danger'
                >
                  Prekini slanje
                </button>
            </div> 
            :
            <div className='bg-light p-5 rounded'>Ucitavanje</div>}
        </Container>
        : 
        ''
      }
      {loading ? 
        <div className='d-flex justify-content-center height-min-pt-header-new align-items-center'>
          <Spinner animation="border" variant="warning"/>
        </div> 
        : 
        error ? 
          <div className='h-50-vh py-1 px-5 m-0 bg-404 flex-column center align-items-start'>
            <h2 className='text-light pt-3 pb-0 m-0'>Greška 404!</h2>
            <h5 className='text-light pb-3 pt-0 m-0'>{error}</h5>
          </div>
          :
          <Container fluid className='py-5 px-2 px-md-5 pt-md-3 text-light'>
            {/* <h1 className='text-white'>{ad.appUserId}</h1> */}
            <Row className='row-overflow gx-0'>
              <p className='text-start m-0 p-0 px-3 px-md-2 pb-1 low-visibility'>* U slučaju zloupotrebe objavljenih slika ili kršenja autorskih prava, korisnik gubi pravo upotrebe sistema.</p>
              <Col md={6} className='pb-4 pb-md-0'>
                {ad && <img alt='ok' className='w-100 mainImg' src={`${apiUrl}/Images/${selected ? selected : ad.titlePath}`}></img>}
              </Col>
              <Col md={2} className='image-scroll mb-5 mb-md-0 p-1 m-0'>
                {ad.images.map(n =>  
                  <img key={n.id} alt={id} onClick={() => setSelected(n.path)} className={`w-100 mx-1 mx-md-0 mb-md-2 ${selected === n.path ? 'selectedImg border-warning' : ''}`} height={'125px'} src={`${apiUrl}/Images/${n.path}`}></img>
                )}
                <h6 className='text-center pt-3 px-5 px-md-0'>Nije dostupno više slika.</h6>
              </Col>
              <Col className='bg-dark ps-md-5 m-0'>
                <ListGroup variant='flush'>
                  <ListGroupItem className='text-left pb-1 text-start bg-dark text-light border-bottom border-light'>
                    <h3 className='text-warning'>{ad.name}</h3>
                    <h5 className='text-muted'>Objavljeno: {moment(ad.created).format("DD.MM.yyyy.")}</h5>
                  </ListGroupItem>

                  <ListGroupItem className='text-left pb-1 text-start bg-dark text-light border-bottom border-light'>
                    <h5 className='text-warning pb-2 text-uppercase'>Opšte informacije:</h5>
                    <h6 className='d-flex justify-content-between'>Tip nekretnine: <span className='ms-auto'>{ad.type}</span></h6>
                    <h6 className='d-flex justify-content-between'>Lokacija: <span className='ms-auto'>{ad.location}</span></h6>
                    <h6 className='d-flex justify-content-between'>Kvadratura: <span className='ms-auto'>{ad.size} &#13217;</span></h6>
                  </ListGroupItem>
                  
                  <ListGroupItem className='text-left pb-1 text-start bg-dark text-light border-bottom border-light'>
                    <h5 className='text-warning pb-2 text-uppercase'>Detalji nekretnine:</h5>
                    <h6 className='d-flex justify-content-between'>Ukupno soba: <span className='ms-auto'>{ad.rooms}</span></h6>
                    <h6 className='d-flex justify-content-between'>Broj kupatila: <span className='ms-auto'>{ad.bathrooms}</span></h6>
                    <h6 className='d-flex justify-content-between'>Parking: <span className='ms-auto'>{ad.parkingSize > 0 ? `Da (${ad.parkingSize})` : 'Ne'}</span></h6>
                    <h6 className='d-flex justify-content-between'>Tip gradnje: <span className='ms-auto'>{ad.propState}</span></h6>
                  </ListGroupItem>
                  
                  <ListGroupItem className='text-left pb-1 text-start bg-dark text-light border-bottom border-light'>
                    <h5 className='text-warning pb-2 text-uppercase'>Oprema:</h5>
                    <h6 className='d-flex justify-content-between'>Dodatna oprema: <span className='ms-auto'>{ad.standardEquipment}</span></h6>
                    <h6 className='d-flex justify-content-between'>Tehnička oprema: <span className='ms-auto'>{ad.techEquipment}</span></h6>
                    <h6 className='d-flex justify-content-between'>Sigurnosna oprema: <span className='ms-auto'>{ad.securityEquipment}</span></h6>
                  </ListGroupItem>
                  
                  <ListGroupItem className='text-left d-flex justify-content-between pb-1 text-start bg-dark text-light border-bottom border-light'>
                    <h5>Cena nekretnine:</h5>
                    <h5 className='text-warning'>{ad.price}.00 &euro;</h5>
                  </ListGroupItem>
                </ListGroup>
              </Col>
              <Col md={12} className='px-2 py-4 px-md-5 py-md-5'>
                <div className='d-flex justify-content-center px-0 px-md-5 mb-4'>
                  <button className='btn btn-warning w-25' onClick={openContact}>Kontaktiraj vlasnika</button>
                  <Link to={`/korisnik/${ad.appUserId}`} className='btn btn-warning ms-1 ms-md-2 w-25'>Pregled vlasnika</Link>
                  {userInfo && userInfo.role[0] === "Admin" ? 
                    <>
                      <button className='btn btn-warning w-25 ms-1 ms-md-2' onClick={() => editAd(ad)}>Izmeni</button>
                      <button className='btn btn-danger ms-1 ms-md-2 w-25' onClick={() => removeAd(ad.id)}>Ukloni</button>
                    </>
                    : 
                    ''
                  }
                </div>
                <h4 className='text-warning text-start pt-3 pt-md-0 ps-1 ps-md-5 pb-2'>Opis nekretnine:</h4>
                <h5 className='px-1 px-md-5 text-start'>{ad.description}</h5>
              </Col>
            </Row>
            <SameTypeAds thisId={ad.id} type={ad.type}/>
          </Container>
      }
    </Container>
  )
}

export default AdScreen