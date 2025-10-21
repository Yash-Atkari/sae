import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const location = useLocation()
  const { user, userProfile, signOut, isAuthenticated, loading } = useAuth()

  const handleSignOut = async () => {
    const { error } = await signOut()
    if (!error) setIsUserMenuOpen(false)
  }

  const navigation = [
    { name: 'Home', href: '/homepage' },
    { name: 'Products', href: '/product-catalog' },
    { name: 'EMI Calculator', href: '/emi-calculator' },
    { name: 'Referrals', href: '/referral-offers' },
    { name: 'Support', href: '/contact-support' }
  ]

  const isActive = (href) => location?.pathname === href

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              Sahil Mobiles & Enterprises
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation?.map((item) => (
              <Link
                key={item?.name}
                to={item?.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(item?.href)
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-1' :'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item?.name}
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            ) : isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 bg-gray-50 hover:bg-gray-100 rounded-lg px-3 py-2 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {userProfile?.full_name || user?.email?.split('@')?.[0] || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {userProfile?.role || 'Customer'}
                    </p>
                  </div>
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium text-gray-900">
                        {userProfile?.full_name || 'User'}
                      </p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    {/* <button
                      onClick={() => setIsUserMenuOpen(false)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </button> */}
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/auth/login"
                  className="text-gray-700 hover:text-blue-600 font-medium text-sm"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
            {navigation?.map((item) => (
              <Link
                key={item?.name}
                to={item?.href}
                className={`block px-3 py-2 text-base font-medium transition-colors ${
                  isActive(item?.href)
                    ? 'text-blue-600 bg-blue-50' :'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item?.name}
              </Link>
            ))}
            
            {/* Mobile Auth Section */}
            <div className="border-t pt-3 mt-3">
              {loading ? (
                <div className="px-3 py-2 flex items-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="ml-3">Loading...</span>
                </div>
              ) : isAuthenticated ? (
                <>
                  <div className="px-3 py-2 border-b">
                    <p className="text-base font-medium text-gray-900">
                      {userProfile?.full_name || user?.email?.split('@')?.[0] || 'User'}
                    </p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <div className="px-3 space-y-2">
                  <Link
                    to="/auth/login"
                    className="block w-full text-center px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth/signup"
                    className="block w-full text-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header