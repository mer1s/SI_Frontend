import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './Pages/HomeScreen';
import AdsScreen from './Pages/AdsScreen';
import AboutUsScreen from './Pages/AboutUsScreen';
import { useEffect } from 'react';
import { useState } from 'react';
import AdScreen from './Pages/AdScreen';
import AddAdScreen from './Pages/AddAdScreen';
import LoginScreen from './Pages/LoginScreen';
import ProfileMyAdsScreen from './Pages/ProfileMyAdsScreen';
import { useSelector } from 'react-redux'
import Basket from './Components/Basket';
import { FiX } from 'react-icons/fi'
import RegisterScreen from './Pages/RegisterScreen';
import { Online } from 'react-detect-offline';
import { Offline } from 'react-detect-offline';
import { Container } from 'react-bootstrap';
import ProfileScreen from './Pages/ProfileScreen';
import VerificationScreen from './Pages/VerificationScreen';
import AllUsersScreen from './Pages/AllUsersScreen';
import NotFoundScreen from './Pages/NotFoundScreen';
import UserDetails from './Pages/UserDetails';
import ReportScreen from './Pages/ReportScreen';
function App() {
  const [loading, setLoading] = useState(true)
  
  const [showBasket, setShowBasket] = useState(false);
  // window.onbeforeunload = () => {
  //   localStorage.clear();
  // }

  const userLogin = useSelector(s => s.userLogin);
  const { userInfo } = userLogin

  useEffect(()=>{
    setTimeout(()=>{setLoading(false)}, 1500);
  },[loading])

  return (
    <>
    <Offline>
      <Container fluid className='mh-100 text-light bg-dark d-flex justify-content-center align-items-center flex-column'>
        <h4 className='text-start m-0 p-0'>
          Poštovani, da bi <span className='text-warning'>RealEstate</span> sistem radio ispravno,<br></br> potrebna je stabilna internet konekcija.
          <br></br>Molimo Vas da proverite status Vaše mreže.<br></br> Hvala na razumevanju!
        </h4>
      </Container>
    </Offline>
    <Online>
      <div className="App">
        
          <>
          
          <BrowserRouter>
            {userInfo && showBasket ?  
              <>
              <div className='py-5 px-3 h-100-vh basket-cont'>
                <button onClick={() => setShowBasket(false)} className='btn basket-close btn-danger position-absolute'> <FiX/> </button>
                <Basket
                  basketClose={() => setShowBasket(false)}
                />
              </div>
              </>
            : 
            ''
            }
            <Header 
              basketShow={() => setShowBasket(true)}
              basketClose={() => setShowBasket(false)}
            />
            <Routes>
              <Route path='/' exact element={<HomeScreen/>}/>
              <Route path='/kreiraj-oglas' element={<AddAdScreen/>}/>
              <Route path='/svi-oglasi' element={<AdsScreen/>}/>
              <Route path='/oglas/:id' element={<AdScreen/>}/>
              <Route path='/o-nama' element={<AboutUsScreen/>}/>
              <Route path='/prijava' element={<LoginScreen/>}/>
              <Route path='/registracija' element={<RegisterScreen/>}/>
              <Route path='/profil/moji-oglasi' element={<ProfileMyAdsScreen/>}/>
              <Route path='/profil' element={<ProfileScreen/>}/>
              <Route path='/korisnici' element={<AllUsersScreen/>}/>
              <Route path='/korisnik/:id' element={<UserDetails/>}/>
              <Route path='/verifikacija' element={<VerificationScreen/>}/>
              <Route path='/report/:id' element={<ReportScreen/>}/>
              <Route path='*' element={<NotFoundScreen/>}/>
            </Routes>
            <Footer/>
          </BrowserRouter>
          </>
      </div>
    </Online>
    </>
  );
}

export default App;
