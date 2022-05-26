import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDropzone } from 'react-dropzone'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AD_CREATE_RESET, AD_UPDATE_RESET } from '../constants/addConstants'
import { createNewAd, updateSingleAd } from '../actions/adActions'

const AddAdScreen = () => {
    const navigate = useNavigate()
    const [params] = useSearchParams();
    const [init, setInit] = useState(params.get('updateId') ? params.get('updateId') : null);

    const [files, setFiles] = useState([]);
    const [adResource, setAdResource] = useState({
        name: '',
        price:0,
        type:'',
        location:'',
        description:'',
        size:0,
        standardEq:'',
        techEq:'',
        securityEq:'',
        roomCount:0,
        bathRoomCount:0,
        propState:'',
        parkingCount:0
    }) //javlja se greska zbog nedefinisanja

    const dispatch = useDispatch();

    const createAd = useSelector(state => state.createAd);
    const {loading: createLoading, success: createSuccess, id, error: createError} = createAd;

    const updateAd = useSelector(state => state.updateAd);
    const {loading: updateLoading, success: updateSuccess, id: updateId, error: updateError} = updateAd;

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;

    const {getRootProps, getInputProps} = useDropzone({
        accept: {
        'image/*': []
        },
        onDrop: acceptedFiles => {
        setFiles(acceptedFiles)
        console.log(acceptedFiles)
        }
    });

    const thumbs = files.map(n => <p className='text-primary m-0'>{n.name}</p>)

    const submitHandler = (e) =>{
        e.preventDefault();

        const fd = new FormData();

        fd.append("name", adResource.name);
        fd.append("price", adResource.price);
        fd.append("type", adResource.type);
        fd.append("location", adResource.location);
        fd.append("description", adResource.description);
        fd.append("size", adResource.size);
        fd.append("standardEquipment", adResource.standardEq);
        fd.append("techEquipment", adResource.techEq);
        fd.append("securityEquipment", adResource.securityEq);
        fd.append("rooms", adResource.roomCount);
        fd.append("bathrooms", adResource.bathRoomCount);
        fd.append("propState", adResource.propState);
        fd.append("parkingSize", adResource.parkingCount);

        for(let i = 0; i < files.length; i++) {
            fd.append("images", files[i]);
        }

        // for (var value of fd.values()) {
        //      console.log(value);
        // }

        if(init){
            dispatch(updateSingleAd(init, fd))
        }
        else 
            dispatch(createNewAd(fd))
    }

    useEffect(()=>{
        if(createError) console.log(createError)
        if(updateError) console.log(updateError)
        if(!userInfo) navigate('/prijava');

        dispatch({type: AD_CREATE_RESET});
        dispatch({type: AD_UPDATE_RESET});
        
        if(createSuccess){
            navigate(`/oglas/${id}`);
        }
        if(updateSuccess){
            navigate(`/oglas/${updateId}`);
        }
    },[dispatch, createError, createSuccess, updateSuccess, updateError, init, params])

  return (
      <Container fluid className='pt-header pb-5 bg-dark d-flex justify-content-center align-items-center'>
          <form onSubmit={submitHandler} className='p-4 w-75 bg-light mt-2 rounded'>
            <Container fluid className='px-5'>
                <Row>
                    <h3>{init > 0 ? 'Ažuriranje sadržaja oglasa' : 'Kreiranje oglasa'}</h3>
                    <h4 className='pb-4'>Unesite informacije o nekretnini:</h4>
                    <Col md='4'>
                        Opšte informacije
                        <div className='border-top pt-3 px-3 d-flex justify-content-start align-items-start flex-column'>
                            <div className='pb-3 form-group w-100 d-flex justify-content-center align-items-start flex-column'>
                                <label className='text-start'>Naziv nekretnine</label>
                                <input value={adResource.name} onChange={e => setAdResource({...adResource, name: e.target.value})} className='px-2 w-100 border-none rounded' type={'text'}/>
                            </div>
                            <div className='pb-3 form-group w-100 d-flex justify-content-center align-items-start flex-column'>
                                <label className='text-start'>Tip nekretnine</label>
                                <input value={adResource.type} onChange={e => setAdResource({...adResource, type: e.target.value})} className='px-2 border-none w-100 rounded' type={'text'}/>
                            </div>
                            <div className='pb-3 form-group w-100 d-flex justify-content-center align-items-start flex-column'>
                                <label className='text-start'>Tip gradnje</label>
                                <input value={adResource.propState} onChange={e => setAdResource({...adResource, propState: e.target.value})} className='px-2 w-100 border-none rounded' type={'text'}/>
                            </div>
                            <div className='pb-3 form-group w-100 d-flex justify-content-center align-items-start flex-column'>
                                <label className='text-start'>Lokacija nekretnine</label>
                                <input value={adResource.location} onChange={e => setAdResource({...adResource, location: e.target.value})} className='px-2 w-100 border-none rounded' type={'text'}/>
                            </div>
                            <div className='pb-3 form-group w-100 d-flex justify-content-center align-items-start flex-column'>
                                <label className='text-start'>Cena nekretnine</label>
                                <input value={adResource.price} onChange={e => setAdResource({...adResource, price: e.target.value})} className='px-2 w-100 border-none rounded' type={'text'}/>
                            </div>
                            <div className='pb-3 form-group w-100 d-flex justify-content-center align-items-start flex-column'>
                                <label className='text-start'>Veličina nekretnine</label>
                                <input value={adResource.size} onChange={e => setAdResource({...adResource, size: e.target.value})} className='px-2 border-none w-100 rounded' type={'text'}/>
                            </div>
                            <div className='pb-3 form-group w-100 d-flex justify-content-center align-items-start flex-column'>
                                <label className='text-start'>Standardna oprema</label>
                                <input value={adResource.standardEq} onChange={e => setAdResource({...adResource, standardEq: e.target.value})} className='px-2 border-none rounded w-100' type={'text'}/>
                            </div>
                            <div className='pb-3 form-group w-100 d-flex justify-content-center align-items-start flex-column'>
                                <label value={adResource.roomCount} onChange={e => setAdResource({...adResource, roomCount: e.target.value})} className='text-start'>Broj soba</label>
                                <input className='px-2 w-100 border-none rounded' type={'text'}/>
                            </div>
                        </div>
                    </Col>
                    <Col md='4'>
                        Detalji
                        <div className='border-top pt-3 px-3 d-flex justify-content-start align-items-start flex-column'>
                            <div className='pb-3 form-group w-100 d-flex justify-content-center align-items-start flex-column'>
                                <label className='text-start w-100'>Broj parking mesta</label>
                                <input value={adResource.parkingCount} onChange={e => setAdResource({...adResource, parkingCount: e.target.value})} className='px-2 border-none w-100 rounded' type={'text'}/>
                            </div>
                            <div className='pb-3 form-group w-100 d-flex justify-content-center align-items-start flex-column'>
                                <label className='text-start '>Broj kupatila</label>
                                <input value={adResource.bathRoomCount} onChange={e => setAdResource({...adResource, bathRoomCount: e.target.value})} className='px-2 border-none w-100 rounded' type={'text'}/>
                            </div>
                            <div className='pb-3 form-group d-flex w-100 justify-content-center align-items-start flex-column'>
                                <label className='text-start'>Tehnička oprema</label>
                                <input value={adResource.techEq} onChange={e => setAdResource({...adResource, techEq: e.target.value})} className='px-2 border-none w-100 rounded' type={'text'}/>
                            </div>
                            <div className='pb-3 form-group d-flex w-100 justify-content-center align-items-start flex-column'>
                                <label className='text-start'>Sigurnosna oprema</label>
                                <input value={adResource.securityEq} onChange={e => setAdResource({...adResource, securityEq: e.target.value})} className='px-2 border-none rounded w-100' type={'text'}/>
                            </div>
                            <div className='pb-3 d-flex w-100 justify-content-center align-items-start flex-column'>
                                <label className='text-start'>Opis nekretnine</label>
                                <textarea value={adResource.description} onChange={e => setAdResource({...adResource, description: e.target.value})} className='w-100 py-2 mt-1 p-1 rounded' rows={6}/>
                            </div>
                        </div>
                    </Col>
                    <Col md='4'>
                        Opis & pregled
                        <div className='border-top pt-3 px-3 d-flex justify-content-start align-items-start flex-column'>
                            <section className="container p-2 bg-light">
                                <div className='border rounded' style={{border:'2px dashed black', padding:'125px 35px'}} {...getRootProps({className: 'dropzone'})}>
                                    <input {...getInputProps()} />
                                    <p>Drag 'n' drop some files here, or click to select files</p>
                                </div>
                                <aside className='mt-3'>
                                    {thumbs}
                                </aside>
                            </section>
                        </div>
                    </Col>
                </Row>
            </Container>
            <input type={'submit'} className='btn btn-warning w-75 mt-3' value={'Objavi'}/>
          </form>
      </Container>
  )
}

export default AddAdScreen