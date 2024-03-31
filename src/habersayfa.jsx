import React, { useEffect, useState,Component } from 'react';

import Duzenlebuton from './assets/duzenlebuton.png';
import Silbuton from './assets/silbuton.png';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import ReactPlayer from 'react-player'
import {Helmet} from "react-helmet";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  FacebookShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TelegramIcon,
  WhatsappIcon
} from "react-share";
function Habersayfa() {
  const [haberler, setHaberler] = useState({});
 // URL'den postId'yi al
 const location = useLocation();
const postId= location.pathname.split("/") [2]

const shareUrl = `https://burdahaberajansi.com/haber/${haberler.id}`;
const title = haberler.title;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
const navigate = useNavigate();


  useEffect(() => {
    // Kullanıcının oturum durumunu kontrol et
    const sessionIdCookie = document.cookie
      .split('; ')
      .find(cookie => cookie.startsWith('sessionId='));
    setIsLoggedIn(!!sessionIdCookie);
    
  }, []);

  
      // useEffect hook'unu güncelleyin

      useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get(`https://burdahaberajansi.com/api/posts/${postId}`);
            if (res.data && res.status === 200) {
              setHaberler(res.data); // Yanıtın veri kısmını state'e aktar
            } else {
              console.error('Veri alınamadı.');
            }
          } catch (err) {
            console.error(err);
          }
        };
        fetchData();
      }, [postId]);

      useEffect(() => {
        // Belirli bir çerezi oku ve konsola yazdır
        const sessionIdCookie = document.cookie
          .split('; ')
          .find(cookie => cookie.startsWith('sessionId='));
        console.log('sessionId:', sessionIdCookie);
      
        const userIdCookie = document.cookie
          .split('; ')
          .find(cookie => cookie.startsWith('userId='));
        console.log('userId:', userIdCookie);
      }, []);

// React Component içinde
// habersayfa.jsx içinde
const handleDelete = async () => {
  try {
    // DELETE isteğini doğru URL ile gönder
    const response = await axios.delete(`https://burdahaberajansi.com/api/posts/${postId}`);
    console.log(response.data);
    // Silme işlemi başarılıysa, burada kullanıcı arayüzünü güncelleyebilirsiniz.
    navigate('/'); // Kullanıcıyı ana sayfaya yönlendir
  } catch (err) {
    console.error(err);
    // Hata durumunda kullanıcıya hata mesajı göster
  }
};


function HaberSlider({ images }) {
  const settings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`Slide ${index}`} />
        </div>
      ))}
    </Slider>
  );
}
  return (
    <div className='habersayfasi'>
<Helmet>
  {/* Mevcut Meta Taglar */}
  <title>{haberler.title}</title>
  <link rel="icon" href="/websitelogoiki.jpg" type="image/jpg"></link>
  <meta name="description" content={haberler.desc} />
  <meta name="keywords" content={haberler.keywords} />
  <meta property="og:title" content={haberler.title} />
  <meta property="og:description" content={haberler.desc} />
  <meta property="og:image" content={`https://burdahaberajansi.com/${haberler.img}`} />
  <meta property="og:url" content={`https://burdahaberajansi.com/haber/${haberler.id}`} />

 
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="Burda Haber Ajansı" />
  <meta property="article:published_time" content={haberler.date} />
  <meta property="article:author" content={haberler.isimsoyisim} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={haberler.title} />
  <meta name="twitter:description" content={haberler.des} />
  <meta name="twitter:image" content={`https://burdahaberajansi.com/${haberler.img}`} />
  
</Helmet>

  <h1 className='haberbasligi lead text-center display-6'>{haberler.title}</h1>
  <p className='yayinsuresi text-center'>Yayın tarihi: {moment(haberler.date).format('DD/MM/YYYY HH:mm') 
} Yazarı: {haberler.isimsoyisim}  <TelegramShareButton
              url={shareUrl}
              title={title}
              className="telegrampaylasbuton share__some-network__share-button"
            >
              <TelegramIcon size={16} round />
            </TelegramShareButton>
            <FacebookShareButton
              url={shareUrl}
              quote={title}
              className="share__some-network__share-button"
            >
              <FacebookIcon size={16} round />
            </FacebookShareButton>
          
         
            <WhatsappShareButton
              url={shareUrl}
              title={title}
              separator=": "
              className="whatsappbuton share__some-network__share-button"
            >
              <WhatsappIcon size={16} round />
            </WhatsappShareButton> </p>

  {
  haberler.video && (
    
    <ReactPlayer
      url={haberler.video}
      className="react-player"
      controls={true}
      width='320px'
      height='320px'
    />
  )
}



{ haberler.img &&
      <div className='haberfotografi'>
        <img src={`/${haberler.img}`} alt='' className="haberfotograf img-fluid rounded mx-auto"></img>
      </div>
      }
      <div className='habervideo'>  
     
      </div>
      
      <div className='yazaradi'>
       
    
      </div>
      

      {isLoggedIn && (
        <div className='yaziduzenleme'>
         <Link to={`/write?edit=${postId}` } state={haberler} >
  <img src={Duzenlebuton} alt="Düzenle" className='duzenlebutonayar' />
</Link>

          <img onClick={() => handleDelete()} src={Silbuton} alt="Sil" className='silbutonayar'></img>
        </div>
      )}
    
      
       
      <div dangerouslySetInnerHTML={{ __html: haberler.desc }} className='haberyazisi' />
     
    
    
      
{haberler.imgiki || haberler.imguc || haberler.imgdort ? (
  <div className="slideriki">
    <p className='text-center'>Multimedya:</p>
    <HaberSlider images={[
      haberler.imgiki ? `/${haberler.imgiki}` : null,
      haberler.imguc ? `/${haberler.imguc}` : null,
      haberler.imgdort ? `/${haberler.imgdort}` : null
    ].filter(Boolean)} />
  </div>
) : null}


    </div>
    
  );
}

export default Habersayfa;