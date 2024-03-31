import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
const UserList = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate(); 
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
    useEffect(() => {
        // Kullanıcı listesini almak için API çağrısı yap
        axios.get('https://burdahaberajansi.com/api/auth')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => console.error(`Error: ${error}`));
    }, []);

    // Kullanıcıyı silmek için API çağrısı yap
    const deleteUser = (userId) => {
        axios.delete(`https://burdahaberajansi.com/api/auth/${userId}`)
            .then(response => {
                // Silme işlemi başarılıysa, kullanıcı listesini güncelle
                setUsers(users.filter(user => user.id !== userId));
            })
            .catch(error => console.error(`Error: ${error}`));
    };

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
        <div>
            <h2>Kullanıcı Listesi</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <br></br>
                        {user.id}    İsim Soyisim  {user.isimsoyisim} ---  Kullanıcı adı {user.username} 
                        
                        <button onClick={() => deleteUser(user.id)} className='kullanicisilbutonduzenle btn btn-secondary'>   Sil</button>
                   
                    </li>
                ))}
            </ul>

        </div>
        </>
    );
};

export default UserList;
