import React, { useContext, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import { FiSun } from 'react-icons/fi';
import { BsFillCloudSunFill } from 'react-icons/bs';
import { Dialog, Transition, Menu } from '@headlessui/react';
import { RxCross2 } from 'react-icons/rx';
import { useSelector } from 'react-redux';

function Navbar() {
  const context = useContext(myContext);
  const { mode, toggleMode, logout} = context;
  const [open, setOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart);
  const user = JSON.parse(localStorage.getItem('user'));


  return (
    <div className={`sticky top-0 z-50 ${mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      {/* Mobile Menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className={`w-full max-w-xs p-6 overflow-y-auto ${mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">E-MART</h2>
                  <button onClick={() => setOpen(false)}><RxCross2 size={25} /></button>
                </div>
                <div className="mt-6 space-y-6">
                  <Link to="/allproducts" className="block text-lg font-medium hover:text-orange-400">All Products</Link>
                  {user && <Link to="/order" className="block text-lg font-medium hover:text-orange-400">Orders</Link>}
                  {user?.user?.uid === 'HIAhemWgiuMJbDflbHsofpH6CU03' && (
                    <Link to="/dashboard" className="block text-lg font-medium hover:text-orange-400">Admin Dashboard</Link>
                  )}
                  {user ? (
                    <button onClick={logout} className="block text-lg font-medium hover:text-orange-400">Logout</button>
                  ) : (
                    <Link to="/login" className="block text-lg font-medium hover:text-orange-400">Login</Link>
                  )}
                  <Link to="/cart" className="flex items-center hover:text-orange-400">
                    <span className="mr-2">🛒</span>
                    <span>Cart ({cartItems.length})</span>
                  </Link>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Top Banner */}
      <div className={`text-center py-2 text-sm font-medium ${mode === 'dark' ? 'bg-gray-700' : 'bg-orange-400'} text-white`}>
        Get free delivery on orders over 300 TK
      </div>

      {/* Desktop Navbar */}
      <div className="flex items-center justify-between px-6 py-4 shadow">
        {/* Logo */}
        <div className="flex items-center">
          <button
            onClick={() => setOpen(true)}
            className={`lg:hidden mr-4 p-2 rounded ${mode === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-black'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* logo */}
          <Link to="/" className="text-2xl font-bold flex items-center logo">
      <svg width="220" height="70" viewBox="0 0 220 70" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Top-left circle */}
        <circle cx="20" cy="14" r="5" fill="currentColor" />

        {/* Rounded orange square */}
        <rect x="14" y="20" width="36" height="36" rx="6" fill="#FF5722" />

        {/* 'E' inside square */}
        <text x="24" y="47" fontFamily="Arial, sans-serif" fontSize="26" fill="white" fontWeight="bold">E</text>

        {/* '-MART' text */}
        <text x="60" y="47" fontFamily="Arial, sans-serif" fontSize="26" fill="currentColor" fontWeight="bold">-MART</text>

        {/* Top-right yellow circle */}
        <circle cx="190" cy="18" r="5" fill="#FFC107" />
      </svg>
    </Link>
        </div>

        {/* Menu Links */}
        <div className="hidden lg:flex gap-8 text-lg font-medium">
          <Link to="/allproducts" className="hover:text-orange-400">All Products</Link>
          {user?.user?.uid === 'HIAhemWgiuMJbDflbHsofpH6CU03' && (
            <Link to="/dashboard" className="hover:text-orange-400">Admin</Link>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {/* Mode Toggle */}
          <button onClick={toggleMode} className='cursor'>
            {mode === 'light' ? <FiSun size={26} /> : <BsFillCloudSunFill size={26} />}
          </button>

          {/* Country */}
          <div className="hidden lg:flex items-center">
            <img src="https://cdn-icons-png.flaticon.com/128/13980/13980173.png" alt="" className="w-5 h-auto mr-2" />
            <span>Bangladesh</span>
          </div>

          {/* Cart */}
          <Link to="/cart" className="flex items-center gap-1 ">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13L5 19h14M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
            </svg>
            <span className='bg-orange-400 px-1 py-0.2 rounded-full'>{cartItems.length}</span>
          </Link>

          {/* Profile Dropdown */}
          {user ? (
            <Menu as="div" className="relative">
              <Menu.Button className="flex cursor items-center focus:outline-none">
                <img src="https://cdn-icons-png.flaticon.com/128/15339/15339256.png" alt="Profile" className="w-10 h-10 rounded-full" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Menu.Items className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-2 ${mode === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}>
                  <Menu.Item>
                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600">Profile</Link>
                  </Menu.Item>
                  {user && (
                    <Menu.Item>
                      <Link to="/order" className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600">My Orders</Link>
                    </Menu.Item>
                  )}
                
                  <Menu.Item>
                    <button onClick={logout} className="w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600">Logout</button>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-lg font-medium hover:text-orange-400">Login</Link>
              <Link to="/signup" className="text-lg font-medium hover:text-orange-400">Signup</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
