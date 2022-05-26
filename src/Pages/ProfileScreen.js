import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { apiUrl } from '../helper'

const ProfileScreen = () => {
    const [toEdit, setToEdit] = useState(false)
    const userLogin = useSelector(s => s.userLogin)
    const {userInfo} = userLogin
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
    
  return (
    <Container fluid className='bg-dark'>
    <Row>
        <Col md='2' className=''></Col>
        <Col md='8' className='d-flex text-white'>
            <Container fluid className='profile-cont'>
                {!toEdit ?
                    <Row className=''>
                        <Col md='6' className='mh-100 d-flex justify-content-center align-items-center'>
                            <img src={`${apiUrl}/Images/${userInfo.profilePic}`} className='responsive-profile-img rounded-circle'/>
                        </Col>
                        <Col md='6' className='mh-100 d-flex justify-content-center align-items-center flex-column'>
                            <p>Korisnik registrovan na sistem u ulozi:<br></br> <span className='text-warning'>{userInfo.role[0] === 'Member' ? 'korisnik sistema' : 'administrator sistema'}</span></p>
                            <div className='w-100 px-5 pt-3'>
                                <h5 className='m-0 border-bottom text-center w-100'>
                                    Meris Ahmatovic
                                </h5>
                                <p className='text-warning text-center'>Ime i prezime</p>
                            </div><div className='w-100 px-5'>
                                <h5 className='m-0 border-bottom text-center w-100'>{userInfo.email}</h5>
                                <p className='text-warning text-center'>E-mail adresa</p>
                            </div>
                            <div className='w-100 px-5'>
                                <h5 className='m-0 border-bottom text-center w-100'>{userInfo.username}</h5>
                                <p className='text-warning text-center'>Korisničko ime</p>
                            </div>
                            <div className='w-100 px-5'>
                                <h5 className='m-0 border-bottom text-center w-100'>0628264606</h5>
                                <p className='text-warning text-center'>Broj telefona</p>
                            </div>
                            <div className='w-100 px-5'>
                                <h5 className='m-0 border-bottom text-center w-100'>
                                    {/* {userInfo.email} */}
                                    Hint
                                </h5>
                                <p className='text-warning text-center'>Pomoć za šifru</p>
                            </div>
                            <div className='w-100 px-5'>
                                <button onClick={() => setToEdit(true)} className='btn btn-warning rounded mt-3 w-100'>Uredi profil</button>  
                            </div>
                        </Col>
                    </Row>
                :
                    <Row className=''>
                        <Col md='6' className='mh-100 d-flex justify-content-center align-items-center flex-column'>
                            {image.imgFile ? 
                                <img src={image.imgSrc} className='responsive-profile-img rounded-circle mb-4'/>
                                :
                                <img src={`${apiUrl}/Images/${userInfo.profilePic}`} className='responsive-profile-img rounded-circle mb-4'/>
                            }
                            <input type={'file'} onChange={showPreview}/>
                        </Col>
                        <Col md='6' className='mh-100 d-flex justify-content-center align-items-center flex-column'>
                            <form className='w-100'>
                                <div className='px-5 w-100 pt-3 d-flex'>
                                    <div>
                                    <input className='px-1 rounded pt-1 w-100' type='text' value={'Meris'}/>
                                    <p className='text-warning text-start'>Ime</p>
                                    </div>
                                    <div className='px-1'></div>
                                    <div>
                                    <input className='px-1 rounded pt-1 w-100' type='text' value={'Ahmatovic'}/>
                                    <p className='text-warning text-start'>Prezime</p>
                                    </div>
                                </div>
                                <div className='px-5 w-100'>
                                    <input className='px-1 rounded pt-1 w-100' type='text' value={userInfo.email}/>
                                    <p className='text-warning text-start'>E-mail adresa</p>
                                </div>
                                <div className='px-5 w-100'>
                                    <input className='px-1 rounded pt-1 w-100' type='text' value={userInfo.username}/>
                                    <p className='text-warning text-start'>Korisničko ime</p>
                                </div>
                                <div className='px-5 w-100'>
                                    <input className='px-1 rounded pt-1 w-100' type='text' value={'0628264606'}/>
                                    <p className='text-warning text-start'>Broj telefona</p>
                                </div>
                                <div className='px-5 w-100'>
                                    <input className='px-1 rounded pt-1 w-100' type='text' value={userInfo.email}/>
                                    <p className='text-warning text-start'>Šifra</p>
                                </div>
                                <div className='px-5 w-100'>
                                    <input className='px-1 rounded pt-1 w-100' type='text' value={userInfo.email}/>
                                    <p className='text-warning text-start'>Potvrda šifre</p>
                                </div>
                                <div className='px-5 w-100'>
                                    <input className='px-1 rounded pt-1 w-100' type='text' value={userInfo.email}/>
                                    <p className='text-warning text-start'>Pomoć za šifru</p>
                                </div>
                                <div className='px-3 w-100 d-flex justify-content-center align-items-center'>
                                    <input className='m-0 w-40 btn btn-warning' value={'Potvrdi'} type={'submit'}/>
                                    <div className='px-2'></div>
                                    <button onClick={() => {
                                        setToEdit(false)
                                        setImage({
                                            imgSrc : '',
                                            imgFile : null
                                        })
                                    }} 
                                        className='btn btn-danger rounded w-40'>Poništi</button>  
                                </div>
                            </form>
                        </Col>
                    </Row>
                }
            </Container>
        </Col>
        <Col md='2' className=''></Col>
    </Row>
</Container>
  )
}

export default ProfileScreen