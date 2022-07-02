import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { FiHeart } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addItem, removeItem } from '../actions/basketActions'
import {FiSearch} from 'react-icons/fi'
import moment from 'moment'
import {apiUrl} from '../helper'

const Ad = ({ad, shadow}) => {
  const dispatch = useDispatch();

  const userLogin = useSelector(s => s.userLogin)
  const { userInfo } = userLogin
  
  const basket = useSelector(s => s.basket)
  const { items } = basket

  const isFav = () =>{
    if(items.some(n => n.ad.id === ad.id)) 
      return true;
    return false
  }

  const basketHandler = () =>{
    if(isFav())
      dispatch(removeItem(ad.id))
    else
      dispatch(addItem(ad))
  }

  return (
    
      <Container fluid className='p-0 border-white mb-4 with-shadow m-0 text-light position-relative'>
        <Link to={`/oglas/${ad.id}`} className='position-relative d-flex'>
          <img className='w-100' height={'230px'} src={`${apiUrl}/Images/${ad.titlePath}`} alt={ad.name}/>  
          <h6 className='text-dark bg-warning p-1 rounded text-start createdAt'>{moment(ad.created).calendar()}</h6>
        </Link>
        <div className='w-100 d-flex flex-column align-items-start position-relative bg-white py-2 text-dark'>
          <h5 className='p-0 ps-4 m-0'>{ad.name}</h5>
          <p className='p-0 m-0 ps-4 text-muted'>{ad.type}, {ad.location}</p>
          {userInfo ? 
            <button 
              className={`follow-btn btn ${items.some(n => n.ad.id === ad.id) ? 'isPart' : 'isNotPart'}`}
              onClick={basketHandler}
            >
              <FiHeart/>
            </button> 
            : 
            ''
          }
        </div>
        <div className='w-100 d-flex flex-column align-items-start position-relative bg-dark py-2 text-light'>
          <h5 className='p-0 w-100 px-4 m-0 d-flex justify-content-between'><span>Kvadratura:</span><span className='text-warning'>{ad.size} &#13217;</span></h5>
          <h5 className='p-0 w-100 px-4 m-0 d-flex justify-content-between'><span>Cena:</span><span className='text-warning'>{ad.price}.00 &euro;</span></h5>
        </div>
      </Container>

  )
}

export default Ad