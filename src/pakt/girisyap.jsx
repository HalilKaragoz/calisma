import React, { useContext, useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';


const Girisyap = () => {
  
  const [inputs, setInputs] = useState({
    username:"",
    password:"",
  });
  
  const [error, setError] = useState("");

  const navigate = useNavigate();
  // 'Authcontext' yerine 'AuthContext' olarak değiştirildi.



  const handleChange = e => { 
    setInputs(prev => ({...prev, [e.target.name]: e.target.value}));
  };

  


  const handleSubmit = async e => {
    e.preventDefault();
    
    try { 
      const res = await axios.post("https://burdahaberajansi.com/api/auth/login", inputs); // 'res' değişkeni tanımlandı.
      
     
      console.log(res);
       
     
      const sessionId = res.data.username;
      const userId = res.data.id;
      console.log(res.data.id);
      // Oturum kimliğini çerez olarak tarayıcıya kaydet
      const expireDate = new Date();
expireDate.setMinutes(expireDate.getMinutes() + 180); // 180 dakika ekleyelim

document.cookie = `sessionId=${sessionId}; path=/; expires=${expireDate.toUTCString()};`;
document.cookie = `userId=${userId}; path=/; expires=${expireDate.toUTCString()};`;

     

      navigate("/");
      alert('Giriş yapıldı !');
      window.location.reload();
    } catch(err) {
      console.log(err);
      if (err.response && err.response.data) {
        setError(err.response.data.error || "Beklenmedik bir hata oluştu.");
      } else {
        setError("Beklenmedik bir hata oluştu.");
      }
    }
  };
  
  return (
    <div className='giris'>
      <h1 className="girisbaslik alert alert-primary ">Giriş sayfasına hoşgeldiniz. İşiniz bitince çıkış yapmayı unutmayın.</h1>
      <form className='girisformu'>
        <input type='text' placeholder='Kullanıcı adınız' name='username' onChange={handleChange}  className='kullaniciadigiris'/>      
        <input type='password' placeholder='Şifreniz' name='password' onChange={handleChange} />
        <button className="girisbutonu btn btn-secondary" onClick={handleSubmit}>Giriş yap</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default Girisyap;
