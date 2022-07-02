import React, { useEffect } from 'react'
import { Container, Row, Col, ListGroup, ListGroupItem, ButtonGroup, Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { deleteAdAction, getUsersAds } from '../actions/adActions'
import { FiX, FiSearch, FiEdit, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { apiUrl } from '../helper'
import { AD_DELETE_RESET } from '../constants/addConstants'
import moment from 'moment'


const ProfileMyAdsScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const userAds = useSelector(state => state.userAds)
    const { loading, error, ads } = userAds
    
    const deleteAd = useSelector(state => state.deleteAd)
    const { loading : deleteLoading, error : deleteError, success : deleteSuccess } = deleteAd

    useEffect(()=>{
    if(deleteSuccess){
        dispatch({
          type: AD_DELETE_RESET
        })
      }
        dispatch(getUsersAds());
    },[dispatch, deleteSuccess])

    const removeAd = (id) =>{
        dispatch(deleteAdAction(id));
    }

    const editAd = (id) =>{
        navigate(`/kreiraj-oglas/?updateId=${id}`)
    }

  return (
    <Container fluid className='pe-0 px-md-5 pt-header m-0 bg-light '>
        <Container fluid className='px-md-5 m-0 me-0 pe-0'>
            <h4 className='text-start px-5 pb-3 pt-3'>Moji oglasi:</h4>
            <Container fluid className='px-5 d-flex'>
                <Link to={'/kreiraj-oglas'} className='btn btn-danger me-auto mb-5'>
                    Kreiraj oglas
                </Link>
            </Container>
            {loading ? 
                <div className='d-flex justify-content-center h-40vh align-items-center'>
                    <Spinner animation="border" variant="warning"/>
                </div> 
                : 
                <>
                {ads.length === 0 && <><div className='center bg-warning h-40vh py-5 w-100 mb-5 justify-content-start p-5'>
                    <h4>Poštovani, trenutno nemate nijedan objavljeni oglas na svom profilu.</h4>                        
                </div></>}
                <Container>
                    <Row>
                    {ads.map(ad =>
                    <Col md='3' className='mb-3'>
                        <Container fluid className='p-0 border-white mb-4 with-shadow m-0 text-light position-relative'>
                        <Link to={`/oglas/${ad.id}`} className='position-relative d-flex'>
                          <img className='w-100' height={'230px'} src={`${apiUrl}/Images/${ad.titlePath}`} alt={ad.name}/>  
                          <h6 className='text-dark bg-warning p-1 rounded text-start createdAt'>{moment(ad.created).calendar()}</h6>
                        </Link>
                        <div className='w-100 d-flex flex-column align-items-start position-relative bg-white py-2 text-dark'>
                          <h5 className='p-0 ps-4 m-0'>{ad.name}</h5>
                          <p className='p-0 m-0 ps-4'>{ad.type}, {ad.location}</p>
                        </div>
                        <div className='w-100 d-flex center position-relative bg-dark py-2'>
                            <Link className='btn btn-primary rounded-circle text-decoration-none text-white' to={`/oglas/${ad.id}`}>
                                <FiSearch/>
                            </Link>
                            <button onClick={() => editAd(ad.id)} className='btn mx-3 btn-warning rounded-circle'><FiEdit/></button>
                            <button onClick={()=> removeAd(ad.id)} className='btn btn-danger  rounded-circle'><FiX/></button>
                        </div>
                         {/* </Container>
                             <ButtonGroup>
                                <Link className='btn btn-primary px-3 pt-1 text-decoration-none text-white' to={`/oglas/${n.id}`}>
                                    <FiSearch/>
                                </Link>
                                <button onClick={() => editAd(n.id)} className='btn btn-warning px-3 pt-1'><FiEdit/></button>
                                <button onClick={()=> removeAd(n.id)} className='btn btn-danger px-3 pt-1'><FiX/></button>
                            </ButtonGroup>  */}
                        </Container>
                        </Col>
                    )}
                </Row>
                </Container></>
            }
        </Container>
    </Container>
  )
}

export default ProfileMyAdsScreen