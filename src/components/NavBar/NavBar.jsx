
'use client'
import React, { useState } from 'react';
import { Disclosure, Menu } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import MiniNavBar from './MiniNavBar';
import { useSession, signOut, signIn } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import AdminPage from '@/app/dashboard/admin/page';
import CartBox from '../Cart/CartBox/CartBox'; // Import CartBox component
import { FiShoppingCart } from "react-icons/fi";


const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Blogs', href: '/blog-post/view-all-blogs', current: false },
  { name: 'Pages', href: '/pages', current: false },
  { name: 'Calendar', href: '#', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function NavBar() {
  const pathName = usePathname();
  const session = useSession();
  const [toggle, setToggle] = useState(false);

  if (pathName.includes('dashboard')) {
    return <div></div>;
  }
  if (pathName.includes('/dashboard/seller')) {
    return <div></div>;
  }
  if (pathName.includes('/dashboard/admin')) {
    return <div> <AdminPage /> </div>;
  }

  // Function to toggle CartBox visibility
  const handleCartToggle = () => {
    setToggle(!toggle);
  };

  // Function to close CartBox
  const handleCloseCart = () => {
    setToggle(false);
  };

  return (
    <div>
      <MiniNavBar />
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <Link href={'/'} className="flex flex-shrink-0 items-center">
                    <Image
                      alt="Your Company"
                      src="/logo/nmdn.png"
                      className="h-8 w-auto"
                      height={50}
                      width={50}
                    />
                  </Link>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          // onClick={()=> item.current=true}

                          key={item.name}
                          href={item.href}
                          className={classNames(

                            item.href === pathName ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    onClick={handleCartToggle} // Toggle CartBox visibility on click
                    type="button"
                    className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">View cart</span>
                    <FiShoppingCart className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  {session?.data?.user ? (
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <Image width={55} height={55}
                            alt=""
                            src={session?.data?.user?.image?.photo || '/assets/avatar4.jpg'}
                            className="h-8 w-8 rounded-full"
                          />
                        </Menu.Button>
                      </div>
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item as="div" className="px-4 py-2">
                          <p className="text-sm text-gray-700">{session.data?.user.name}</p>
                          <p className="text-xs text-gray-500">{session.data?.user.email}</p>
                          <p className="text-xs text-gray-500">status: {session.data?.user.role}</p>
                        </Menu.Item>
                        <Menu.Item as="Link" href="/dashboard/seller" className="block px-4 py-2 text-sm text-gray-700">
                          <Link href={`/dashboard/${session.data?.user?.role}`}>Dashboard</Link>
                        </Menu.Item>
                        <Menu.Item as="Link" href="/dashboard/seller" className="block px-4 py-2 text-sm text-gray-700">
                          <Link href={`/`}>Update Profile</Link>
                        </Menu.Item>
                        <Menu.Item as="a" href="#" onClick={() => signOut()} className="block px-4 py-2 text-sm text-gray-700">
                          Sign out
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  ) : (
                    session.status === 'loading' ? <h1 className='text-white'>loading...</h1> : <button
                      onClick={() => signIn()}
                      className="text-sm text-white bg-blue-600 px-4 py-2 rounded-md"
                    >
                      log in
                    </button>
                  )}
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {/* Conditionally render the CartBox */}
      {toggle && (
        <div className="fixed top-16 right-0 bg-white shadow-lg p-4 rounded-md w-[300px] z-50 h-[500px] overflow-y-auto">
          <CartBox onClose={handleCloseCart} /> {/* Pass the close function as a prop */}
        </div>
      )}
    </div>
  );
}

/*

'use client'
import React, { useState } from 'react';
import { Disclosure, Menu } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import MiniNavBar from './MiniNavBar';
import { useSession, signOut, signIn } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import AdminPage from '@/app/dashboard/admin/page';
import CartBox from '../Cart/CartBox/CartBox';
import { FiShoppingCart } from "react-icons/fi";

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Blogs', href: '/blog-post/view-all-blogs', current: false },
  { name: 'Pages', href: '/pages', current: false, isDropdown: true },
  { name: 'Calendar', href: '#', current: false },
];

const pagesDropdown = [
  { name: 'All', href: '/pages/all' },
  { name: 'Gallery', href: '/pages/gallery' },
  { name: 'Our Team', href: '/pages/our-team' },
  { name: 'Team Member', href: '/pages/team-member' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function NavBar() {
  const pathName = usePathname();
  const session = useSession();
  const [toggle, setToggle] = useState(false);

  if (pathName.includes('dashboard')) {
    return <div></div>;
  }
  if (pathName.includes('/dashboard/seller')) {
    return <div></div>;
  }
  if (pathName.includes('/dashboard/admin')) {
    return <div> <AdminPage /> </div>;
  }

  const handleCartToggle = () => {
    setToggle(!toggle);
  };

  const handleCloseCart = () => {
    setToggle(false);
  };

  return (
    <div>
      <MiniNavBar />
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <Link href={'/'} className="flex flex-shrink-0 items-center">
                    <Image
                      alt="Your Company"
                      src="/logo/nmdn.png"
                      className="h-8 w-auto"
                      height={50}
                      width={50}
                    />
                  </Link>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) =>
                        item.isDropdown ? (
                          <Menu as="div" key={item.name} className="relative">
                            <Menu.Button
                              className={classNames(
                                'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'rounded-md px-3 py-2 text-sm font-medium'
                              )}
                            >
                              {item.name}
                            </Menu.Button>
                            <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                              {pagesDropdown.map((dropdownItem) => (
                                <Menu.Item key={dropdownItem.name}>
                                  {({ active }) => (
                                    <Link
                                      href={dropdownItem.href}
                                      className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700'
                                      )}
                                    >
                                      {dropdownItem.name}
                                    </Link>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Menu>
                        ) : (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.href === pathName
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    onClick={handleCartToggle}
                    type="button"
                    className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">View cart</span>
                    <FiShoppingCart className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {session?.data?.user ? (
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none">
                          <Image width={55} height={55}
                            alt=""
                            src={session?.data?.user?.image?.photo || '/assets/avatar4.jpg'}
                            className="h-8 w-8 rounded-full"
                          />
                        </Menu.Button>
                      </div>
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 bg-white py-1 shadow-lg">
                        <Menu.Item>
                          <Link href={`/dashboard/${session.data?.user?.role}`} className="block px-4 py-2 text-sm text-gray-700">Dashboard</Link>
                        </Menu.Item>
                        <Menu.Item>
                          <a href="#" onClick={() => signOut()} className="block px-4 py-2 text-sm text-gray-700">Sign out</a>
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  ) : (
                    <button onClick={() => signIn()} className="text-white bg-blue-600 px-4 py-2 rounded-md">Log in</button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>

      {toggle && (
        <div className="fixed top-16 right-0 bg-white shadow-lg p-4 rounded-md w-[300px] z-50 h-[500px] overflow-y-auto">
          <CartBox onClose={handleCloseCart} />
        </div>
      )}
    </div>
  );
}


*/