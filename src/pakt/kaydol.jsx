import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

const Kaydol = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    isimsoyisim: "",
  });

  const [err, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = e => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!inputs.username || !inputs.password || !inputs.isimsoyisim) {
      setError("Tüm alanları doldurunuz.");
      return;
    }

    try {
      const res = await axios.post("https://burdahaberajansi.com/api/auth/register", inputs);
      console.log(res);
      setError(`Kayıt işlemi başarılı. Kullanıcı ID: ${res.data.userId} bunu lütfen kaydedin!!. Haber oluşturmanıza yarayacak. Kullanıcı ID: ${res.data.userId}` );
      alert('Gönderi başarıyla oluşturuldu! ${res.data.userId} '  );
    } catch (err) {
      console.log(err);
      setError("Kayıt işlemi sırasında bir hata oluştu.");
      alert(setError)
    }
  };

  return (
    <div className='kaydol'>
      <div className='kayitformu'>
        <h1 className='kayitbaslik alert alert-primary '>Kayıt sayfasına hoşgeldiniz.</h1>
        <form>
          <input type='text' placeholder='Kullanıcı adınız' name='username' className='username' onChange={handleChange} />
          <input type='password' placeholder='Şifreniz' name='password' onChange={handleChange} />
          <input type='text' placeholder='İsim ve Soyisim' name='isimsoyisim' onChange={handleChange} />
          <button className="yazarkayitbuton btn btn-secondary" onClick={handleSubmit}>Kayıt</button>
          {err && <p className='uyariyazisi alert alert-danger'>{err}</p>}
        </form>
        <p className='uyariyazisiortala alert alert-warning' >Lütfen bilgileri eksiksiz bir biçimde girip yazar kaydı oluşturun.</p>
      </div>
    </div>
  );
}

export default Kaydol;
