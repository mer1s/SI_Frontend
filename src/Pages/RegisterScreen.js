import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register } from '../actions/accountActions'

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
        password2Error:''
    })

    const [username, setUsername] = useState('')
    const [pass1, setPass1] = useState('')
    const [pass2, setPass2] = useState('')
    const [mail, setMail] = useState('')

    const submitHandler = (e) =>{
        e.preventDefault();

        if(validate()){

            const fd = new FormData() 
            fd.append("username", username);
            fd.append("password", pass1);
            fd.append("email", mail);
            fd.append("image", val.imageFile);

            console.log(fd)

            dispatch(register(fd))
        }
    }
    
    function validate() {
        let nameError = "";
        let emailError = "";
        let passwordError = "";
        let password2Error = "";

        if (!username) {
          nameError = "Name field is required";
        }
        // eslint-disable-next-line
        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if (!mail || reg.test(mail) === false) {
          emailError = "Email Field is Invalid";
        }

        if (!pass1) {
          passwordError = "Password field is required";
        }

        if (pass1 !== pass2) {
          password2Error = "Password field is required";
        }

        if (emailError || nameError || passwordError || password2Error) {
          setErr({ nameError, emailError, passwordError, password2Error });
          return false;
        }
        
        setErr({ 
            nameError: '', 
            emailError: '', 
            passwordError: '' ,
            password2Error:''
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

    },[success, dispatch])

  return (
    <Container fluid className=''>
    <Row>
        <Col md='1' className='bg-dark'></Col>
        <Col md='5' className='d-flex px-md-5 bg-dark mh-100 align-items-center justify-content-center flex-column'>
            <Container className='px-md-5'>
                <form onSubmit={submitHandler} className='border-warning border-bottom p-4 py-5 rounded w-100 text-light d-flex justify-content-center align-items-start flex-column'>
                    <label className='mt-2'>E-mail adresa:</label>
                    <input value={mail || ''} onChange={(e)=> setMail(e.target.value)} className='w-100 rounded p-1' type='text'/>
                    {err.emailError ? <p className='w-100 text-light p-0 m-0 rounded mt-1 text-start ps-1 bg-danger-light'>{err.emailError}</p>:''}
                    <label className='mt-2'>Korisničko ime:</label>
                    <input value={username || ''} onChange={(e)=> setUsername(e.target.value)} className='w-100 rounded p-1' type='text'/>
                    {err.nameError ? <p className='w-100 text-light p-0 m-0 rounded mt-1 text-start ps-1 bg-danger-light'>{err.nameError}</p>:''}
                    <label className='mt-2'>Šifra:</label>
                    <input value={pass1 || ''} onChange={(e)=> setPass1(e.target.value)} className='w-100 rounded p-1' type='password'/>
                    {err.passwordError ? <p className='w-100 text-light p-0 m-0 rounded mt-1 text-start ps-1 bg-danger-light'>Invalid</p>:''}
                    <label className='mt-2'>Potvrda šifre:</label>
                    <input value={pass2 || ''} onChange={(e)=> setPass2(e.target.value)} className='w-100 rounded p-1' type='password'/>
                    {err.password2Error ? <p className='w-100 text-light p-0 m-0 rounded mt-1 text-start ps-1 bg-danger-light'>Invalid</p>:''}
                    {val.imageSrc && <img src={val.imageSrc} alt='' width='150px' height='150px' className='mx-auto rounded-circle border rounded p-1 mt-3'/>}
                    <input className='form-control-file m-auto mt-2 py-2 w-100 text-light' 
                        accept='image/*'
                        type='file' 
                        onChange={showPreview}
                    />
                    <input type='submit' className='btn-warning btn mt-4 my-2 w-100' value={'Potvrdi'}/>
                </form>
            </Container>
        </Col>
        <Col md='1' className='bg-dark'></Col>
        <Col md='5' className='house-interior-bg d-flex justify-content-center align-items-center'>
            <div className='p-5 bg-light-transparent rounded'>
                <h4 className='text-start pb-3 m-0'>Benefiti registrovanja na sistem:</h4>
                <h5 className='text-start pb-1 m-0'>- Mogućnost postavljanja oglasa</h5>
                <h5 className='text-start pb-1 m-0'>- Kontaktiranje vlasnika oglasa</h5>
                <h5 className='text-start pb-1 m-0'>- Čuvanje oglasa u listu omiljenih</h5>
            </div>
        </Col>
    </Row>
</Container>
  )
}

export default RegisterScreen