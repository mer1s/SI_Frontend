import React, { useEffect, useState } from 'react'
import { Button, Container, FloatingLabel, Form, FormControl, InputGroup, Row, Spinner } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { contactUser, deleteUserAction, listUsers } from '../actions/accountActions'
import { apiUrl } from '../helper'
import { FiMail, FiSearch, FiX } from 'react-icons/fi'
import { ADMIN_DELETE_USER_RESET, USER_CONTACT_RESET } from '../constants/accountContstants'

const AllUsersScreen = () => {
    const [username, setUsername] = useState(' ')

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [selectedId, setId] = useState(0)
    const [contact, setContact] = useState(false)

    const userContact = useSelector(state => state.userContact);
    const { loading: contactLoading, error: contactError, success: contactSuccess } = userContact;

    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');

    const userLogin = useSelector(s => s.userLogin)
    const { userInfo } = userLogin
    
    const allUsers = useSelector(s => s.allUsers)
    const { users, loading } = allUsers
    
    const deleteUser = useSelector(s => s.userDelete)
    const { success } = deleteUser

    const removeUser = (id) =>{
        if(id === userInfo.id)
          navigate('/profil')
        if(window.confirm("Da li ste sigurni?")){
            dispatch(deleteUserAction(id))
        }
    }

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
    const submitHandler = e =>{
        e.preventDefault()
        dispatch(listUsers(username))
    }

    const selectToSend = (id) =>{
        setId(id)
        setContact(true)
    }

    const contactHandler = (e) =>{
        e.preventDefault();
        if(validate())
          dispatch(contactUser(selectedId, subject, content))
      }
      const [err, setErr] = useState({ 
        subError: '', 
        conError: ''
      })

    useEffect(()=>{
      if(contactSuccess || contactError){
        setContact(false)
        dispatch({
          type: USER_CONTACT_RESET
        })
        setContent('')
        setSubject('')
      }
      if(success){
        dispatch({
          type: ADMIN_DELETE_USER_RESET
        })
      }
        dispatch(listUsers(username, userInfo.id));
        // eslint-disable-next-line
    },[dispatch,userInfo.id, navigate, userInfo.role, success,contactSuccess,contactError])

    useEffect(()=>{
        if(userInfo.role[0] !== "Admin")
            navigate('/404')
    },[navigate, userInfo.role])

  return (
    <>
    <Container fluid className=' pt-header bg-light'>
        {loading ? 
            <div className='d-flex justify-content-center h-40vh align-items-center'>
            <Spinner animation="border" variant="warning"/>
            </div> 
            :
            <>{contact ? 
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
                      <Container fluid className='overlay d-flex align-items-center justify-content-center'>
                        <Spinner animation="border" variant="warning"/>
                      </Container>
            
                    }
                </Container>
                : 
                ''
              }
                <h4 className='pt-5 pb-3'>Upravljanje Korisničkim nalozima:</h4>
                <Container className='pe-0'>
                    <div className='m-auto d-flex justify-content-center pb-5 mb-2'>
                    <Form onSubmit={submitHandler} className='w-40-md d-flex align-items-center px-3 px-md-0 flex-column'>
                        <p className='w-100 text-start p-0 m-0'>Unesite korisničko ime za pretragu</p>
                        <InputGroup className="mb-1">
                            <FormControl
                              onChange={e => setUsername(e.target.value)}
                              value={username}
                              placeholder="Korisničko ime"
                              aria-label="Korisničko ime"
                              aria-describedby="basic-addon2"
                            />
                            <Button type='submit' variant="warning" id="button-addon2">
                                Pretraži
                            </Button>
                        </InputGroup>
                        </Form>
                    </div>
                    <Row className='p-0 m-0 pb-5'>
                        {users.map(n => 
                          <div key={n.id} className="col-lg-3 userCard px-4 px-md-1 col-md-6 mt-4 mb-3 mb-md-0">
                            <div className="card shadow-sm border-0 rounded">
                              <div className="card-body p-0">
                                <Link to={`/korisnik/${n.id}`}>
                                  {n.imagePath && <img src={`${apiUrl}/Images/${n.imagePath}`} alt="" height={'200px'} className="w-100 card-img-top"/>}
                                </Link>
                                <div className="p-4">
                                  <h5 className="mb-0">{n.firstName} {n.lastName}</h5>
                                  <p className="small m-0 p-0 text-muted">@{n.userName}</p>
                                  <ul className="social mb-0 list-inline mt-3">
                                    <li className="list-inline-item m-0">
                                      <button onClick={()=> removeUser(n.id)} className='btn userCardBtn rounded-circle btn-danger'><FiX/></button> 
                                    </li>
                                    <li className="list-inline-item m-0 mx-2">
                                      <button onClick={()=> selectToSend(n.id)} className='btn userCardBtn rounded-circle btn-light border-light border-x-none'><FiMail/></button> 
                                    </li>
                                    <li className="list-inline-item m-0">
                                      <Link to={`/korisnik/${n.id}`} className='btn userCardBtn btn-warning rounded-circle'>
                                        <FiSearch/>
                                       </Link>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                            // <Col md='3' className='p-0 m-0 py-2 px-1 align-items-center d-flex justify-content-center align-items-center flex-column'>
                                
                            //     <div className='bg-card rounded w-100 h-100 pt-4'>
                            //       <Link to={`/korisnik/${n.id}`}>
                            //         {n.imagePath && <img className='mb-2' style={{width:'200px', height:'200px'}} alt={n.imagePath} src={`${apiUrl}/Images/${n.imagePath}`}/>}
                            //       </Link>
                            //       <h4 className='pt-2  pb-0 mb-0'>{n.firstName} {n.lastName}</h4>
                            //       <h5 className='m-0 p-0 mb-3 text-warning'><span className='text-dark'>@</span>{n.userName}</h5>
                            //       <ButtonGroup className='w-75 pb-4'>
                            //           <button onClick={()=> removeUser(n.id)} className='btn btn-danger px-3 pt-1'><FiX/></button> 
                            //           <button onClick={()=> selectToSend(n.id)} className='btn btn-light border-light border-x-none px-3 pt-1'><FiMail/></button> 
                            //           <Link to={`/korisnik/${n.id}`} className='btn btn-warning px-3 pt-1'>
                            //             <FiSearch/>
                            //           </Link>
                            //       </ButtonGroup>
                            //     </div>
                            // </Col>
                        )}   
                    </Row>
                </Container>
            </>
        }
    </Container>
    </>
  )
}

export default AllUsersScreen