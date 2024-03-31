import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
const currentYear = new Date().getFullYear();
function Footer  ()  {
  return (

    <footer className="ozelbackg text-white text-center text-lg-start" style={{backgroundColor:'	hsl(180, 7%, 19%)'}}>
    <div className="container p-4">
      <div className="row">
        <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
          <br>
          </br>
          <br>
          </br>
          <br>
          </br>
          <p>
  <strong>İnternet sitesinde yayınlanan yazı, haber ve fotoğrafların izinsiz kopyalanması ve çeşitli platformlarda çoğaltılması yasaktır. Tüm haberler ve editöryel çalışmalar, izin alınmadan ve kaynak gösterilerek dahi iktisap edilemez.</strong>
</p>
        </div>
        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
          <br></br> <br></br>
          <h5 className="text-uppercase">Takip Edin</h5>
         
          <ul className="list-unstyled mb-0">
          <li>
              <a href="mailto:burdahaberajansi@gmail.com" className="text-white link-underline link-underline-opacity-0">Öneri ve Şikayet İçin <FontAwesomeIcon icon={faEnvelope} size="1x" /></a>
            </li>
            
            
            <li>
              <a href="https://x.com/ayvalikburda?s=21" className="text-white  link-underline link-underline-opacity-0" >Twitter   <FontAwesomeIcon icon={faTwitter} size="1x" /></a>
            </li>
            <li>
              <a href="https://www.instagram.com/ayvalikburda?igsh=MXF5MG1rbGVsanZmbA==" className="text-white link-underline link-underline-opacity-0">İnstagram <FontAwesomeIcon icon={faInstagram} size="1x" /></a>
            </li>
            <li>
              <a href="https://www.facebook.com/ayvalikburdaa?mibextid=LQQJ4d" className="text-white link-underline link-underline-opacity-0" >Facebook <FontAwesomeIcon icon={faFacebook} size="1x" /></a>
            </li>
            
          </ul>
        </div>
        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
        <br></br> <br></br>
          <h5 className="text-uppercase mb-0"></h5>
          <ul className="list-unstyled">
            <li>
              <a href="/yazarlar" className="text-white link-underline link-underline-opacity-0">YAZARLARIMIZ</a>
            </li>
            <li>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="container p-4">
        {/* Diğer içerikler */}
      </div>
      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        {/* Telif hakkı yazısı */}
        <span>  &copy; {currentYear} burdahaberajansi.com</span>
      </div>
      
  </footer>
  );
}

export default Footer
