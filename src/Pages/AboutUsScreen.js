import React from 'react'
import { Container } from 'react-bootstrap'

const AboutUsScreen = () => {
  return (
    <Container fluid className='p-0 m-0'>
      <Container fluid className='d-flex flex-md-row flex-column m-0 p-0'>
        <div className='w-40-md house-interior-bg m-0 p-0 h-50-100'></div>
        <div className='w-60-md bg-dark px-2 px-md-5 d-flex justify-content-center align-items-center h-50-100'>
          <div className='text-light px-md-5 px-2'>
            <h1 className='text-warning'>Nastanak</h1>
            <h5 className='px-md-5 py-3'>RealEstate portal je moderan i prilično mlad portal za besplatno postavljanje oglasa o dostupnim nekretninama.</h5>
            <h5 className='px-md-5'>Sajt je počeo sa radom 2022. godine i do današnjeg dana beleži enorman porast po pitanju korisnika.</h5>
          </div>
        </div>
      </Container>
      <Container fluid className='d-flex p-0 m-0 flex-md-row-reverse flex-column'>
        <div className='w-40-md house-interior-bg m-0 p-0 h-50-100'></div>
        <div className='w-60-md px-2 px-md-5 d-flex justify-content-center align-items-center bg-dark h-50-100'>
          <div className='text-light px-md-5 px-2'>
            <h1 className='text-warning'>Korisnici</h1>
            <h5 className='px-md-5 py-3'>Korisnici RealEstate portala su sve osobe zainteresovane za olakšanom trgovinom nekretninama.</h5>
            <h5 className='px-md-5'>Portal nudi određeni broj mogućnosti koje motivišu korisnike za daljim korišćenjem portala i saradnjom sa drugim korisnicima.</h5>
          </div>
          </div>
      </Container>
      <Container fluid className='d-flex flex-md-row flex-column m-0 p-0'>
        <div className='w-40-md house-interior-bg m-0 p-0 h-50-100'></div>
        <div className='w-60-md px-md-5 px-2 px-md-5 d-flex justify-content-center align-items-center bg-dark h-50-100'>
          <div className='text-light px-md-5 px-2'>
            <h1 className='text-warning'>Podrška</h1>
            <h5 className='px-md-5 py-3'>Administrativni tim RealEstate portala je uvek spreman da pruži pomoć korisnicima kojima je ista pri upotrebi sistema potrebna.</h5>
            <h5 className='px-md-5'>Takođe, ukoliko korisnici imaju kritike o sistemu ili ideje za proširenje sistema, uvek postoji mogućnost razmatranja istih.</h5>
          </div>
          </div>
      </Container>
      <Container fluid className='d-flex p-0 m-0 flex-md-row-reverse flex-column'>
        <div className='w-40-md house-interior-bg m-0 p-0 h-50-100'></div>
        <div className='w-60-md px-md-5 px-2 px-md-5 d-flex justify-content-center align-items-center bg-dark h-50-100'>
          <div className='text-light px-md-5 px-2'>
            <h1 className='text-warning'>Kontakt</h1>
            <h5 className='px-md-5 py-3'>Administrativni tim portala možete kontaktirati koristeći sledeće:</h5>
            <h5 className='px-md-5 text-start'>Broj telefona: 062 826 4606</h5>
            <h5 className='px-md-5 text-start'>Mejl adresa adminstracije: merisahmatovic@gmail.com</h5>
            <h5 className='px-md-5 text-start'>Mejl adresa kreatora: meris.ahmatovic@dilig.net</h5>
          </div>
          </div>
      </Container>
    </Container>
  )
}

export default AboutUsScreen