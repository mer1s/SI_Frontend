import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { FiHeart } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addItem, removeItem } from '../actions/basketActions'
import {FiSearch} from 'react-icons/fi'

const Ad = ({ad}) => {
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
    <Container fluid className='p-0 mb-4 m-0 position-relative'>
        <Link className={`text-decoration-none search-link position-absolute text-warning ${userInfo ? 'isAuth' : 'notAuth'}`} to={`/oglas/${ad.id}`}><FiSearch/></Link>
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
        <img className='w-100 rounded' height={'230px'} src={`https://localhost:7007/Images/${ad.titlePath}`} alt='ok'/>
        <h4 className='text-warning text-start py-2'>{ad.name}, <span className='text-light'>{ad.location}</span></h4>
    </Container>
  )
}

export default Ad