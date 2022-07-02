import React, { useEffect, useState } from 'react'
import { Col, Container, FloatingLabel, Form, Row, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { login, resetPw} from '../actions/accountActions';
import { USER_PASS_RESET_RESET_SUCCESS, USER_REG_RESET } from '../constants/accountContstants';
import { BASKET_SET } from '../constants/basketConstants';

const LoginScreen = () => {
    const navigate = useNavigate();

    const [fp, setFP] = useState(false)

    const [params] = useSearchParams();
    const [init, setInit] = useState(params.get('verification') ? true : null);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [err, setErr] = useState({ 
        nameError: '', 
        passError: ''
    })
    
    const [mail, setMail] = useState('');

    const dispatch = useDispatch();

    const userLogin = useSelector(s => s.userLogin);
    const { userInfo, error, loading: loginLoading } = userLogin

    const passReset = useSelector(s => s.passwordReset);
    const { loading, error: resetErr, success } = passReset

    const submitHandler = (e) =>{
        e.preventDefault();
        if(validate())
            dispatch(login(username, password))
    }

    const closeVerification = () =>{
        setInit(false)
        dispatch({
            type: USER_REG_RESET
        })
        navigate('/prijava')
    }

    const resetHandler = (e) =>{
        e.preventDefault();
        dispatch(resetPw({mail:mail}))
        // setFP(false)
    }

    const showForgottenPass = () =>{
        setFP(true)
    }
    
    function validate() {
        let nameError = "";
        let passError = "";
        
        if (!username) {
            nameError = "Password field is required";
        }

        if (!password) {
            passError = "Potvrdite šifru";
        }

        if (passError || nameError) {
          setErr({ nameError, passError });
          return false;
        }
        
        setErr({ 
            nameError: '', 
            passError: '', 
        })

        return true;
    }

    useEffect(()=>{
        if(success){
            setFP(false)
            dispatch({
                type: USER_PASS_RESET_RESET_SUCCESS
            })
            alert('Molimo Vas Proverite poštu.')
        }

        if(userInfo){
            dispatch({
                type: BASKET_SET,
                payload: userInfo.basket.items
            })

            localStorage.setItem('items', JSON.stringify(userInfo.basket.items)); 

            navigate('/');
        }

        // if(error) console.log(error)

    },[dispatch, error, userInfo, navigate, success])

  return (
        <Container fluid className='bg-dark'>
            {fp ? 
                <Container fluid className='overlay d-flex align-items-center justify-content-center'>
                        <div className='bg-light py-5 px-4 px-md-5 rounded'>
                            <h5 className='p-0 m-0'>{resetErr ? <span className='px-5'>{resetErr}</span> : <span>Molimo Vas da unesete Vašu mejl adresu<br></br>kako bi sistem generisao šifru za Vas:</span>}</h5>
                            <form onSubmit={resetHandler}>
                                <FloatingLabel
                                    label="Vaša mejl adresa"
                                    className="mb-3 p-0 w-100"
                                >
                                    <Form.Control value={mail} size="xs" onChange={(e)=> setMail(e.target.value)} type="text" className='my-4' placeholder="Korisničko ime" />
                                </FloatingLabel>
                                {loading ? <div className='center w-100 pb-2'><Spinner animation="border" variant="warning"/></div>:<input type={'submit'} className='btn btn-warning w-100 mt-2 rounded' value={'Potvrdi'}/>}
                            </form>
                            <button onClick={() => setFP(false)} className='btn btn-danger w-100 rounded mt-2'>Odustani</button>
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
                        <form onSubmit={submitHandler} className='w-100 d-flex justify-content-center align-items-start flex-column'>
                            <h5 className='text-light text-center w-100 pb-2 mb-3 border-bottom border-warning'> {error ? <span className='text-danger'>{error}</span> : 'Unesite kredencijale'}</h5>
                            {err.nameError ? 
                                <Form.Text className='text-start text-danger p-0 m-0 mb-1'>
                                    {err.nameError}
                                </Form.Text> : ''
                            }
                            <FloatingLabel
                                label="Korisničko ime"
                                className="mb-3 p-0 w-100"
                            >
                                <Form.Control size="xs" onChange={(e)=> setUsername(e.target.value)} type="text" placeholder="Korisničko ime" />
                            </FloatingLabel>
                            {err.passError ? 
                                <Form.Text className='text-start text-danger p-0 m-0 mb-1'>
                                    {err.passError}
                                </Form.Text> : ''
                            }
                            <FloatingLabel
                                label="Šifra"
                                className="mb-3 p-0 w-100"
                            >
                                <Form.Control size="xs" onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="Šifra" />
                            </FloatingLabel>
                            {loginLoading ? <div className='center w-100 pb-2'><Spinner animation="border" variant="warning"/></div> :<input type='submit' className='btn-warning btn py-3 mb-2 w-100' value={'Prijavi se'}/>}
                        </form>
                        <button className='text-warning btn w-100 text-decoration-underline' onClick={showForgottenPass}>Zaboravili ste šifru?</button>
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