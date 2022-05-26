import React, { useEffect } from 'react'
import { Container, Row, Col, ListGroup, ListGroupItem, ButtonGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { deleteAdAction, getUsersAds } from '../actions/adActions'
import { FiX, FiSearch, FiEdit, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { apiUrl } from '../helper'


const ProfileMyAdsScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const userAds = useSelector(state => state.userAds)
    const { loading, error, ads } = userAds
    
    const deleteAd = useSelector(state => state.deleteAd)
    const { loading : deleteLoading, error : deleteError, success : deleteSuccess } = deleteAd

    useEffect(()=>{
        dispatch(getUsersAds());
    },[dispatch, deleteSuccess])

    const removeAd = (id) =>{
        dispatch(deleteAdAction(id));
    }

    const editAd = (id) =>{
        navigate(`/kreiraj-oglas/?updateId=${id}`)
    }

  return (
    <Container fluid className='px-5 pt-header bg-dark text-light'>
        <Container fluid className='px-5 bg-dark text-light'>
            <h4 className='text-start px-5 pb-2 pt-2'>Moji oglasi:</h4>
            <Container fluid className='px-5 d-flex'>
                <Link to={'/kreiraj-oglas'} className='btn btn-danger me-auto mb-3'>
                    Kreiraj oglas
                </Link>
            </Container>
            {loading ? 
                'loading' 
                : 
                <ListGroup className='px-5 pb-5'>
                    {ads.map(n =>
                        <ListGroupItem key={n.id} className='bg-dark border-light py-2 px-3 d-flex align-items-center justify-content-between'>
                            <div className='d-flex justify-content-between align-items-center w-50'>
                                {n.titlePath && <img alt={n.titlePath} src={`${apiUrl}/Images/${n.titlePath}`} className='' height={'50px'} width={'50px'}/>}    
                                <h6 className='ps-3 m-0 text-light'>{n.name}</h6>
                                <h6 className='ps-3 m-0 text-light'>{n.type}</h6>
                                <h6 className='ps-3 m-0 text-light'>{n.location}</h6>
                                <h6 className='ps-3 m-0 text-light'>{n.size}</h6>
                                <h6 className='ps-3 m-0 text-light'>{n.price}</h6>
                            </div>
                            <ButtonGroup>
                                <Link className='btn btn-primary px-3 pt-1 text-decoration-none text-white' to={`/oglas/${n.id}`}>
                                    <FiSearch/>
                                </Link>
                                <button onClick={() => editAd(n.id)} className='btn btn-warning px-3 pt-1'><FiEdit/></button>
                                <button onClick={()=> removeAd(n.id)} className='btn btn-danger px-3 pt-1'><FiX/></button>
                            </ButtonGroup>
                        </ListGroupItem>
                    )}
                </ListGroup>
            }
        </Container>
    </Container>
  )
}

export default ProfileMyAdsScreen