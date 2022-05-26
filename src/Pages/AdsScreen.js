import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { getAds } from '../actions/adActions';
import Ad from '../Components/Ad';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { addToStringArray, removeFromStringArray } from '../helpers';
import News from '../Components/News';

const AdsScreen = () => {
  const [page, setPage] = useState(1)

  const [searcher, setSearcher] = useState({
    order: "last",
    locations: "",
    types: "",
    minPrice: 0,
    maxPrice: 0
  })

  const [showFilters, setShowFilters] = useState(false);
  const dispatch = useDispatch();

  // ========================================== GET ALL ADS
  
  const adList = useSelector(state => state.adList);
  const { loading, error, ads, total } = adList
  
  useEffect(()=>{
    dispatch(getAds(searcher, page));
  },[dispatch, page])

  // ==========================================
  
  const searcherHandler = (e, name) =>{
    const { value, checked } = e.target;
    
    if(checked){
      setSearcher({...searcher, [name]: addToStringArray(searcher[name], value)})
    } else{
      setSearcher({...searcher, [name]: removeFromStringArray(searcher[name], value)})
    }
  }

  const submitHandler = (e) =>{
    e.preventDefault();
    setShowFilters(false);
    setPage(1);
    dispatch(getAds(searcher, 1));
  }

  const resetFilters = (e) =>{
    e.preventDefault();

    //ovo ili callback syntax of state updation
    setSearcher({
      order: "last",
      locations: "",
      types: "",
      minPrice: 0,
      maxPrice: 0
    })

    setPage(1)

    setShowFilters(false);

    dispatch(getAds({
      order: " ",
      locations: "",
      types: "",
      minPrice: 0,
      maxPrice: 0
    },1));
  }

  const atrIncludes = (atr, val) =>{
    return searcher[atr].split(',').includes(val)
  }

  return (
    <Container className='mh-100 pt-header bg-dark' fluid>
      {showFilters ? 
        <Container fluid className='overlay d-flex align-items-center justify-content-center'>
          <form onSubmit={submitHandler} className='filters position-relative rounded p-5 pb-4 w-60 bg-light'>
            <button onClick={(e)=> {e.preventDefault(); setShowFilters(false)}} className='btn-danger btn px-3 absolute-tr'><FiX/></button>
            <h5 className='text-center pb-3'>Izaberite parametre filtriranja:</h5>
            <Container fluid>
              <Row>
                <Col md='3' className='py-3'>
                  Lokacija<br></br>
                  <div className='border-top pt-3 px-3 d-flex justify-content-start align-items-start flex-column'>
                    <div className='form-group'>
                      <input checked={atrIncludes('locations','Beograd')} value='Beograd' onChange={(e) => searcherHandler(e, 'locations')} type='checkbox'/>
                      <label className='ps-2'>Beograd</label><br></br>
                    </div>
                    <div className='form-group'>
                      <input checked={atrIncludes('locations','Novi Sad')} value='Novi Sad' onChange={(e) => searcherHandler(e, 'locations')} type='checkbox'/>
                      <label className='ps-2'>Novi Sad</label><br></br>
                    </div>
                    <div className='form-group'>
                      <input checked={atrIncludes('locations','Kragujevac')} value='Kragujevac' onChange={(e) => searcherHandler(e, 'locations')} type='checkbox'/>
                      <label className='ps-2'>Kragujevac</label><br></br>
                    </div>
                    <div className='form-group'>
                      <input checked={atrIncludes('locations','Subotica')} value='Subotica' onChange={(e) => searcherHandler(e, 'locations')} type='checkbox'/>
                      <label className='ps-2'>Subotica</label><br></br>
                    </div>
                    <div className='form-group'>
                      <input checked={atrIncludes('locations','Nis')} value='Nis' onChange={(e) => searcherHandler(e, 'locations')} type='checkbox'/>
                      <label className='ps-2'>Niš</label><br></br>
                    </div>
                    <div className='form-group'>
                      <input checked={atrIncludes('locations','Novi Pazar')} value='Novi Pazar' onChange={(e) => searcherHandler(e, 'locations')} type='checkbox'/>
                      <label className='ps-2'>Novi Pazar</label><br></br>
                    </div>
                    <div className='form-group'>
                      <input checked={atrIncludes('locations','Kraljevo')} value='Kraljevo' onChange={(e) => searcherHandler(e, 'locations')} type='checkbox'/>
                      <label className='ps-2'>Kraljevo</label><br></br>
                    </div>
                    <div className='form-group'>
                      <input checked={atrIncludes('locations','Tutin')} value='Tutin' onChange={(e) => searcherHandler(e, 'locations')} type='checkbox'/>
                      <label className='ps-2'>Tutin</label><br></br>
                    </div>
                  </div>
                </Col>
                <Col md='3' className='py-3'>
                  Tip nekretnine
                  <div className='border-top pt-3 d-flex justify-content-start align-items-start flex-column'>
                    <div className='form-group'>
                      <input checked={atrIncludes('types','Hotel')} onChange={(e) => searcherHandler(e, 'types')} value='Hotel' type='checkbox'/>
                      <label className='ps-2'>Hotel</label><br></br>
                    </div>
                    <div className='form-group'>
                      <input checked={atrIncludes('types','Kuca')} onChange={(e) => searcherHandler(e, 'types')} value='Kuca' type='checkbox'/>
                      <label className='ps-2'>Kuća</label><br></br>
                    </div>
                    <div className='form-group'>
                      <input checked={atrIncludes('types','Stan')} onChange={(e) => searcherHandler(e, 'types')} value='Stan' type='checkbox'/>
                      <label className='ps-2'>Stan</label><br></br>
                    </div>
                    <div className='form-group'>
                      <input checked={atrIncludes('types','Restoran')} onChange={(e) => searcherHandler(e, 'types')} value='Restoran' type='checkbox'/>
                      <label className='ps-2'>Restoran</label><br></br>
                    </div>
                    <div className='form-group'>
                      <input checked={atrIncludes('types','Poslovni objekat')} onChange={(e) => searcherHandler(e, 'types')} value='Poslovni objekat' type='checkbox'/>
                      <label className='ps-2'>Poslovni objekat</label><br></br>
                    </div>
                    <div className='form-group'>
                      <input checked={atrIncludes('types','Garaza')} onChange={(e) => searcherHandler(e, 'types')} value='Garaza' type='checkbox'/>
                      <label className='ps-2'>Garaža</label><br></br>
                    </div>
                  </div>
                </Col>
                <Col md='3' className='py-3'>
                  Cena
                  <div className='border-top pt-3 d-flex justify-content-start align-items-start flex-column'>
                    Min
                    <input onChange={(e) => setSearcher({...searcher, minPrice: e.target.value})} value={searcher.minPrice} type={'text'} className='w-100 px-2 border-light rounded' placeholder='Minimalna cena...'/>
                    Max
                    <input onChange={(e) => setSearcher({...searcher, maxPrice: e.target.value})} value={searcher.maxPrice} type={'text'} className='w-100 px-2 border-light rounded mt-2' placeholder='Maksimalna cena...'/>
                  </div>
                  <div className='border-top pt-3 d-flex justify-content-start align-items-start flex-column'>
                    {/* Kvadratura:
                    <input type={'text'} className='w-100 px-2 border-light rounded' placeholder='Minimalna kv...'/>
                    <input type={'text'} className='w-100 px-2 border-light rounded mt-2' placeholder='Maksimalna kv...'/> */}
                  </div>
                </Col>
                <Col md='3' className='py-3'>
                  Poredak
                  <div className='border-top pt-3 d-flex justify-content-start align-items-start flex-column'>
                    <select value={searcher.order} onChange={(e) => setSearcher({...searcher, order: e.target.value})}  className='p-1 border-none rounded'>
                      <option value={"last"}>poslednje objavljeno</option>
                      <option value={"pASC"}>po ceni rastuće</option>
                      <option value={"pDESC"}>po ceni opadajuće</option>
                      <option value={"sASC"}>po veličini rastuće</option>
                      <option value={"sDESC"}>po veličini opadajuće</option>
                    </select>
                  </div>
                </Col>
              </Row>
            </Container>
            <input type='submit' className='btn btn-warning px-5 w-100 mt-4' value='Pretraži'/>
            <button onClick={resetFilters} className='btn btn-dark px-5 w-100 mt-2'>Poništi</button>
          </form>
        </Container> : ''}
      {loading ? 
        <div className='d-flex justify-content-center height-min-pt-header align-items-center'>
          <Spinner animation="border" variant="warning"/>
        </div> : error ? 'error' : 
        <Container fluid className='px-5'>
          <div className='d-flex justify-content-start pb-4'>
            <button className='btn btn-light px-5 me-2' onClick={() => setShowFilters(true)}>Filteri</button>
            {/* {filteri} */}
          </div>
          <p className='text-light text-start'>Aktivni filteri:</p>
          <div className='d-flex flex-wrap'>
            {!showFilters && searcher.locations !== "" ? searcher.locations?.split(',').map(n => <p key={n} className='px-2 rounded bg-warning me-2'>{n}</p>) : ''}
            {!showFilters && searcher.types !== "" ? searcher.types?.split(',').map(n => <p key={n} className='px-2 rounded text-light bg-primary me-2'>{n}</p>) : ''}
            {!showFilters && searcher.minPrice > 0 ? <p className='px-2 rounded text-light bg-success me-2'>Min: {searcher.minPrice}</p> : ''}
            {!showFilters && (searcher.maxPrice > 0 || searcher.maxPrice > searcher.minPrice) ? <p className='px-2 rounded text-light bg-success me-2'>Max: {searcher.maxPrice}</p> : ''}
          </div>
          <Row>
            <Col md='9'>
              {(!loading && total > 0) ? 
                <p className='text-white m-0 p-0 ad-order'>Prikazani oglasi <span className='text-warning'>{((page-1)*9) + 1}-{(page-1)*9 + ads.length}</span> od <span className='text-warning'>{total}</span></p> 
                : 
                <h4 className='text-white'>Lista je prazna</h4>
              }
              {!loading ?
                  <Container className='d-flex justify-content-center align-items-center'>
                      {page === 1 ? '' : <button onClick={() => setPage(s=> s-1)} className='pagination-btn btn text-light'><FiChevronLeft /><span>Prethodno</span></button>}
                      {page >= (total / 9) ? '' : <button onClick={() => setPage(s=> s+1)} className='pagination-btn btn text-light'><span>Sledeće</span><FiChevronRight /></button>}
                  </Container>
                  :
                  ''
                }
              <Row>
                {!loading ? ads.map(n => 
                  <Col key={n.id} md='4' className='text-light'>
                      <Ad ad={n}/>
                  </Col>
                  ) 
                  : 
                  ''
                }
                {!loading ?
                  <Container className='d-flex justify-content-center align-items-center pb-5'>
                      {page === 1 ? '' : <button onClick={() => setPage(s=> s-1)} className='pagination-btn-bottom btn text-light'><FiChevronLeft /><span>Prethodno</span></button>}
                      {page >= (total / 9) ? '' : <button onClick={() => setPage(s=> s+1)} className='pagination-btn-bottom btn text-light'><span>Sledeće</span><FiChevronRight /></button>}
                  </Container>
                  :
                  ''
                }
              </Row>
            </Col>
            <Col md='3'>
              <div className='mt-ad-order'></div>
              <News/>
            </Col>
          </Row>
        </Container>}
    </Container>
  )
}

export default AdsScreen