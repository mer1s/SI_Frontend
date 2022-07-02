import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { verify } from '../actions/accountActions';
import { Spinner } from 'react-bootstrap';

const VerificationScreen = () => {

    const [params] = useSearchParams();

    const dispatch = useDispatch();

    const verification = useSelector(s => s.verify);
    const { loading: verificationLoading, error } = verification
    
    useEffect(()=>{
        dispatch(verify(params.get('user'),params.get('token')))        
    },[dispatch, params])
    
  return (
    <div className='h-100-vh bg-verified text-light d-flex justify-content-center align-items-center'>
        {verificationLoading ? 
            <Spinner animation="border" variant="warning"/> 
            :
            error ?
                <h3>Došlo je do neke greške.<br></br>Molimo Vas, pokušajte ponovo kasnije!
                    {/* <br></br>{error.response.data} */}
                </h3>
                :
                <div className='center flex-column'>
                    <h3 className='p-0 m-0 d-1'>Vaš profil je uspešno verifikovan!</h3>
                    <Link 
                        style={{fontSize:'1.05rem'}} 
                        className='text-decoration-none w-50 mt-4 text-dark btn btn-warning mx-5' 
                        to={'/prijava'}
                    >
                        <h4 className='m-0 py-2 p-0'>Prijavi se</h4>
                    </Link>
                </div>
        }
    </div>
  )
}

export default VerificationScreen