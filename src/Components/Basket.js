import React from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeItem } from '../actions/basketActions'
import { apiUrl } from '../helper'
import { FiMinus } from 'react-icons/fi'

const Basket = (props) => {
    const dispatch = useDispatch()

    const basket = useSelector(s => s.basket)
    const { items } = basket

    const remove = (id) =>{
        // console.log(id)
        dispatch(removeItem(id))
    }

  return (
    <Container fluid className='text-light py-5 h-100'>
        {items.length === 0 ? 
            <p className='text-start ps-4'>Lista favorita je treutno prazna.</p> 
            : 
            items.length === 1 ? 
                <p className='text-start ps-4'>1 favorit</p> 
                : 
                <p className='text-start ps-4'>{items.length} favorita</p> 
        }
        {items.length !== 0 ? 
            <div className='d-flex basket-inner-cont border-top pt-3 px-4 flex-column'>
                {items.map(item =>
                    <div key={item.ad.id} 
                        className='d-flex justify-content-between pb-3 align-items-center'    
                    >
                        <button onClick={() => remove(item.ad.id)} className='w-h-10px rounded-circle btn p-0 m-0 d-flex justify-content-center align-items-center btn-danger'><FiMinus/></button>
                        <Link onClick={props.basketClose} to={`/oglas/${item.ad.id}`}
                            className='text-decoration-none d-flex text-light justify-content-start align-items-center'
                        >
                            <p className='m-0 ps-3'>{item.ad.name}</p>
                            <img className='m-0 rounded-circle' src={`${apiUrl}/Images/${item.ad.titlePath}`} width={'40px'} height={'40px'} alt={item.ad.titlePath}/>
                        </Link>
                    </div>
                )}
            </div> 
            : 
            ''
        }
    </Container>
  )
}

export default Basket