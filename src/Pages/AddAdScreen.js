import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Col, Container, FloatingLabel, Form, FormGroup, Row,Spinner } from 'react-bootstrap'
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
    
    const [err, setErr] = useState({ 
        nameError: '', 
        typeError:'',
        priceError: '',
        locationError:'',
        descriptionError:'',
        sizeError:'',
        staError:'',
        techError:'',
        secError:'',
        propstateError:'',
        filesError: '',
        roomError:'',
        bathroomError:'',
        parkingError:''
    })

    const selectedAd = useSelector(s => s.selectedAd)
    const { ad: toUpdate } = selectedAd

    const [files, setFiles] = useState([]);
    const [adResource, setAdResource] = useState({
        name: init ? toUpdate.name : '',
        price: init ? toUpdate.price : 0,
        type: init ? toUpdate.type : '',
        location: init ? toUpdate.location : '',
        description:init ? toUpdate.description : '',
        size:init ? toUpdate.size : 0,
        standardEq:init ? toUpdate.standardEquipment : '',
        techEq:init ? toUpdate.techEquipment : '',
        securityEq:init ? toUpdate.securityEquipment : '',
        roomCount:init ? toUpdate.rooms : 0,
        bathRoomCount:init ? toUpdate.bathrooms : 0,
        propState:init ? toUpdate.propState : '',
        parkingCount:init ? toUpdate.parkingSize : 0
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
        // console.log(acceptedFiles)
        }
    });

    const thumbs = files.map(n => <p key={n.name} className='text-primary m-0'>{n.name}</p>)

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

        if(validate()){
            if(init){
                dispatch(updateSingleAd(init, fd))
            }
            else 
                dispatch(createNewAd(fd))
        }
    }

    function validate() {
        let nameError = ""
        let typeError = ""
        let priceError = ""
        let locationError = ""
        let descriptionError = ""
        let sizeError = ""
        let staError = ""
        let techError = ""
        let secError = ""
        let propstateError = ""
        let filesError = ""
        let roomError = ""
        let bathroomError = ""
        let parkingError = ""
        
        if(!init){
            if(files.length < 1)
                filesError = "Oglas mora sadržati slike."
        }
        if (!adResource.type) {
            typeError = "Potrebno je uneti tip nekretnine.";
        }
        if (adResource.roomCount < 0) {
            roomError = "Broj soba ne može biti manji od 0.";
        }
        if (adResource.bathRoomCount < 0) {
            bathroomError = "Broj kupatila ne može biti manji od 0.";
        }
        if (adResource.parkingCount < 0) {
            parkingError = "Broj parking mesta ne može biti manji od 0.";
        }
        if (!adResource.name) {
            nameError = "Potrebno je uneti naziv nekretnine.";
        }
        if (!adResource.price) {
            priceError = "Potrebno je uneti cenu nekretnine.";
        }
        if (adResource.price <= 0) {
            priceError = "Cena ne sme biti 0 ili ispod 0.";
        }
        if (!adResource.location) {
            locationError = "Potrebno je uneti lokaciju nekretnine.";
        }
        if (!adResource.description) {
            descriptionError = "Potrebno je opisati nekretninu.";
        }
        if (!adResource.size) {
            sizeError = "Potrebno je uneti veličinu nekretnine.";
        }
        if (adResource.size <= 0) {
            sizeError = "Veličina ne sme biti 0 ili ispod 0.";
        }
        if (!adResource.standardEq) {
            staError = "Potrebno je uneti standardnu opremu nekretnine.";
        }
        if (!adResource.techEq) {
            techError = "Potrebno je uneti tehnološku opremu nekretnine.";
        }
        if (!adResource.securityEq) {
            secError = "Potrebno je uneti sigurnosnu opremu nekretnine.";
        }
        if (!adResource.propState) {
            propstateError = "Potrebno je uneti vrstu gradnje.";
        }

        // if (passError || nameError) {
        if (filesError || parkingError || roomError || bathroomError || propstateError || staError || secError || techError || typeError || nameError || locationError || descriptionError || sizeError || filesError) {
          setErr({ nameError, typeError, priceError, locationError, descriptionError, sizeError, staError, techError, secError, propstateError, filesError, roomError, bathroomError, parkingError });
          return false;
        }
        
        setErr({ 
            nameError: '',
            typeError: '', 
            priceError: '',
            locationError: '',
            descriptionError: '',
            sizeError:'',
            staError:'',
            techError:'',
            secError:'',
            propstateError:'',
            filesError: '',
            roomError:'',
            bathroomError:'',
            parkingError:'',
        })

        return true;
    }

    useEffect(()=>{
        // if(createError) console.log(createError)
        // if(updateError) console.log(updateError)
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
      <>
        <Container fluid className=' bg-light p-0 m-0'>
            <Container fluid className='m-0'>
                <Row>
                    <Col md='5' className='house-interior-bg py-5'>
                        <div className='p-5 p-md-0'></div>
                    </Col>
                    <Col md='1'></Col>
                    <Col md='5' className='py-md-5 mt-5 px-2 pe-0 px-md-0'>
                        <Form onSubmit={submitHandler} className='w-100 px-4 px-md-0'>
                            <FormGroup as={Row} className=''>
                            <h4 className='w-100 text-start m-md-0 px-md-0 py-0 my-0 mx-md-0 ps-md-0 mb-md-5 mb-3'>Molimo Vas da unesete potrebne informacije pre objavljivanja oglasa.</h4>
                            <h5 className='w-100 text-start pb-3 m-md-0 px-md-0 py-0 my-0 mx-md-0 ps-md-1 pt-4'>Opšte informacije o nekretnini: </h5>
                            {err.nameError ? 
                                    <Form.Text className='text-start text-danger p-0 m-0 mb-1'>
                                        {err.nameError}
                                    </Form.Text> : ''
                            }
                            <FloatingLabel
                                label="Naziv nekretnine"
                                className="mb-3 p-0"
                                >
                                <Form.Control value={adResource.name} onChange={e => setAdResource({...adResource, name: e.target.value})} size="xs" type="text" placeholder="E-mail adresa" />
                            </FloatingLabel>
                            {err.typeError ? 
                                <Form.Text className='text-start text-danger p-0 m-0 mb-1'>
                                    {err.typeError}
                                </Form.Text> : ''
                            }
                            <FloatingLabel
                                label="Tip nekretnine"
                                className="mb-3 p-0"
                                >
                                <Form.Control value={adResource.type} onChange={e => setAdResource({...adResource, type: e.target.value})} size="xs" type="text" placeholder="E-mail adresa" />
                            </FloatingLabel>
                                {err.locationError ?
                                    <Form.Text className='text-start text-danger p-0 m-0 mb-1'>
                                        {err.locationError}
                                    </Form.Text> : ''
                                }
                                {err.propstateError ?
                                    <Form.Text className='text-start text-danger p-0 m-0 mb-1'>
                                        {err.propstateError}
                                    </Form.Text> : ''
                                }
                                <Col md='6' className='pe-md-2 g-0'>
                                    <FloatingLabel
                                        label="Lokacija nekretnine"
                                        className="mb-3 p-0"
                                        >
                                        <Form.Control value={adResource.location} onChange={e => setAdResource({...adResource, location: e.target.value})} size="xs" type="text" placeholder="E-mail adresa" />
                                    </FloatingLabel>
                                </Col>
                                <Col md='6' className='ps-md-1 g-0'>
                                    <FloatingLabel
                                        label="Tip gradnje"
                                        className="mb-3 p-0"
                                        >
                                        <Form.Control value={adResource.propState} onChange={e => setAdResource({...adResource, propState: e.target.value})} size="xs" type="text" placeholder="E-mail adresa" />
                                    </FloatingLabel>
                                </Col>
                                {err.priceError ?
                                    <Form.Text className='text-start text-danger p-0 m-0 mb-1'>
                                        {err.priceError}
                                    </Form.Text> : ''
                                }
                                {err.sizeError ?
                                    <Form.Text className='text-start text-danger p-0 m-0 mb-1'>
                                        {err.sizeError}
                                    </Form.Text> : ''
                                }
                                <Col md='6' className='pe-md-2 g-0'>
                                    <FloatingLabel
                                        label="Cena nekretnine"
                                        className="mb-3 p-0"
                                        >
                                        <Form.Control value={adResource.price} onChange={e => setAdResource({...adResource, price: e.target.value})} size="xs" type="number" placeholder="E-mail adresa" />
                                    </FloatingLabel>
                                </Col>
                                <Col md='6' className='ps-md-1 g-0'>
                                    <FloatingLabel
                                        label="Veličina nekretnine"
                                        className="mb-3 p-0"
                                        >
                                        <Form.Control size="xs" type="number" value={adResource.size} onChange={e => setAdResource({...adResource, size: e.target.value})}  placeholder="E-mail adresa" />
                                    </FloatingLabel>
                                </Col>
                                {err.staError ?
                                    <Form.Text className='text-start text-danger p-0 m-0 mb-1'>
                                        {err.staError}
                                    </Form.Text> : ''
                                }
                                {err.roomError ?
                                    <Form.Text className='text-start text-danger p-0 m-0 mb-1'>
                                        {err.roomError}
                                    </Form.Text> : ''
                                }
                                <Col md='6' className='pe-md-2 g-0'>
                                    <FloatingLabel
                                        label="Standardna oprema"
                                        className="mb-3 p-0"
                                        >
                                        <Form.Control size="xs" value={adResource.standardEq} onChange={e => setAdResource({...adResource, standardEq: e.target.value})} type="text" placeholder="E-mail adresa" />
                                    </FloatingLabel>
                                </Col>
                                <Col md='6' className='ps-md-1 g-0'>
                                    <FloatingLabel
                                        label="Broj soba"
                                        className="mb-3 p-0"
                                        >
                                        <Form.Control size="xs" value={adResource.roomCount} onChange={e => setAdResource({...adResource, roomCount: e.target.value})}  type="number" placeholder="E-mail adresa" />
                                    </FloatingLabel>
                            
                                </Col>
                                <h5 className='w-100 text-start pb-3 m-0 px-0 py-0 my-0 mx-0 ps-1 pt-4'>Opšte informacije o nekretnini: </h5>
                                
                                {err.bathroomError ?
                                    <Form.Text className='text-start text-danger p-0 m-0 mb-1'>
                                        {err.bathroomError}
                                    </Form.Text> : ''
                                }
                                {err.parkingError ?
                                    <Form.Text className='text-start text-danger p-0 m-0 mb-1'>
                                        {err.parkingError}
                                    </Form.Text> : ''
                                }
                                <Col md='6' className='pe-md-2 g-0'>
                                    <FloatingLabel
                                        label="Broj parking mesta"
                                        className="mb-3 p-0"
                                        >
                                        <Form.Control size="xs" value={adResource.parkingCount} onChange={e => setAdResource({...adResource, parkingCount: e.target.value})}  type="number" placeholder="E-mail adresa" />
                                    </FloatingLabel>
                                </Col>
                                <Col md='6' className='ps-md-1 g-0'>
                                    <FloatingLabel
                                        label="Broj kupatila"
                                        className="mb-3 p-0"
                                        >
                                        <Form.Control value={adResource.bathRoomCount} onChange={e => setAdResource({...adResource, bathRoomCount: e.target.value})}  size="xs" type="number" placeholder="E-mail adresa" />
                                    </FloatingLabel>
                                </Col>
                                {err.techError ? 
                                    <Form.Text className='text-start text-danger p-0 m-0 mb-1'>
                                        {err.techError}
                                    </Form.Text> : ''
                                }
                                <FloatingLabel
                                    label="Tehnička oprema"
                                    className="mb-3 p-0"
                                    >
                                    <Form.Control value={adResource.techEq} onChange={e => setAdResource({...adResource, techEq: e.target.value})} size="xs" type="text" placeholder="E-mail adresa" />
                                </FloatingLabel>
                                {err.secError ? 
                                    <Form.Text className='text-start text-danger p-0 m-0 mb-1'>
                                        {err.secError}
                                    </Form.Text> : ''
                                }
                                <FloatingLabel
                                    label="Sigurnosna oprema"
                                    className="mb-3 p-0"
                                    >
                                    <Form.Control value={adResource.securityEq} onChange={e => setAdResource({...adResource, securityEq: e.target.value})} size="xs" type="text" placeholder="E-mail adresa" />
                                </FloatingLabel>
                                <h5 className='w-100 text-start pb-3 m-0 px-0 py-0 my-0 mx-0 ps-1 pt-4'>Opšte informacije o nekretnini: </h5>
                                {err.descriptionError ? 
                                    <Form.Text className='text-start text-danger p-0 m-0 mb-1'>
                                        {err.descriptionError}
                                    </Form.Text> : ''
                                }
                                <FloatingLabel
                                    
                                    label="Opis nekretnine"
                                    className="mb-3 p-0"
                                >
                                    <Form.Control 
                                        as="textarea"
                                        placeholder="Podsetnik"
                                        style={{ height: '100px' }} size="xs"
                                        value={adResource.description} onChange={e => setAdResource({...adResource, description: e.target.value})}
                                    />
                                </FloatingLabel>
                                {err.filesError ? 
                                    <Form.Text className='text-start text-danger p-0 m-0 mb-1'>
                                        {err.filesError}
                                    </Form.Text> : ''
                                }{init ? 
                                    <Form.Text className='text-start text-dark p-0 m-0 mb-1'>
                                        U slučaju da korisnik pri ažuriranju oglasa nije upload-ovao nijednu sliku, <br></br> trenutna galerija slika će ostati nepromenjena.
                                    </Form.Text> : ''
                                }
                                <div className='pt-1 px-1 d-flex justify-content-start align-items-start flex-column'>
                                    <section className="container p-1 bg-light">
                                        <div className='border rounded' style={{border:'2px dashed black', padding:'125px 35px'}} {...getRootProps({className: 'dropzone'})}>
                                            <input {...getInputProps()} />
                                            <p>Drag 'n' drop some files here, or click to select files</p>
                                            {thumbs}
                                        </div>
                                        <aside className='mt-3'>
                                        </aside>
                                    </section>
                                </div>
                                {(updateLoading || createLoading) ?<Spinner className='mx-auto' animation="border" variant="warning"/> : <input type={'submit'} className={`btn btn-warning w-100 py-3 mb-0`} value='Kreiraj oglas'/>}
                            </FormGroup>
                        </Form>
                    </Col>
                    <Col md='1'></Col>
                </Row>
            </Container>
        </Container>
        {/* <Container fluid className='pt-header pb-5 bg-dark d-flex justify-content-center align-items-center'>
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
        </Container> */}
    </>
  )
}

export default AddAdScreen