'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  HomeIcon, 
  PlusCircleIcon, 
  BookOpenIcon, 
  CurrencyDollarIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Create Story', href: '/create-story', icon: PlusCircleIcon },
  { name: 'My Stories', href: '/my-stories', icon: BookOpenIcon },
  { name: 'Get Credits', href: '/get-credits', icon: CurrencyDollarIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <div className="sticky top-0 z-40 lg:hidden">
        <div className="flex h-16 items-center gap-x-4 border-b border-purple-200 bg-gradient-to-r from-purple-600 to-blue-600 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-white lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-xl font-bold text-white">TwoTales</h1>
          </div>
        </div>
      </div>

      {/* Off-canvas menu for mobile */}
      {sidebarOpen && (
        <div className="relative z-50 lg:hidden" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-gray-900/80" onClick={() => setSidebarOpen(false)} />
          
          {/* Sidebar */}
          <div className="fixed inset-0 flex">
            <div className="relative mr-16 flex w-full max-w-xs flex-1">
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                <button
                  type="button"
                  className="-m-2.5 p-2.5"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
              
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gradient-to-b from-purple-700 via-purple-600 to-blue-600 px-6 pb-4 ring-1 ring-white/10">
                <div className="flex h-16 shrink-0 items-center">
                  <h1 className="text-2xl font-bold text-white">TwoTales</h1>
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              className={`
                                group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold transition-all duration-200
                                ${pathname === item.href
                                  ? 'bg-white/20 text-white shadow-lg'
                                  : 'text-purple-100 hover:bg-white/10 hover:text-white'
                                }
                              `}
                              onClick={() => setSidebarOpen(false)}
                            >
                              <item.icon
                                className={`h-6 w-6 shrink-0 ${
                                  pathname === item.href ? 'text-white' : 'text-purple-200'
                                }`}
                                aria-hidden="true"
                              />
                              {item.name}
                              {pathname === item.href && (
                                <div className="ml-auto h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                    
                    {/* XP Progress Bar */}
                    <li className="mt-auto">
                      <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/20">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-purple-100">Level 5</span>
                          <span className="text-xs text-purple-200">750/1000 XP</span>
                        </div>
                        <div className="w-full bg-purple-900/50 rounded-full h-2">
                          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full w-3/4 animate-pulse" />
                        </div>
                      </div>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gradient-to-b from-purple-700 via-purple-600 to-blue-600 px-6 pb-4 shadow-xl">
          <div className="flex h-16 shrink-0 items-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
              TwoTales
            </h1>
          </div>
          
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`
                          group flex gap-x-3 rounded-xl p-4 text-sm leading-6 font-semibold transition-all duration-300 transform hover:scale-105
                          ${pathname === item.href
                            ? 'bg-white/20 text-white shadow-lg border border-white/30 backdrop-blur-sm'
                            : 'text-purple-100 hover:bg-white/10 hover:text-white hover:shadow-md'
                          }
                        `}
                      >
                        <item.icon
                          className={`h-6 w-6 shrink-0 transition-colors ${
                            pathname === item.href ? 'text-yellow-300' : 'text-purple-200 group-hover:text-white'
                          }`}
                          aria-hidden="true"
                        />
                        {item.name}
                        {pathname === item.href && (
                          <div className="ml-auto flex items-center space-x-1">
                            <div className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
                            <div className="h-1 w-1 rounded-full bg-yellow-300 animate-ping" />
                          </div>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              
              {/* Achievements Section */}
              <li>
                <div className="text-xs font-semibold leading-6 text-purple-200 mb-2">Achievements</div>
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                      <span className="text-xs font-bold text-purple-900">🏆</span>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white">Story Master</p>
                      <p className="text-xs text-purple-200">5 stories created</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-6 w-6 rounded bg-yellow-400/20 border border-yellow-400/40 flex items-center justify-center">
                      <span className="text-xs">🎯</span>
                    </div>
                    <div className="h-6 w-6 rounded bg-blue-400/20 border border-blue-400/40 flex items-center justify-center">
                      <span className="text-xs">📚</span>
                    </div>
                    <div className="h-6 w-6 rounded bg-green-400/20 border border-green-400/40 flex items-center justify-center">
                      <span className="text-xs">⚡</span>
                    </div>
                  </div>
                </div>
              </li>

              {/* XP Progress Bar */}
              <li className="mt-auto">
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">Level 5</span>
                    <span className="text-xs text-purple-200">750/1000 XP</span>
                  </div>
                  <div className="w-full bg-purple-900/50 rounded-full h-3 shadow-inner">
                    <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500 h-3 rounded-full w-3/4 shadow-sm relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-purple-200">250 XP to next level</span>
                    <span className="text-xs font-medium text-yellow-300">🔥 5 day streak</span>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
