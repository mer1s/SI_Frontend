
import React, { useEffect, useState } from 'react'
import { Col, Container, FloatingLabel, Form, FormGroup, Row, Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register } from '../actions/accountActions'
import { hasLower, hasSpec, hasUpper } from '../helpers'

const RegisterScreen = () => {
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const reg = useSelector(s => s.register)
    const { loading, success, error} = reg

    const [val, setVal] = useState({
        imageSrc : '',
        imageFile : null
    })

    const [err, setErr] = useState({ 
        nameError: '', 
        emailError: '', 
        passwordError: '' ,
        password2Error:'',
        hintError:'',
        firstnameError:'',
        lastnameError:''
    })

    const [username, setUsername] = useState('')
    const [pass1, setPass1] = useState('')
    const [pass2, setPass2] = useState('')
    const [mail, setMail] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [hint, setHint] = useState('')

    const submitHandler = (e) =>{
        e.preventDefault();

        if(validate()){

            const fd = new FormData() 
            fd.append("username", username);
            fd.append("password", pass1);
            fd.append("email", mail);
            fd.append("image", val.imageFile);
            fd.append("firstName", firstname);
            fd.append("lastName", lastname);
            fd.append("passwordHint", hint);

        

            dispatch(register(fd))
        }
    }
    
    function validate() {
        let nameError = "";
        let emailError = "";
        let passwordError = "";
        let password2Error = "";
        let hintError = "";
        let firstnameError = "";
        let lastnameError = "";

        if (username.length < 8) {
            nameError = "Korisničko ime mora sadržati minimum 8 karaktera";
        }
        if (!username) {
            nameError = "Potrebno je uneti korisničko ime";
        }

        // eslint-disable-next-line
        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if (!mail || reg.test(mail) === false) {
            emailError = "Potrebno je uneti validnu mejl adresu";
        }

        if (!hint) {
            hintError = "Potrebno je uneti podsetnik za šifru";
        }

        if (!hasLower(pass1)) {
            passwordError = "Šifra mora sadržati mala slova";
        }

        if (!hasSpec(pass1)) {
            passwordError = "Šifra mora sadržati najmanje jedan specijalni karakter (@, / ili slično)";
        }
        
        if (!hasUpper(pass1)) {
            passwordError = "Šifra mora sadržati velika slova";
        }

        if (pass1.length < 8) {
            passwordError = "Šifra mora imati minimalnu dužinu od 8 karaktera";
        }

        if (!pass1) {
            passwordError = "Potrebno je uneti šifru";
        }

        if (pass1 !== pass2) {
          password2Error = "Šifra i njena potvrda moraju biti identične";
        }

        if (!lastname || !firstname) {
            firstnameError = "Potrebno je uneti ime i prezime";
        }

        if (emailError || nameError || passwordError || password2Error || hintError || firstnameError || lastnameError) {
          setErr({ nameError, emailError, passwordError, password2Error, hintError, firstnameError,lastnameError });
          return false;
        }
        
        setErr({ 
            nameError: '', 
            emailError: '', 
            passwordError: '' ,
            password2Error:'',
            hintError:'',
            firstnameError:'',
            lastnameError:'',
        })

        return true;
    }

    const showPreview = e =>{
        if(e.target.files && e.target.files[0]){
            let imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x =>{
                setVal({
                    ...val,
                    imageFile,
                    imageSrc: x.target.result
                })
            }
            reader.readAsDataURL(imageFile);
        }
        else setVal({
            imageSrc : '',
            imageFile : null
        })
    }

    useEffect(()=>{
        if(success)
            navigate('/prijava/?verification=true')

    },[success, dispatch, error, navigate])

  return (
    <>
    <Container fluid>
        <Row>
            <Col md='8' className='mh-100 bg-light d-flex justify-content-center align-items-center'>
                <Form onSubmit={submitHandler} className='mh-100 d-flex justify-content-center align-items-center w-100 px-5'>
                    <Row>
                        <Col className='px-5 mh-100-50' md='5'>
                            <div className='h-100 center flex-column'>
                            {!val.imageSrc && <h5>Izaberite profilnu sliku</h5>}
                            {val.imageSrc && <img src={val.imageSrc} alt='' width='250px' height='250px' className='rounded-circle border rounded p-1 mt-2'/>}
                            <input className='form-control-file mt-2 py-2 w-50 text-dark' 
                                    accept='image/*'
                                    type='file' 
                                    onChange={showPreview}
                            /></div>
                        </Col>
                        <Col md='7' className='justify-content-center pe-0 pb-5 align-items-center'>
                            <FormGroup></FormGroup>
                            <FormGroup as={Row} className='pb-3'>
                                <h5 className='mb-3 pt-5 mt-5 text-start'>{error ? <span className='text-danger'>{error}</span> : 'Ispunite polja potrebna za registraciju'}<br></br></h5>
                                    {err.firstnameError ? 
                                        <Form.Text className='text-start text-danger p-0 m-0'>
                                            {err.firstnameError}
                                        </Form.Text> : ''
                                    }
                                    {err.lastnameError ? 
                                        <Form.Text className='text-start text-danger p-0 m-0'>
                                            {err.lastnameError}
                                        </Form.Text> : ''
                                    }
                                <Col md='6' className='pe-md-1 g-0'>
                                    <FloatingLabel
                                        
                                        label="Ime"
                                        className="mb-3 p-0"
                                        >
                                        <Form.Control size="xs" type="text"onChange={(e)=> setFirstname(e.target.value)} placeholder="Ime" />
                                    </FloatingLabel>
                                </Col>
                                <Col md='6' className='ps-md-1 mb-3 mb-md-0 g-0'>
                                    <FloatingLabel className='p-0'  label="Prezime">
                                        <Form.Control onChange={(e)=> setLastname(e.target.value)} type="text" placeholder="Prezime" />
                                    </FloatingLabel>
                                </Col>{
                                err.emailError ? 
                                        <Form.Text className='text-start text-danger p-0 m-0'>
                                            {err.emailError}
                                        </Form.Text> : ''
                                    }
                                <FloatingLabel
                                    label="E-mail adresa"
                                    className="mb-3 p-0"
                                    >
                                    <Form.Control size="xs" onChange={(e)=> setMail(e.target.value)} type="text" placeholder="E-mail adresa" />
                                </FloatingLabel>
                                {
                                err.nameError ? 
                                        <Form.Text className='text-start text-danger p-0 m-0'>
                                            {err.nameError}
                                        </Form.Text> : ''
                                    }
                                <FloatingLabel
                                    
                                    label="Korisničko ime"
                                    className="mb-3 p-0"
                                    >
                                    <Form.Control onChange={(e)=> setUsername(e.target.value)} size="xs" type="text" placeholder="Korisničko ime" />
                                </FloatingLabel>
                                    {err.passwordError ? 
                                        <Form.Text className='text-start text-danger p-0 m-0'>
                                            {err.passwordError}
                                        </Form.Text> : ''
                                    }
                                    {err.password2Error ? 
                                        <Form.Text className='text-start text-danger p-0 m-0'>
                                            {err.password2Error}
                                        </Form.Text> : ''
                                    }
                                <Col md='6' className='pe-md-1 g-0'>
                                    <FloatingLabel
                                        
                                        label="Šifra"
                                        className="mb-3 p-0"
                                        >
                                        <Form.Control size="xs"onChange={(e)=> setPass1(e.target.value)} type="password" placeholder="Šifra" />
                                    </FloatingLabel>
                                </Col>
                                <Col md='6' className='ps-md-1 g-0'>
                                    <FloatingLabel
                                        
                                        label="Potvrda šifre"
                                        className="mb-3 p-0"
                                    >
                                        <Form.Control size="xs" type="password" onChange={(e)=> setPass2(e.target.value)} placeholder="Potvrda šifre" />
                                    </FloatingLabel>
                                </Col>
                                {err.hintError ? 
                                    <Form.Text className='text-start text-danger p-0 m-0'>
                                        {err.hintError}
                                    </Form.Text> : ''
                                }
                                <FloatingLabel
                                    
                                    label="Podsetnik za šifru"
                                    className="mb-3 p-0"
                                >
                                    <Form.Control 
                                        as="textarea"
                                        placeholder="Podsetnik"
                                        style={{ height: '100px' }} size="lg" onChange={(e)=> setHint(e.target.value)}
                                    />
                                </FloatingLabel>
                                
                               {loading ? <div className='center w-100 pb-2'><Spinner animation="border" variant="warning"/></div> :<input type={'submit'} className={`btn btn-warning w-100 py-3 mb-0`} value='Potvrdi'/>}
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </Col>
            <Col className='mt-5 mt-md-0 house-interior-bg p-5'>
                <div className='p-5'></div>
            </Col>
        </Row>
    </Container>
</>
  )
}

export default RegisterScreen