import React from 'react'
import { useState } from 'react'
import { Container } from 'react-bootstrap'
import NewAds from '../Components/NewAds'
import { FiArrowDown } from 'react-icons/fi'
import { useSelector } from 'react-redux'

const HomeScreen = () => {

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
                <h1 className='text-warning text-uppercase'>uz vaš realestate</h1>
                <h3 className='text-light text-uppercase'>pretraga nekretnina nikada nije bila lakša</h3>
                {!scrolled ? <a href='#novi' className='text-decoration-none position-absolute text-light'>Pogledajte nove oglase <FiArrowDown className='text-warning'/></a> : ''}
            </Container>
        </Container>
        <NewAds/>
        <Container fluid className='text-uppercase p-5 d-flex flex-column'>
            <h2 className='text-warning p-0 m-0'>kreiraj nalog sada</h2>
            <h4 className='text-dark'>i postani deo realestate sistema</h4>
        </Container>
    </>
    )
}

export default HomeScreen