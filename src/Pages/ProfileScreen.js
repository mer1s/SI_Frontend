import React, { useEffect, useState } from 'react'
import { Col, Container, FloatingLabel, Form, ListGroup, ListGroupItem, Row, Spinner } from 'react-bootstrap'
import { FiChevronDown, FiChevronUp, FiSearch, FiX } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { changePic, deleteUserAction, editName, editPassword, editUsername, removePic } from '../actions/accountActions'
import { ADMIN_DELETE_USER_RESET, USER_CHANGE_PIC_RESET, USER_EDIT_NAME_RESET, USER_EDIT_PASS_RESET, USER_EDIT_USERNAME_RESET, USER_LOGOUT, USER_REMOVE_PIC_RESET, USER_SET_FIRST, USER_SET_LAST, USER_SET_USERNAME } from '../constants/accountContstants'
import { apiUrl } from '../helper'
import { hasLower, hasNumber, hasSpec, hasUpper } from '../helpers'

const ProfileScreen = () => {

    const [usernameChange, setUsernameChange] = useState(false)
    const [passChange, setPassChange] = useState(false)
    const [nameChange, setNameChange] = useState(false)
    const [picChange, setPicChange] = useState(false)

    const [hover, setHover] = useState(false)

    const navigate = useNavigate();

    const userLogin = useSelector(s => s.userLogin)
    const {userInfo} = userLogin

    const usernameEdit = useSelector(s => s.usernameEdit)
    const {loading, success: usernameSuccess, error: usernameError} = usernameEdit

    const passEdit = useSelector(s => s.passEdit)
    const {loading: passLoading, success: passSuccess} = passEdit

    const nameEdit = useSelector(s => s.nameEdit)
    const {loading: nameLoading, success: nameSuccess} = nameEdit

    const picRemove = useSelector(s => s.picRemove)
    const {loading: picLoading, success: picSuccess} = picRemove

    const picChangeState = useSelector(s => s.picChange)
    const {loading: picChangeLoading, success: picChangeSuccess} = picChangeState

    const [firstName, setFirst] = useState(userInfo.firstName)
    const [lastName, setLast] = useState(userInfo.lastName)
    const [userName, setUsername] = useState(userInfo.username)
    const [pass1, setPass1] = useState('')
    const [pass2, setPass2] = useState('')
    const [hint, setHint] = useState('')

    const dispatch = useDispatch();

    const deleteUser = useSelector(s => s.userDelete)
    const { success : deleteSuccess } = deleteUser

    const usernameChangeHandler = () =>{
        if(usernameChange){
            setUsername(userInfo.username)    
        }
        setUsernameChange(!usernameChange)
    }
    
    const usernameSubmitHandler = (e) =>{
        e.preventDefault()
        if(window.confirm('Da li ste sigurni?'))
            dispatch(editUsername(userName))
    }
    
    const nameSubmitHandler = (e) =>{
        e.preventDefault()
        if(window.confirm('Da li ste sigurni?'))
            dispatch(editName(firstName, lastName))
    }
    
    const passSubmitHandler = (e) =>{
        e.preventDefault()
        if(window.confirm('Da li ste sigurni?'))
            dispatch(editPassword(pass1, hint))
    }

    const removePicHandler = (e) =>{
        e.preventDefault();
        if(window.confirm('Da li ste sigurni?'))
            dispatch(removePic())
    }

    const nameChangeHandler = () =>{
        if(nameChange){
            setFirst(userInfo.firstName)  
            setLast(userInfo.lastName)  
        }
        setNameChange(!nameChange)
    }

    const passChangeHandler = () =>{
        if(passChange){
            setPass1('')
            setPass2('')
            setHint('')
        }
        setPassChange(!passChange)
    }

    const picChangeHandler = () =>{
        // if(picChange){
            
        // }
        setPicChange(!picChange)
    }

    const deleteAccountHandler = () =>{
        if(window.confirm('Da li ste sigurni?')){
            dispatch(deleteUserAction(userInfo.id))
        }
    }

    const [image, setImage] = useState({
        imgSrc: userInfo.profilePic,
        imgFile: null
    })
    
    const showPreview = e =>{
        if(e.target.files && e.target.files[0]){
            let imgFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x =>{
                setImage({
                    ...image,
                    imgFile,
                    imgSrc: x.target.result
                })
            }
            reader.readAsDataURL(imgFile);
        }
        else setImage({
            imgSrc : '',
            imgFile : null
        })
    }

    const changePicHandler = (e) =>{
        e.preventDefault();
        if(window.confirm('Da li ste sigurni?')){
            var fd = new FormData();

            fd.append('image', image.imgFile)

            dispatch(changePic(fd))
        }
    }

    useEffect(()=>{
        if(deleteSuccess){    
            dispatch({
                type: USER_LOGOUT
            });
            dispatch({
                type: ADMIN_DELETE_USER_RESET
            })
            navigate('/prijava');
            localStorage.clear();
        }

        if(usernameSuccess){    
            // alert('Uspešno ažurirani podaci korisnika')
            dispatch({
                type: USER_SET_USERNAME,
                payload: userName
            });
            dispatch({
                type: USER_EDIT_USERNAME_RESET
            })
            setUsernameChange(false)
        }

        if(nameSuccess){   
            // alert('Uspešno ažurirani podaci korisnika') 
            dispatch({
                type: USER_SET_FIRST,
                payload: firstName
            });  
            dispatch({
                type: USER_SET_LAST,
                payload: lastName
            });
            dispatch({
                type: USER_EDIT_NAME_RESET
            })
            setNameChange(false)
        }

        if(picSuccess){   
            // alert('Uspešno uklonjena profilna slika!')
            dispatch({
                type: USER_REMOVE_PIC_RESET
            })
            setPicChange(false)
        }

        if(picChangeSuccess){   
            // alert('Uspešno ažurirana profilna slika!') 
            dispatch({
                type: USER_CHANGE_PIC_RESET
            })
            setPicChange(false)
        }

        if(passSuccess){  
            // alert('Uspešno ažurirani podaci korisnika')
            dispatch({
                type: USER_EDIT_PASS_RESET
            })
            setPassChange(false)
        }

    },[dispatch, userInfo.profilePic, deleteSuccess, usernameSuccess, usernameError, passSuccess, nameSuccess, picSuccess, picChangeSuccess])
    
  return (
    <div className="px-md-5 pt-header">
        <div className="px-md-5 pt-4">
            <div className="px-4">
                <div className="row no-gutters">
                    <div className="col-md-4 col-lg-5 p-0 m-0">
                        {userInfo.profilePic && <img style={{width:'100%', height:'352px'}} alt={userInfo.profilePic} src={`${apiUrl}/Images/${userInfo.profilePic}`}/>}
                    </div>
                    <div className="col-md-8 h-100 col-lg-7 p-0 ps-md-3">
                        <div className="d-flex h-100 w-100 flex-column">
                            <div className="d-flex flex-row justify-content-between align-items-center flex-column p-5 bg-dark text-white">
                                <h3 className="display-5 p-0 m-0">{userInfo.firstName} {userInfo.lastName}</h3>
                                <h6 className='p-0 m-0 text-warning'>@ {userInfo.username}</h6>
                            </div>
                            <div className="p-3 pt-4 bg-black text-white">
                                <h6>{userInfo.email}</h6>
                            </div>
                            <div className="d-flex flex-row text-white">
                                <div onMouseEnter={()=>setHover(true)} onMouseLeave={()=> setHover(false)} className="p-4 bg-primary text-center skill-block-static">
                                    <h4>{userInfo.role[0]}</h4>
                                    <h6>Uloga</h6>
                                </div>
                                <div onClick={()=> navigate('moji-oglasi')} className="p-4 bg-warning text-center skill-block">
                                    {/* <h4>Prijavi neprimeran sadržaj</h4> */}
                                    <h4><FiSearch/></h4>
                                    <h6>Moji oglasi</h6>
                                </div>
                                <div onClick={deleteAccountHandler} className="p-4 bg-danger text-center skill-block">
                                    <h4>
                                        <FiX/>
                                    </h4>
                                    <h6 className=''>Deaktiviraj nalog</h6>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    {hover ? 
                        <div className='p-5 bg-light mt-3 center flex-column'>
                            {userInfo.role[0] === 'Admin' ? 
                                <div className='center flex-column'>
                                    <h4 className='text-start w-100 m-0 p-0 mb-3'>Kao administrator sistema imate mogućnost:</h4>
                                    <h6 className='text-start w-100 m-0 p-0 pb-1'>- upravljanja svim oglasima</h6>
                                    <h6 className='text-start w-100 m-0 p-0 pb-1'>- upravljanja svim korisnicima</h6>
                                    <h6 className='text-start w-100 m-0 p-0 pb-1'>- objavljivanja svojih oglasa</h6>
                                    <h6 className='text-start w-100 m-0 p-0 pb-1'>- čuvanja omiljenih oglasa</h6>
                                </div>
                                :
                                <div className='center flex-column'>
                                    <h4 className='text-start w-100 m-0 p-0 mb-3'>Kao korisnik sistema imate mogućnost:</h4>
                                    <h6 className='text-start w-100 m-0 p-0 pb-1'>- upravljanja svojim oglasima</h6>
                                    <h6 className='text-start w-100 m-0 p-0 pb-1'>- pregled profila drugih korisnika</h6>
                                    <h6 className='text-start w-100 m-0 p-0 pb-1'>- objavljivanja svojih oglasa</h6>
                                    <h6 className='text-start w-100 m-0 p-0 pb-1'>- čuvanja omiljenih oglasa</h6>
                                </div>
                            }
                        </div> 
                        : 
                        ''
                    }
                    <h5 className='text-start mt-3 m-0 p-0'>Opcije izmena korisničkog profila</h5>
                    <div className='px-2 px-md py-5 mt-3 mb-5 bg-dark'>
                        <ListGroup variant='flush'>
                            <ListGroupItem className='bg-dark border-bottom border-light'>
                                <button onClick={usernameChangeHandler} className='w-100 btn btn-dark text-start py-2 d-flex justify-content-between px-0'><span>Promeni korisničko ime (username)</span>{usernameChange ? <FiChevronUp className='p-0 relative-top-2 m-0'/> : <FiChevronDown className=' relative-top-2'/>}</button>
                                {usernameChange ?
                                    <Container fluid>
                                        <Row className='py-4'>
                                            <Col md='6'>
                                                <Form onSubmit={usernameSubmitHandler}>
                                                    {usernameError && <p className='text-start mb-2 text-danger p-0 m-0'>{usernameError}</p>}
                                                    {(userName === userInfo.username) ? <p className='text-start mb-2 text-danger p-0 m-0'>Novo korisničko ime mora biti različito od trenutnog</p> : ''}
                                                    {(userName.length < 8) ? <p className='text-start mb-2 text-danger p-0 m-0'>Korisničko ime mora sadržati minimum 8 karaktera</p> : ''}
                                                    <FloatingLabel
                                                        label="Korisničko ime"
                                                        className="mb-2 p-0"
                                                    >
                                                        <Form.Control value={userName} onChange={(e) => setUsername(e.target.value)} size="xs" type="text" className='' placeholder="Korisničko ime" />
                                                    </FloatingLabel>
                                                    {loading ? <Spinner animation="border" variant="warning"/> : <input type='submit' value='Potvrdi' disabled={(userName === userInfo.username || userName.length < 8)} className='w-100 btn btn-warning'/>}
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Container>
                                    // <div className='py-2 my-2 d-flex flex-column align-items-start'>
                                    //     <Form>
                                    //         <FloatingLabel
                                    //             label="Novo korisničko ime"
                                    //             className="mb-2 p-0"
                                    //         >
                                    //             <Form.Control size="xs" type="text" className='' placeholder="Korisničko ime" />
                                    //         </FloatingLabel>
                                    //         <input type='submit' value='Potvrdi' className='w-100 btn btn-warning'/>
                                    //     </Form>
                                    // </div> 
                                    : 
                                    ''
                                }
                            </ListGroupItem>
                            <ListGroupItem className='bg-dark border-bottom border-light'>
                                <button onClick={passChangeHandler} className='px-0 w-100 btn btn-dark text-start py-2 d-flex justify-content-between'><span>Promeni šifru profila</span>{passChange ? <FiChevronUp className='p-0 relative-top-2 m-0'/> : <FiChevronDown className=' relative-top-2'/>}</button>
                                {passChange ?
                                    <Container fluid>
                                        <Row className='py-4'>
                                            <Col md='6'>
                                                <Form onSubmit={passSubmitHandler}>
                                                    {(pass1 !== pass2) ? <p className='text-start mb-2 text-danger p-0 m-0'>Potvrda šifre mora biti identična sa unetom novom šifrom</p> : ''}
                                                    {(pass1.length < 8) ? <p className='text-start mb-2 text-danger p-0 m-0'>Šifra mora sadržati minimum 8 karaktera</p> : ''}
                                                    {(pass1.length >= 8) && !hasLower(pass1) ? <p className='text-start mb-2 text-danger p-0 m-0'>Šifra mora sadržati minimum jedno malo slovo</p> : ''}
                                                    {(pass1.length >= 8) && !hasUpper(pass1) ? <p className='text-start mb-2 text-danger p-0 m-0'>Šifra mora sadržati minimum jedno veliko slovo</p> : ''}
                                                    {(pass1.length >= 8) && !hasSpec(pass1) ? <p className='text-start mb-2 text-danger p-0 m-0'>Šifra mora sadržati minimum jedan specijalni karakter</p> : ''}
                                                    {(pass1.length >= 8) && !hasNumber(pass1) ? <p className='text-start mb-2 text-danger p-0 m-0'>Šifra mora sadržati minimum jedan numerički karakter</p> : ''}
                                                    {(hint === "") ? <p className='text-start mb-2 text-danger p-0 m-0'>Potrebno je uneti podsetnik za šifru</p> : ''}
                                                    <FloatingLabel
                                                        label="Nova šifra"
                                                        className="mb-2 p-0"
                                                    >
                                                        <Form.Control value={pass1} onChange={e => setPass1(e.target.value)} size="xs" type="password" className='' placeholder="Korisničko ime" />
                                                    </FloatingLabel>
                                                    <FloatingLabel
                                                        label="Potvrda šifre"
                                                        className="mb-2 p-0"
                                                    >
                                                        <Form.Control value={pass2} onChange={e => setPass2(e.target.value)} size="xs" type="password" className='' placeholder="Korisničko ime" />
                                                    </FloatingLabel>
                                                    <FloatingLabel
                                                        label="Podsetnik za šifru"
                                                        className="mb-2 p-0"
                                                    >
                                                        <Form.Control value={hint} onChange={e => setHint(e.target.value)} size="xs" type="text" className='' placeholder="Korisničko ime" />
                                                    </FloatingLabel>
                                                    {passLoading ? <Spinner animation="border" variant="warning"/> : <input type='submit' disabled={hint === "" || (pass1.length < 8) || (pass1 !== pass2) || !hasNumber(pass1) ||!hasSpec(pass1) || !hasUpper(pass1) || !hasLower(pass1)} value='Potvrdi' className='w-100 btn btn-warning'/>}
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Container> 
                                    : 
                                    ''
                                }
                            </ListGroupItem>
                            <ListGroupItem className='bg-dark border-bottom border-light'>
                                <button onClick={nameChangeHandler} className='w-100 px-0 btn btn-dark text-start py-2 d-flex justify-content-between'><span>Promeni ime & prezime korisnika profila</span>{nameChange ? <FiChevronUp className='p-0 relative-top-2 m-0'/> : <FiChevronDown className=' relative-top-2'/>}</button>
                                {nameChange ?
                                    <Container fluid>
                                    <Row className='py-4'>
                                        <Col md='6'>
                                            {(firstName === "") ? <p className='text-start mb-2 text-danger p-0 m-0'>Polje za ime ne sme biti prazno</p> : ''}        
                                            {(firstName === userInfo.firstName) && (lastName === userInfo.lastName) ? <p className='text-start mb-2 text-danger p-0 m-0'>Promena je moguća ukoliko je došlo do promene imena ili prezimena</p> : ''}        
                                            {!hasUpper(firstName) && firstName.length >= 1 ? <p className='text-start mb-2 text-danger p-0 m-0'>Ime mora počinjati velikim početnim slovom</p> : ''}             
                                            {!hasLower(firstName) && firstName.length >= 2 ? <p className='text-start mb-2 text-danger p-0 m-0'>Slova imena posle početnog moraju biti mala</p> : ''}        
                                            {hasNumber(firstName) || hasNumber(lastName) ? <p className='text-start mb-2 text-danger p-0 m-0'>Ime ili prezime ne može sadržati brojeve</p> : ''}        
                                            <Form onSubmit={nameSubmitHandler}>
                                                <FloatingLabel
                                                    label="Ime"
                                                    className="mb-2 p-0"
                                                >
                                                    <Form.Control value={firstName} onChange={e => setFirst(e.target.value)} size="xs" type="text" className='' placeholder="Korisničko ime" />
                                                </FloatingLabel>
                                                   
                                            {(lastName === "") ? <p className='text-start mb-2 text-danger p-0 m-0'>Polje za prezime ne sme biti prazno</p> : ''}        
                                            {!hasUpper(lastName) && lastName.length >= 1 ? <p className='text-start mb-2 text-danger p-0 m-0'>Prezime mora počinjati velikim početnim slovom</p> : ''}        
                                            {!hasLower(lastName) && lastName.length >= 2 ? <p className='text-start mb-2 text-danger p-0 m-0'>Slova prezimena posle početnog moraju biti mala</p> : ''}
                                                <FloatingLabel
                                                    label="Prezime"
                                                    className="mb-2 p-0"
                                                >
                                                    <Form.Control onChange={e => setLast(e.target.value)} value={lastName} size="xs" type="text" className='' placeholder="Korisničko ime" />
                                                </FloatingLabel>
                                                {nameLoading ? <Spinner animation="border" variant="warning"/> : <input disabled={(hasNumber(firstName) || hasNumber(lastName))||(firstName === userInfo.firstName) && (lastName === userInfo.lastName) || (!hasLower(firstName) && firstName.length >= 2) || (!hasUpper(firstName) && firstName.length >= 1) || firstName === "" || (!hasLower(lastName) && lastName.length >= 2) || (!hasUpper(lastName) && lastName.length >= 1) || lastName === ""} type='submit' value='Sačuvaj' className='w-100 btn btn-warning'/>}
                                            </Form>
                                        </Col>
                                    </Row>
                                </Container>  
                                    : 
                                    ''
                                }
                            </ListGroupItem>
                            <ListGroupItem className='bg-dark'>
                                <button onClick={picChangeHandler} className='w-100 px-0 btn btn-dark text-start py-2 d-flex justify-content-between'><span>Promeni profilnu sliku</span>{picChange ? <FiChevronUp className='p-0 relative-top-2 m-0'/> : <FiChevronDown className=' relative-top-2'/>}</button>
                                {picChange ?
                                    <Container fluid>
                                    <Row className='py-4'>
                                        {/* <Col md='12' className='p-5 mb-3 bg-danger center'>
                                            <img src=''/>
                                        </Col> */}
                                        <Col md='1'></Col>
                                        <Col md='4' className='p-2'>
                                            <Form onSubmit={changePicHandler} className='w-100 center flex-column'>
                                                <img className='w-100 pb-3' alt={'ok'} src={image.imgFile ? image.imgSrc : `${apiUrl}/Images/${userInfo.profilePic}`}/>
                                                <input onChange={showPreview} type='file' className='w-100 pb-3'/>
                                                {picChangeLoading ? <Spinner animation="border" variant="warning"/> : <input type='submit' disabled={image.imgFile ? false : true} className='btn w-100 btn-warning' value='Sačuvaj promene'/>}
                                            </Form>
                                        </Col>
                                        <Col md='2'></Col>
                                        <Col md='4' className='p-2 mt-5 mt-md-0'>
                                            {userInfo.profilePic === "defaultUser.png" ? <p className=' mb-2 text-light p-0 m-0'>Trenutno ne koristite nijednu sliku kao profilnu</p> : ''}
                                            {picLoading ? <Spinner animation="border" variant="warning"/> : <button onClick={removePicHandler} disabled={userInfo.profilePic === "defaultUser.png"} className='btn px-5 btn-danger'>Ukloni sliku profila</button>}
                                        </Col>
                                        <Col md='1'></Col>
                                    </Row>
                                </Container>  
                                    : 
                                    ''
                                }
                            </ListGroupItem>
                        </ListGroup>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileScreen