import React, { useState,  useEffect} from 'react'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

function Yaz() {
  const navigate = useNavigate(); 
    const location = useLocation();
    const state = location.state;
    
    const [value, setValue] = useState(state?.desc || '');
    const [title, setTitle] = useState(state?.title || "");
    const [file, setFile] = useState(null);
    const [fileiki, setFileiki] = useState(null);
    const [fileuc, setFileuc] = useState(null);
    const [filedort, setFiledort] = useState(null);
   
    const [cat, setCat] = useState(state?.cat || null);
const [video,setVideo] = useState(state?.video||"")
 
const [userId, setUserId] = useState('');

  useEffect(() => {
    const userIdCookie = document.cookie
      .split('; ')
      .find(cookie => cookie.startsWith('userId='))
      ?.split('=')[1]; // Çerez değerini almak için split('=')[1] ekledim.
      console.log(userIdCookie)
    
    if (userIdCookie) {
      setUserId(userIdCookie);
      console.log(userIdCookie)
     
    }
    else {
        
      alert('Lütfen giriş yapın');
      // Kullanıcı giriş yapmamışsa anasayfaya yönlendir
      navigate('/');
     
    }
  }, [navigate])

    const upload = async () => {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axios.post("https://burdahaberajansi.com/upload", formData);
        return res.data;
      } catch (err) {
        console.error(err);
      }
    };
    const uploadiki = async () => {
      try {
        const formData = new FormData();
        formData.append("file", fileiki); // 'fileiki' değişkenini kullanın
        const res = await axios.post("https://burdahaberajansi.com/uploadimgiki", formData);
        // Sunucu yanıtından sadece dosya adını alın
        const fileName = res.data; // Varsayılan olarak sunucu dosya adını döndürmelidir
        return fileName; // Sadece dosya adını döndür
      } catch (err) {
        console.error(err);
      }
    };
    const uploaduc = async () => {
      try {
        const formData = new FormData();
        formData.append("file", fileuc); // 'fileiki' değişkenini kullanın
        const res = await axios.post("https://burdahaberajansi.com/uploadimguc", formData);
        // Sunucu yanıtından sadece dosya adını alın
        const fileName = res.data; // Varsayılan olarak sunucu dosya adını döndürmelidir
        return fileName; // Sadece dosya adını döndür
      } catch (err) {
        console.error(err);
      }
    };
    const uploaddort = async () => {
      try {
        const formData = new FormData();
        formData.append("file", filedort); // 'fileiki' değişkenini kullanın
        const res = await axios.post("https://burdahaberajansi.com/uploadimgdort", formData);
        // Sunucu yanıtından sadece dosya adını alın
        const fileName = res.data; // Varsayılan olarak sunucu dosya adını döndürmelidir
        return fileName; // Sadece dosya adını döndür
      } catch (err) {
        console.error(err);
      }
    };
  
    const handleClick = async e => {
        e.preventDefault();
        const imgurl = await upload();
        
        console.log(imgurl)
        try {



          const response = state ? await axios.put(`https://burdahaberajansi.com/api/posts/${state.id}`, {
            title,
            desc: value,
            img: file ? imgurl : "",
            cat,
            userId: userId ,
            postId: state.uid,
            video
          }) : await axios.post(`https://burdahaberajansi.com/api/posts/`, {
            title,
            desc: value,
            img: file ? imgurl : "",
            postId: userId,
            cat,
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
           
           
          });
          console.log(response.data);
          alert('Gönderi başarıyla güncellendi!');
        } catch (err) {
          console.error(err);
          alert('Hata');
        }
      };
      const handleClickiki = async e => {
        e.preventDefault();
        const imgikiUrl = await uploadiki(); // 'upload' fonksiyonu imgiki için yükleme yapacak
        console.log(imgikiUrl);
        try {
          // Sadece imgiki sütununu güncelle
          const response = await axios.put(`https://burdahaberajansi.com/api/posts/iki/${state.id}`, {
          imgiki: fileiki ? imgikiUrl : "",
          userId: userId ,
            postId: state.uid
          });
          console.log(response.data);
          alert('Multi medya görseli 1 başarıyla güncellendi!');
        } catch (err) {
          console.error(err);
          alert('Hata!');
        }
      };
      const handleClickuc = async e => {
        e.preventDefault();
        const imgucUrl = await uploaduc(); // 'upload' fonksiyonu imgiki için yükleme yapacak
        console.log(imgucUrl);
        try {
          // Sadece imgiki sütununu güncelle
          const response = await axios.put(`https://burdahaberajansi.com/api/posts/uc/${state.id}`, {
            imguc: fileuc ? imgucUrl : "",
          userId: userId ,
            postId: state.uid
          });
          console.log(response.data);
          alert('Multi medya fotoğrafı iki güncellendi 3 ü yüklemenize gereek yok ama yükleyebilirsiniz.  başarıyla oluşturuldu!');
        } catch (err) {
          console.error(err);
        }
      };
      const handleClickdort = async e => {
        e.preventDefault();
        const imgdortUrl = await uploaddort(); // 'upload' fonksiyonu imgiki için yükleme yapacak
        console.log(imgdortUrl);
        try {
          // Sadece imgiki sütununu güncelle
          const response = await axios.put(`https://burdahaberajansi.com/api/posts/dort/${state.id}`, {
            imgdort: filedort ? imgdortUrl : "",
          userId: userId ,
            postId: state.uid
          });
          alert('multimedya görseli 3  başarıyla güncellendi!');
          console.log(response.data);
        } catch (err) {
          console.error(err);
        }
      };
  return (
   <div className="yaziekle ">
<div className="icerikd " > 
<h1 className='haberbasligiyayinla text-info'> Haber Yayınlama sayfası.<br></br> İŞİNİZ BİTİNCE Yazıyı anasayfaya gidip kontrol etmeyi unutmayın!</h1>
<h1 className='haberbasligiyayinla text-warning'>Alanları düzenledikten sonra boş bir yere tıklayıp sonra güncelleye basın.</h1>
<h1 className='haberbasligiyayinla text-danger'>tüm alanları doldurun. <br></br> Resim yüklemeyi unutmayın.</h1>
<input type='text'value={title} placeholder='Haber Başlığı ' className='haberbasligir  ' onChange={e=>setTitle(e.target.value)} />
<br></br><br></br>
<input type='text'value={video} placeholder='Haber video ' className='haberVideo' onChange={e=>setVideo(e.target.value)} />
<br></br><br></br>
<ReactQuill theme="snow" value={value} onChange={setValue} height={450}    />;
<br></br> <br></br>
</div>
<div className='yazimenu  '>
<br></br><br></br>
<label htmlFor='file'>Haber için Resim yükle</label>
    <input type="file" id='file' name='file' onChange={e=>setFile(e.target.files[0])} />    

<br></br> <br></br>

<div className='kategorisec '>
    
<h1> Kategori seçmeyi unutma</h1>

<div className='radyobutonlar'>
<input type="radio" name='cat' checked = {cat=== "sondakika"} value="sondakika" id='sondak'  onChange={e=>setCat(e.target.value)}/>
<label htmlFor="sondak">Son dakika</label>
<input type="radio" name='cat' checked = {cat=== "guncelhaber"} value="guncelhaber" id='guncel' onChange={e=>setCat(e.target.value)} />
<label htmlFor="guncel">Güncel Haber</label>
<input type="radio" name='cat' checked = {cat=== "balikesir"}  value="balikesir" id='balikesir'onChange={e=>setCat(e.target.value)} />
<label htmlFor="balikesir">Balıkesir</label>
<input type="radio" name='cat' checked = {cat=== "gundem"}  value="gundem" id='gundem' onChange={e=>setCat(e.target.value)}/>
<label htmlFor="gundem">Gündem</label>
<input type="radio" name='cat' checked = {cat=== "siyaset"} value="siyaset" id='siyaset'onChange={e=>setCat(e.target.value)} />
<label htmlFor="siyaset">Siyaset</label>
<input type="radio" name='cat' checked = {cat=== "spor"} value="spor" id='spor' onChange={e=>setCat(e.target.value)}/>
<label htmlFor="spor">Spor</label>
<input type="radio" name='cat' checked = {cat=== "astroloji"} value="astroloji" id='astroloji' onChange={e=>setCat(e.target.value)}/>
<label htmlFor="astroloji">Astroloji</label>
<input type="radio" name='cat' checked = {cat=== "ekonomi"} value="ekonomi" id='ekonomi' onChange={e=>setCat(e.target.value)}/>
<label htmlFor="ekonomi">ekonomi</label>
<input type="radio" name='cat' checked = {cat=== "ayvalik"} value="ayvalik" id='ayvalik' onChange={e=>setCat(e.target.value)}/>
<label htmlFor="ayvalik">ayvalık haber</label>
<input type="radio" name='cat' checked = {cat=== "teknoloji"} value="teknoloji" id='teknoloji'onChange={e=>setCat(e.target.value)} />
<label htmlFor="teknoloji">Teknoloji</label>
<input type="radio" name='cat' checked = {cat=== "magazin"} value="magazin" id='magazin'onChange={e=>setCat(e.target.value)} />
<label htmlFor="magazin">magazin</label>
<input type="radio" name='cat' checked = {cat=== "yasam"} value="yasam" id='yasam'onChange={e=>setCat(e.target.value)} />
<label htmlFor="yasam">yaşam</label>
<input type="radio" name='cat' checked = {cat=== "saglik"} value="saglik" id='saglik'onChange={e=>setCat(e.target.value)} />
<label htmlFor="saglik">saglik</label>
<input type="radio" name='cat' checked = {cat=== "finans"} value="finans" id='finans'onChange={e=>setCat(e.target.value)} />
<label htmlFor="finans">Finans</label>
<input type="radio" name='cat' checked = {cat=== "seyehat"} value="seyehat" id='seyehat'onChange={e=>setCat(e.target.value)} />
<label htmlFor="seyehat">seyehat</label>
<input type="radio" name='cat' checked = {cat=== "turizm"} value="turizm" id='turizm'onChange={e=>setCat(e.target.value)} />
<label htmlFor="turizm">turizm</label>
<input type="radio" name='cat' checked = {cat=== "kultursanat"} value="kultursanat" id='kultursanat'onChange={e=>setCat(e.target.value)} />
<label htmlFor="kultursanat">Kültür Sanat</label>
<input type="radio" name='cat' checked = {cat=== "otomobil"} value="otomobil" id='otomobil'onChange={e=>setCat(e.target.value)} />
<label htmlFor="otomobil">otomobil</label>
<input type="radio" name='cat' checked = {cat=== "yerelhaber"} value="yerelhaber" id='yerelhaber'onChange={e=>setCat(e.target.value)} />
<label htmlFor="yerelhaber">Yerel Haber</label>
</div>
</div>

<div className='butonlar'>


<div className='butonlarihizala'>
<button className='guncellemebuton btn btn-info'onClick={handleClick} >Bütün alanları mutlak doldurun. Güncelle</button>

</div>
<div className='digerimgler'> </div>
<input type="file" id='file' name='fileiki' onChange={e=>setFileiki(e.target.files[0])} />  
<br></br> <br></br>
<button className='guncellemebuton btn btn-info'onClick={handleClickiki} >Multi medya fotoğraf güncelle 1</button>
<br></br> <br></br><br></br> <br></br>
<input type="file" id='file' name='fileuc' onChange={e=>setFileuc(e.target.files[0])} /> 
<br></br> <br></br>
<button className='guncellemebuton btn btn-info'onClick={handleClickuc} >Multi medya fotoğraf güncelle 2</button>
<br></br> <br></br><br></br> <br></br>
<input type="file" id='file' name='filedort' onChange={e=>setFiledort(e.target.files[0])} /> 
 <br></br> <br></br> 
<button className='guncellemebuton btn btn-info'onClick={handleClickdort} >Multi medya fotoğraf3 güncelle</button>
</div>
</div>

   </div>
  )
}

export default Yaz
