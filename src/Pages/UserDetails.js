import React, { useEffect, useState } from 'react'
import { Col, Container, FloatingLabel, Form, Row, Spinner } from 'react-bootstrap';
import { FiAlertTriangle, FiMail } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { contactUser } from '../actions/accountActions';
import { getSameOwnerAds } from '../actions/adActions';
import Ad from '../Components/Ad';
import { USER_CONTACT_RESET } from '../constants/accountContstants';
import { apiUrl } from '../helper';

const UserDetails = () => {
    const navigate = useNavigate()
  const { id } = useParams();
    const dispatch = useDispatch()

    const sameOwnerAds = useSelector(s => s.sameOwnerAds)
    const {loading, user, ads, success} = sameOwnerAds

    const [contact, setContact] = useState(false)

    const userContact = useSelector(state => state.userContact);
    const { loading: contactLoading, success: contactSuccess } = userContact;

    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');

    const userLogin = useSelector(s => s.userLogin)
    const { userInfo } = userLogin

    const contactHandler = (e) =>{
        e.preventDefault();
        if(validate())
            dispatch(contactUser(user.id, subject, content))
    }
    const openContact = () =>{
        if(userInfo)
          setContact(true)
        else 
          navigate('/prijava')
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

    useEffect(()=>{
        if(id === userInfo.id){
          navigate('/profil')
        }

        if(contactSuccess){
          dispatch({
            type: USER_CONTACT_RESET
          })
          setContact(false) 
          setSubject('') 
          setContent('') 
        } 

        dispatch(getSameOwnerAds(id))

    },[dispatch, navigate, success, id, contactSuccess, userInfo.id])

  return (
    <div className="container-fluid pe-0  mt-5 pt-5 mb-5">
        {loading ? 
            <div className='d-flex justify-content-center h-40vh align-items-center'>
            <Spinner animation="border" variant="warning"/>
            </div> 
            :
            <>{contact ? 
                <Container fluid className='overlay d-flex align-items-center justify-content-center'>
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
                          {!contactLoading ? <input type='submit' value='Pošalji poruku' className='btn btn-warning w-100 mt-3 my-2'/> :<Spinner animation="border" variant="warning"/>}
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
                </Container>
                : 
                ''
              }
                <div className="px-md-5">
                <div className="px-md-5">
                <div className="px-3 px-md-4">
                <div className="row ">
                    <div className="col-md-4 col-lg-5 p-0 m-0">
                        {user.imagePath && <img style={{width:'100%', height:'352px'}} alt={user.imagePath} src={`${apiUrl}/Images/${user.imagePath}`}/>}
                    </div>
                    <div className="col-md-8 p-0 h-100 col-lg-7">
                        <div className="d-flex h-100 flex-column">
                            <div className="d-flex flex-row justify-content-between align-items-center flex-column p-5 bg-dark text-white">
                                <h3 className="display-5 p-0 m-0">{user.firstName} {user.lastName}</h3>
                                <h6 className='p-0 m-0 text-warning'>@ {user.userName}</h6>
                            </div>
                            <div className="p-3 pt-4 bg-black text-white">
                                <h6>{user.mail}</h6>
                            </div>
                            {userInfo && user.verified ?
                            <div className="d-flex flex-row text-white">
                                <div className="p-4 bg-primary text-center skill-block-static">
                                    <h4>{ads.length}</h4>
                                    <h6>Broj oglasa</h6>
                                </div>
                                <div onClick={openContact} className="p-4 bg-warning text-center skill-block">
                                    <h4><FiMail/></h4>
                                    <h6>Kontaktiraj korisnika</h6>
                                </div>
                                <div onClick={()=> navigate(`/report/${user.id}`)} className="p-4 bg-danger text-center skill-block">
                                    {/* <h4>Prijavi neprimeran sadržaj</h4> */}
                                    <h4><FiAlertTriangle/></h4>
                                    <h6>Prijavi korisnika</h6>
                                </div>
                            </div>
                            :
                             <div className="d-flex flex-row text-white">
                                <div className="p-4 bg-danger text-center w-100">
                                    <h4 className='p-0 py-3 m-0'>Korisnik još uvek nije verifikovan</h4>
                                </div>
                              </div>
                            }
                        </div>
                    </div>
                </div>
                {user.verified && (ads.length > 0 ? <h4 className='my-5 pt-1 text-start'>Oglasi korisnika {user.firstName} {user.lastName}</h4>:<h4  className='my-5 pt-1 text-start'>Korisnik trenutno nema objavljenih oglasa</h4>)}
                <Container>
            <Row>
              <Col md='12' className='px-0 px-md-2'>
                <Row>
                    {user.verified && (ads.length > 0 ? ads.map(n => 
                        <Col key={n.id} md='3' className='px-3 px-md-1 p-0 m-0'>
                            <Ad ad={n}/>
                        </Col>
                    ) 
                  : '')}
                </Row>
              </Col>
            </Row>
          </Container>
    </div>
    </div>
    </div>
            </>
        }
    </div>
    )
}

export default UserDetails