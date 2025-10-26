// src/components/AuthCallback.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AuthCallback = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const ADMIN_EMAIL = "atkari.help@gmail.com";

  useEffect(() => {
    if (user) {
      // Check if user is admin
      if (user.email === ADMIN_EMAIL) {
        navigate('/admin/products');
      } else {
        navigate('/homepage');
      }
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing sign in...</p>
      </div>
    </div>
  );
};

export default AuthCallback;