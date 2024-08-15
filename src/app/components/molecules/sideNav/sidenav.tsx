'use client'

import NavLinks from '@/app/components/atoms/navLinks/navLinks';
import { PowerIcon } from '@heroicons/react/24/outline';
import FullHouseLogo from '../../atoms/logo/fullHouseLogo';
import SettingsButton from '../../atoms/settingsButton/SettingsButton';
import { signOut } from 'next-auth/react';

const SideNav = () => {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="mb-2 flex h-20 items-center justify-center rounded-md bg-custom p-4 md:h-40">
        <FullHouseLogo />
      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <SettingsButton />
        <button onClick={() => signOut()} className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-red-100 hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3">
          <PowerIcon className="w-6" />
          <div className="hidden md:block">Salir</div>
        </button>
      </div>
    </div>
  );
}

export default SideNav;
