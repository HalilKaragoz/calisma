import React from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
const Sayfamevcutdegil = () => {
  return (
   
    // Diğer importlar...
    
   
        <div>
          <h1 className='alert alert-danger'>404 - Sayfa Bulunamadı</h1>
          <p className='alert alert-info'>Aradığınız sayfa mevcut değil. Anasayfaya dönmek için aşağıdaki butona tıklayın.</p>
          <br>
      </br>
          <button className='btn btn-dark' onClick={() => window.location.href = '/'}>Anasayfaya Git</button>
      <br>
      </br>
      <br>
      </br>
        </div>
      );
    };
  


export default Sayfamevcutdegil
