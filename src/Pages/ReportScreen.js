import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { reportUser } from '../actions/accountActions';
import { REPORT_USER_RESET } from '../constants/accountContstants';

const ReportScreen = () => {
    const {id} = useParams();

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const userReport = useSelector(s => s.userReport)
    const { loading, success, error } = userReport

    const userLogin = useSelector(s => s.userLogin)
    const { userInfo } = userLogin

    const [invalidContent, setContent] = useState(false)
    const [spam, setSpam] = useState(false)
    const [invalidInfo, setInfo] = useState(false)
    const [identity, setIdentity] = useState(false)

    const [err, setErr] = useState('')

    const submitHandler = (e) =>{
        e.preventDefault();

        if(!(invalidContent || spam || invalidInfo || identity)){
            setErr('Morate izabrati jednu od ponuđenih opcija')
        }
        else{
            setErr('')

            var info = {
                invalidContent,
                spam,
                invalidInfo,
                identity
            }
    
            dispatch(reportUser(id, info))
        }
    }

    useEffect(()=>{
        if(!userInfo){
            navigate('/prijava')
        }
        
        if(success){
            navigate(`/korisnik/${id}`)
            dispatch({
                type: REPORT_USER_RESET
            })
        }
    },[dispatch, success, err, id])

  return (
    <div className='mh-100 center flex-column'>
        {loading ? 
            <div className='bg-light p-5 rounded'>Ucitavanje</div> :
            <><h4 className='m-0 p-0 px-4 px-md-0'>Molimo Vas da izaberete razlog prijave korisnika</h4>
        <Form onSubmit={submitHandler} className='mt-4 pt-2 px-4 px-md-0'>
            <div className='center mb-1 justify-content-start'>
                <input value={invalidContent} onChange={()=>{setContent(!invalidContent)}} type='checkbox'/>
                <h5 className='ms-3 text-start p-0 m-0'>Postavljanje neprikladnog sadržaja</h5>
            </div>
            <div className='center mb-1 justify-content-start'>
                <input value={spam} onChange={()=>{setSpam(!spam)}} type='checkbox'/>
                <h5 className='ms-3 text-start p-0 m-0'>Zloupotreba mogućnosti kontaktiranja (spam)</h5>
            </div>
            <div className='center mb-1 justify-content-start'>
                <input value={invalidInfo} onChange={()=>{setInfo(!invalidInfo)}} type='checkbox'/>
                <h5 className='ms-3 text-start p-0 m-0'>Objava nevalidnih informacija</h5>
            </div>
            <div className='center justify-content-start'>
                <input value={identity} onChange={()=>{setIdentity(!identity)}} type='checkbox'/>
                <h5 className='ms-3 text-start p-0 m-0'>Krađa identiteta</h5>
            </div>
            {err ? <p className='text-start text-danger mt-3'>{err}</p> : ''}
            <div className='d-flex justify-content-start w-100 mt-5'>
                <input type='submit' className='btn btn-warning px-5' value={'Potvrdi'}/>
            </div>
            <div className='d-flex justify-content-start mt-3'>
                <Link className='text-start' to={`/korisnik/${id}`}><p>Nazad</p></Link>
            </div>
        </Form></>
        }
    </div>
  )
}

export default ReportScreen