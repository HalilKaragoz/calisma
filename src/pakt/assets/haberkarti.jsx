import React, { useEffect, useState } from 'react';
import { Await, Link, useLocation } from 'react-router-dom';

import axios from 'axios';
import moment from 'moment';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import { Pagination, } from 'swiper/modules';

function Haberkarti() {
  const [haberler, setHaberler] = useState([]);
  const [isCategorySelected, setIsCategorySelected] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const category = urlParams.get('cat');
    fetchData(category);
    setIsCategorySelected(!!category);
  }, [location]);

  const fetchData = async (cat) => {
    const url = cat
      ? `https://burdahaberajansi.com/api/posts?cat=${cat}`
      : 'https://burdahaberajansi.com/api/posts';
    try {
      const res = await axios.get(url);
      res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setHaberler(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const slides = [];
  for (let i = 0; i < haberler.length; i += 12) {
    slides.push(haberler.slice(i, i + 12));
  }

  const CustomPaging = () => {
    const settings = {
      customPaging: function(i) {
        return (
          <a>
            <Link to={`/haber/${haberler[i].id}`}>
              <img src={haberler[i].img} alt={`Haber ${i + 1}`} />
            </Link>
          </a>
        );
      },
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
      <div className="slider-container">
        {!isCategorySelected && (
          <Slider {...settings}>
            {haberler.map((haber, index) => (
              <div key={index}>
                <Link to={`/haber/${haber.id}`}>
                  <img src={haber.img} alt={`Haber ${index + 1}`} />
                </Link>
              </div>
            ))}
          </Slider>
        )}
      </div>
    );
  };

  return (
    <>
      <div class="iframe-container">
        <iframe src="https://api.genelpara.com/iframe/?symbol=para-birimleri&pb=ETH,USD,EUR,GA,BTC&stil=stil-1&renk=beyaz" title="Döviz ve Altın Fiyatları" frameborder="0" className='justify-content-center'></iframe>
      </div>
      {!isCategorySelected && <CustomPaging />}
      <Swiper
        modules={[Pagination]}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => `<span class="${className}">${index + 1}</span>`,
        }}
        className="mySwiper"
      >
        {slides.map((group, index) => (
          <SwiperSlide key={index}>
            <div className='haberler'>
              {group.map((haber) => (
                <div className='haberekle' key={haber.id}>
                  <Link className="haberlink" to={`/haber/${haber.id}`}>
                    <div className='haberfoto'>
                      <img className="fotografayar" src={`/${haber.img}`} alt='' />
                    </div>
                  </Link>
                  <div className='haberpaylasim'>
                    <Link className="haberlink" to={`/haber/${haber.id}`}>
                      <h1 className='haberbaslik'>{haber.title}</h1>
                      <div dangerouslySetInnerHTML={{ __html: haber.desc }} className='haberparagraf' />
                      <p className='habertarih'>Yayınlanma tarihi: {moment(haber.date).format('DD/MM/YYYY HH:mm')}</p>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <br />
      <br />
    </>
  );
}

export default Haberkarti;