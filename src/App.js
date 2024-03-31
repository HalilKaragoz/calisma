

import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Header from'./pakt/header.jsx'

import Footer from './pakt/footer.jsx'
import Kaydol from "./pakt/kaydol.jsx";
import Girisyap from "./pakt/girisyap.jsx";
import Anasayfa from "./anasayfa.jsx";

import Habersayfa from "./habersayfa.jsx";
import Yaz from "./pakt/yaz.jsx";
import Sayfamevcutdegil from "./pakt/Sayfamevcutdegil.jsx";
import Yazarkarti from "./pakt/assets/yazarkarti.jsx";
import Haberyaz from "./pakt/haberyaz.jsx";
import UserList from "./pakt/assets/Userlist.jsx";
import Userekle from "./pakt/userekle.jsx";
const Duzen = () => {
return(
<>
   <Header/>
   
    <Outlet/>
    <Footer/>
     
     </>
);
  
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Duzen/>,
    children:[
      {
        path:"/",
        element:<Anasayfa/>



    },
   
    
    {
      path:"/kayitsayfasigizliolacakxdrr",
      element:<Kaydol/>



  },
  
{
  path:"/haber/:id",
  element:<Habersayfa/>



},
  {
    path:"/girissayfasigizliolacakxdrr",
    element:<Girisyap/>



},
{
  path:"/yazareklegizli",
  element:<Userekle/>



},
{
  path:"/habergfyazz",
  element:<Haberyaz/>



},
{
  path:"/yazarlar",
  element:<Yazarkarti/>



},
{
  path:"/kullaniciyazarsilsayfagizli",
  element:<UserList/>



},
{
  path:"/write",
  element:<Yaz/>



},

{
  path:"*",
  element:<Sayfamevcutdegil/>



},
    

    ]

  },
]);

function App() {
  return (
    <div className="uygulama">
      
      
      
      <div className="icerik">

      <RouterProvider router={router} />
    </div>


    </div>
    
  );
}

export default App;
