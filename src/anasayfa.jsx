import React from 'react'
import Haberkarti from './pakt/assets/haberkarti'
import {Helmet} from "react-helmet";
function Anasayfa  ()  {
  return (
    <>
    <Helmet>
  {/* Mevcut Meta Taglar */}
  <title>Burda Haber Ajansı</title>
  <meta name="description" content="Burda Haber Ajansı Doğru Haber, Hızlı Bilgi, Balıkesir Son Dakika Haberleri, Balıkesir Güncel Haber, Balıkesir Son Haberler, Ayvalık Son Haberler, Sarımsaklı Tüm Haberler, Spor, Ekonomi, Siyaset, Balıkesir Yerel Haberleri, Balıkesirde Yaşam ına Dair Her Şey..." />
  <meta name="keywords" content="Doğru Haber, Hızlı Bilgi, Gerçek Haber, Haber, Haber Oku, Haberler, Balıkesir Son Dakika Haberleri, Balıkesir Güncel Haber, Balıkesir Son Haberler, Ayvalık Son Haberler, Sarımsaklı Tüm Haberler, Spor, Ekonomi, Siyaset, Balıkesir Yerel Haberleri, Balıkesirde Yaşam  " />
  <link rel="icon" href="/websitelogoiki.jpg" type="image/jpg"></link>
  <meta property="og:url" content="https://burdahaberajansi.com" />
  <meta property="og:type" content="article" />

<meta name="twitter:url" content="https://x.com/ayvalikburda?s=21" />
<meta name="author" content="Halil Karagöz"></meta>
</Helmet> 
    <Haberkarti/>
    
    
    </>
  )
}

export default Anasayfa
