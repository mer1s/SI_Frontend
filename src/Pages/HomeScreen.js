import React from 'react'
import { useState } from 'react'
import { Container } from 'react-bootstrap'
import NewAds from '../Components/NewAds'
import { FiArrowDown } from 'react-icons/fi'
import { useSelector } from 'react-redux'

const HomeScreen = () => {

    const userLogin = useSelector(s => s.userLogin)
    const { userInfo } = userLogin

    const [scrolled, setScrolled] = useState(false)

    window.addEventListener("scroll", ()=>{
        if(window.scrollY > 20){
            setScrolled(true);
        } else{
            setScrolled(false);
        }
    })

    return (
    <>
        <Container fluid className='p-0 house-interior-bg'>
            <Container fluid className='position-relative landing h-100-vh bg-dark-transparent d-flex flex-column justify-content-center align-items-center'>
                <h1 className='text-warning p-0 m-0 text-uppercase'>uz vaš realestate</h1>
                <h3 className='pt-md-0 px-md-0 px-3 pt-3 text-light text-uppercase'>pretraga nekretnina nikada nije bila lakša</h3>
                {!scrolled ? <a href='#novi' className='text-decoration-none position-absolute text-light'>Pogledajte nove oglase <FiArrowDown className='text-warning'/></a> : ''}
            </Container>
        </Container>
        <NewAds/>
        <Container fluid className='house-interior-bg text-uppercase d-flex flex-column'>
            <Container fluid className='text-uppercase w-100 h-100'>
                <Container fluid className='text-uppercase w-100 h-100 position-relative'>
                    {!userInfo ?
                        <div className='bg-dark-transparent w-100 h-100 py-5 px-md-5 px-2'>
                            <div className='py-5'></div>
                            <h2 className='text-warning p-0 m-0'>kreiraj nalog sada</h2>
                            <h4 className='text-light'>i postani deo realestate sistema</h4>
                            <div className='py-5'></div>
                        </div>
                        :
                        <div className='bg-dark-transparent w-100 h-100 py-5 px-md-5 px-2'>
                            <div className='py-5'></div>
                            <h2 className='text-warning p-0 m-0'>Kreiraj svoj oglas sada</h2>
                            <h4 className='text-light'>i postaće vidljiv svim korisnicima našeg portala</h4>
                            <div className='py-5'></div>
                        </div>
                    }
                </Container>
            </Container>
        </Container>
    </>
    )
}

export default HomeScreen