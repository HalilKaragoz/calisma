import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Silbuton from './silbuton.png';
import { Helmet } from 'react-helmet';
function Yazarkarti() {
  const [yazarlar, setYazarlar] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    
    const sessionIdCookie = document.cookie
      .split('; ')
      .find(cookie => cookie.startsWith('access_token'));
    setIsLoggedIn(!!sessionIdCookie);
    
  }, []);
  useEffect(() => {
    const getYazarlar = async () => {
      try {
        const response = await axios.get('https://burdahaberajansi.com/api/users');
        // API'den gelen yanıtı konsola loglayın
        console.log(response);
        // Eğer response.data bir dizi ise, yazarlar state'ini güncelleyin
       
          setYazarlar(response.data);
       
      } catch (error) {
        console.error(error);
      }
    };
  
    getYazarlar();
  }, []);

  const handleDelete = async (id) => {
    try {
      console.log(id);
      await axios.delete(`https://burdahaberajansi.com/api/users/yazarsil/${id}/`);
      setYazarlar(yazarlar.filter((yazar) => yazar.id !== id));
      alert("başarıyla silindi.")
    } catch (error) {
    
    }
  };

  return (
    <>
        <Helmet>
 
  <title>Burda Haber Ajansı</title>
  <meta name="description" content="Burda Haber Ajansı Doğru Haber, Hızlı Bilgi, Balıkesir Son Dakika Haberleri, Balıkesir Güncel Haber, Balıkesir Son Haberler, Ayvalık Son Haberler, Sarımsaklı Tüm Haberler, Spor, Ekonomi, Siyaset, Balıkesir Yerel Haberleri, Balıkesirde Yaşam ına Dair Her Şey..." />
  <meta name="keywords" content="Doğru Haber, Hızlı Bilgi, Gerçek Haber, Haber, Haber Oku, Haberler, Balıkesir Son Dakika Haberleri, Balıkesir Güncel Haber, Balıkesir Son Haberler, Ayvalık Son Haberler, Sarımsaklı Tüm Haberler, Spor, Ekonomi, Siyaset, Balıkesir Yerel Haberleri, Balıkesirde Yaşam  " />
  <link rel="icon" href="/websitelogoiki.jpg" type="image/jpg"></link>
  <meta property="og:url" content="https://burdahaberajansi.com" />
  <meta property="og:type" content="article" />

<meta name="twitter:url" content="https://x.com/ayvalikburda?s=21" />
<meta name="author" content="Halil Karagöz"></meta>
</Helmet> 
    <div className='yazarlarliste'>
      {yazarlar.map((yazar) => (
        <div key={yazar.id} className='yazarekleyazar'>
          
          <div className='yazarfotogrfi'>
            <img className="yazarfotografayar" src={yazar.yazarfotografi} alt={yazar.isim} />
          </div>
          <div className='yazarpaylasim'>
            <h1 className='yazarbaslikii'>{yazar.issoyisim}</h1>
            <p>{yazar.unvan}</p>
       
            {isLoggedIn && (
            <button onClick={() => handleDelete(yazar.id)}>
              <img src={Silbuton} alt='Sil' />
            </button>
             )}
          </div>
        </div>
      ))}
    </div>
    </>
  );
}

export default Yazarkarti;
