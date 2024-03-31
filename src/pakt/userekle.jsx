
import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Userekle = () => {
  const navigate = useNavigate(); 
    const [issoyisim, setIssoyisim] = useState("");
    const [unvan, setUnvan] = useState("");
    const [file, setFile] = useState(null);


    
    const upload = async () => {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axios.post("https://burdahaberajansi.com/uploadimgbes", formData);
        return res.data;
      } catch (err) {
        console.error(err);
      }
    };

    
      const handleClick = async e  => {
        e.preventDefault();
        const imgurl = await upload();
        console.log(imgurl); // Dosya yüklemesi ve URL alınması
        try {
          const response = await axios.post(`https://burdahaberajansi.com/api/users/`, {
            issoyisim,
            unvan,
            img: file ? imgurl :"", // imgurl kullanılıyor
          });
          console.log(response.data);
          alert('Yazar başarıyla listelendi ! ' );
        } catch (err) {
          console.error(err);
          alert('Hata');
        }
      };
   
  return (
    <div className="container mt-3">
 
    <input
      type="text"
      className="issoyisim"
      
      placeholder="İsim ve soyisim giriniz"
    
      onChange={e => setIssoyisim(e.target.value)}
      required
    />
  
    <br></br>
    <br></br>
    <input
      type="text"
      className="unvan"
      
      placeholder="Unvan giriniz"
 
      onChange={e => setUnvan(e.target.value)}
      required
    />
  <br></br>
  <br></br>
    <input
      type="file"
      className="form-control"
      id="file"
      onChange={(e) => setFile(e.target.files[0])}
    />
  <br></br>
    <button onClick={handleClick} className="btn btn-primary mt-3">Gönder</button>
  </div>
)

  }

export default Userekle
