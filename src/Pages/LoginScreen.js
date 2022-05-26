import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { login } from '../actions/accountActions';
import { BASKET_SET } from '../constants/basketConstants';

const LoginScreen = () => {
    const navigate = useNavigate();

    const [params] = useSearchParams();
    const [init, setInit] = useState(params.get('verification') ? true : null);
    const [id, setId] = useState(params.get('user') ? params.get('user') : null);
    const [token, setToken] = useState(params.get('token') ? params.get('token') : null);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const userLogin = useSelector(s => s.userLogin);
    const { userInfo, error } = userLogin

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(login(username, password))
    }

    const closeVerification = () =>{
        setInit(false)
        navigate('/prijava')
    }

    const closeVerificationSuccess = () =>{
        setToken(null)
        navigate('/prijava')
    }

    useEffect(()=>{
        if(userInfo){
            dispatch({
                type: BASKET_SET,
                payload: userInfo.basket.items
            })

            localStorage.setItem('items', JSON.stringify(userInfo.basket.items)); 

            navigate('/');
        }
    },[dispatch, error, userInfo, navigate])

  return (
        <Container fluid className='bg-dark'>
            {token ? 
                <Container fluid className='overlay d-flex align-items-center justify-content-center'>
                    <div className='bg-light p-5 rounded'>
                        <h4 className='p-0 m-0'>Verifikacija putem mejla je uspela!</h4>
                        <button onClick={closeVerificationSuccess} className='btn w-50 btn-warning mt-4'>Nastavi</button>
                    </div>
                </Container>
                : 
                ''
            }
            {init ? 
                <Container fluid className='overlay d-flex align-items-center justify-content-center'>
                    <div className='bg-light p-5 rounded'>
                        <h4 className='p-0 m-0'>Verification link has been sent to your mail!</h4>
                        <button onClick={closeVerification} className='btn w-50 btn-warning mt-4'>Potvrdi</button>
                    </div>
                </Container>
                : 
                ''
            }
            <Row>
                <Col md='4'></Col>
                <Col md='4' className='d-flex mh-100 align-items-center justify-content-center flex-column px-5'>
                    <Container className=''>
                        <form onSubmit={submitHandler} className='w-100 text-light d-flex justify-content-center align-items-start flex-column'>
                            <label className=''>Korisničko ime</label>
                            <input className='w-100 rounded p-1' onChange={(e) => setUsername(e.target.value)} value={username} type='text'/>
                            <label className='mt-2'>Šifra</label>
                            <input className='w-100 rounded p-1' onChange={(e) => setPassword(e.target.value)} value={password} type='password'/>
                            <input type='submit' className='btn-warning btn mt-4 my-2 w-100' value={'Prijavi se'}/>
                        </form>
                        <button className='text-warning btn w-100 text-decoration-underline'>Zaboravili ste šifru?</button>
                    </Container>
                    <Container className='px-4'>
                        <Container className='border py-4 rounded border-warning my-2 d-flex align-items-center flex-column justify-content-center'>
                            <h6 className='text-warning m-0 p-0'>Nemate nalog na sistemu?</h6>
                            <Link className='text-warning' to='/registracija'><h5 className=' m-0 p-0'>Registrujte se sada!</h5></Link>
                        </Container>
                    </Container>
                </Col>
                <Col md='4'></Col>
            </Row>
        </Container>
  )
}

export default LoginScreen