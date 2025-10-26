// src/components/AuthCallback.js (Minimal Version)
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AuthCallback = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const ADMIN_EMAIL = "atkari.help@gmail.com";

  useEffect(() => {
    if (loading) return;

    if (user) {
      // Redirect based on user role/email
      if (user.email === ADMIN_EMAIL) {
        navigate('/admin/products', { replace: true });
      } else {
        navigate('/homepage', { replace: true });
      }
    } else {
      // No user found after auth flow
      navigate('/auth/login', { replace: true });
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
};

export default AuthCallback;