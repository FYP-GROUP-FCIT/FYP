import React, { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Typography } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Fixtures', href: '/fixtures' },
  { name: 'Results', href: '/results' },
  { name: 'Hiring', href: '/hiring' },
  { name: 'Register', href: '/team-register' },
];

export default function Example({ loggedIn }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logged, setLoggedIn] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    console.log('>>>>', loggedIn);
    if (!loggedIn) {
      setLoggedIn(localStorage.getItem('token'));
      console.log('>>', loggedIn);
    }
  }, [loggedIn]);
  // const [loggedIn, setLoggedIn] = useState(false); // Track login state
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setLoggedIn(null);
    navigate('/');
    if (window.history && window.history.pushState) {
      window.history.pushState('', null, './');
      window.onpopstate = function () {
        window.history.pushState('', null, './');
      };
    }
  };
  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">FNS Management System</span>
              <img className="h-8 w-auto" src="/images/logo.png" alt="" />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => {
              if (
                item.name === 'Hiring' &&
                !(
                  JSON.parse(localStorage.getItem('user'))?.role === 'MEMBER' ||
                  JSON.parse(localStorage.getItem('user'))?.role ===
                    'PRESIDENT' ||
                  JSON.parse(localStorage.getItem('user'))?.role === 'ADMIN'
                )
              ) {
                return null;
              }
              if (
                item.name === 'Register' &&
                !(
                  JSON.parse(localStorage.getItem('user'))?.role === 'MEMBER' ||
                  JSON.parse(localStorage.getItem('user'))?.role ===
                    'PRESIDENT' ||
                  JSON.parse(localStorage.getItem('user'))?.role === 'ADMIN'
                )
              ) {
                return null;
              }
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  {item.name}
                </Link>
              );
            })}
            {localStorage.getItem('user') &&
              JSON.parse(localStorage.getItem('user'))?.role ===
                'COORDINATOR' && (
                <Link
                  key={'coordinator'}
                  to={'/coordinator-dashboard'}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  {'Coordinator Dashboard'}
                </Link>
              )}
            {localStorage.getItem('user') &&
              (JSON.parse(localStorage.getItem('user'))?.role === 'ADMIN' ||
                JSON.parse(localStorage.getItem('user'))?.role ===
                  'PRESIDENT') && (
                <Link
                  key={'admin'}
                  to={'/admin-dashboard'}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  {'Admin Dashboard'}
                </Link>
              )}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {logged !== null ? ( // Show logout link if logged in
              // <Link
              //   to=""
              //   className="text-sm font-semibold leading-6 text-gray-900"
              // >
              // Log out{' '}
              <span
                aria-hidden="true"
                onClick={handleLogout}
                style={{ cursor: 'pointer' }}
              >
                &rarr;Log out
              </span>
            ) : (
              // </Link>
              <>
                {' '}
                {console.log('>>>', logged)}
                <Link
                  to="/login"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Log in<span aria-hidden="true">&rarr;</span>
                </Link>
              </>
            )}
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <>
                    {navigation?.map((item) => (
                      <Link
                        key={item?.name}
                        to={item?.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        {item?.name}
                      </Link>
                    ))}
                  </>
                </div>

                <div className="py-6">
                  {loggedIn !== null ? ( // Show logout link if logged in
                    <Link
                      to="/logout"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Log out
                    </Link>
                  ) : (
                    // Show login link if logged out
                    <Link
                      to="/login"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Log in
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </div>
  );
}
