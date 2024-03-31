import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthChecker = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserAuthentication = async () => {
      try {
        // Kullanıcının oturum durumunu kontrol etmek için sunucuya bir istek gönderin
        const res = await axios.get('https://burdahaberajansi.com/api/auth/check');

        // Kullanıcı oturumu geçerli ise isLoggedIn'u true olarak ayarlayın
        setIsLoggedIn(true);
      } catch (error) {
        // Hata oluştuğunda veya oturum geçerli değilse isLoggedIn'u false olarak ayarlayın
        setIsLoggedIn(false);
      } finally {
        // İstek tamamlandığında yükleme durumunu false olarak ayarlayın
        setIsLoading(false);
      }
    };

    // Kullanıcının oturum durumunu kontrol etme işlemini başlatın
    checkUserAuthentication();
  }, []);

  // Kullanıcı oturumu kontrol ediliyor ve yükleme tamamlanmadıysa bir yükleme simgesi gösterin
  if (isLoading) {
    return <div>Yükleniyor...</div>;
  }

  // Kullanıcı oturumu geçerli ise, uygulama içeriğini render edin
  if (isLoggedIn) {
    return <>{children}</>;
  }

  // Kullanıcı oturumu geçerli değilse, giriş sayfasına yönlendirin
  navigate('/login');
  return null;
};

export default AuthChecker;
