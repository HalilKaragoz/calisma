import React, { useState,  useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import moment from 'moment';


function Haberyaz() {
  
    const navigate = useNavigate(); 
  const [idvalue,setIdvalue] = useState("");
  const [keywords,setKeywords] = useState("");
    const [value, setValue] = useState( '');
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);
    const [fileiki, setFileiki] = useState(null);
    const [fileuc, setFileuc] = useState(null);
    const [filedort, setFiledort] = useState(null);
   
    const [cat, setCat] = useState( null);
const [video,setVideo] = useState("")
 
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
     
    }else {
        
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
        const imgurliki = await uploadiki();
  const imgurluc = await uploaduc();
  const imgurldort = await uploaddort();
        console.log(imgurl);
        try {
          const response = await axios.post(`https://burdahaberajansi.com/api/posts/`, {
            title,
            desc: value,
            img: file ? imgurl : "",
            imgiki: fileiki? imgurliki:"",
            imguc: fileuc ? imgurluc:"",
            imgdort:filedort?imgurldort:"",
            uid: idvalue,
            cat,
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            video:video,
            keywords:keywords,
          });
          console.log(response.data);
          alert('Gönderi başarıyla oluşturuldu!');
        } catch (err) {
          console.error(err);
          alert('Hata');
        }
      };
     
  return (
   <div className="yaziekle ">
<div className="icerikd " > 
<h1 className='haberbasligiyayinla text-info'> Haber Yayınlama sayfası.<br></br> İŞİNİZ BİTİNCE Yazıyı anasayfaya gidip kontrol etmeyi unutmayın! <br></br> <br></br></h1>
<h1 className='haberbasligiyayinla text-warning'>Alanları düzenledikten sonra boş bir yere tıklayıp sonra güncelleye basın. <br></br> <br></br></h1>
<h1 className='haberbasligiyayinla text-danger'>tüm alanları doldurun. <br></br> Resim yüklemeyi unutmayın. <br></br> <br></br></h1>

<input type='text' placeholder='İd nizi girin ' className='haberid  ' onChange={e=>setIdvalue(e.target.value)} />
<br></br> 
<input type='text' placeholder='Haber Başlığı ' className='haberbasligir  ' onChange={e=>setTitle(e.target.value)} />
<br></br> 
<input type='text' placeholder='Seo için anahtar kelimeler ' className='haberbasligir  ' onChange={e=>setKeywords(e.target.value)} />
<br></br> 
<input type='text' placeholder='Haber video linki  ' className='haberVideo' onChange={e=>setVideo(e.target.value)} />
<p></p>
<br></br> <br></br>
<ReactQuill theme="snow"  onChange={setValue} height={450}    />;
<br></br> <br></br>
</div>
<div className='yazimenu  '>
   
    <input type="file" id='file' name='file' onChange={e=>setFile(e.target.files[0])} />    
<label htmlFor='file'>Haber için Resim mutlaka yükleyin.</label>
<br></br> <br></br> <br></br>
<input type="file" id='file' name='fileiki' onChange={e=>setFileiki(e.target.files[0])} />  
<label htmlFor='fileiki'>Haber muti medya galerisini kullanmak için en az 2 görsel yükleyin.. fotoğraf 1</label>
<br></br><br></br> <br></br>
<input type="file" id='file' name='fileuc' onChange={e=>setFileuc(e.target.files[0])} />  
<label htmlFor='fileuc'>Haber muti medya galerisini kullanmak için en az 2 görsel yükleyin. fotoğraf 2</label>
<br></br><br></br> <br></br>
<input type="file" id='file' name='filedort' onChange={e=>setFiledort(e.target.files[0])} />  
<label htmlFor='filedort'>Haber muti medya galerisini kullanmak için en az 2 görsel yükleyin. fotoğraf 3</label>
<div className='kategorisec '>
<br></br> <br></br>
<h1> Kategori seçmeyi unutma</h1>
<br></br> <br></br>
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
<button className='guncellemebuton btn btn-info'onClick={handleClick} >Haber yayınla</button>

</div>
<div className='digerimgler'> </div>


</div>
</div>

   </div>
  )
}

export default Haberyaz
