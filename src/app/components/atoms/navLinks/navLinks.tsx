'use client'

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  DocumentArrowUpIcon,
} from '@heroicons/react/24/outline';

import { MdOutlineTableBar } from "react-icons/md";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { UrlObject } from 'url';


// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Menu', href: '/dashboard/menu', icon: DocumentArrowUpIcon },
  { name: 'Empleados', href: '/dashboard/employees', icon: UserGroupIcon },
  { name: 'Mesas', href: '/dashboard/tables', icon: MdOutlineTableBar },
  { name: 'Facturas', href: '/dashboard/invoices', icon: DocumentDuplicateIcon },
];

export default function NavLinks() {

  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-custom2 hover:text-custom md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-custom2 text-custom': pathname === link.href,
                'bg-gray-50' : pathname !== link.href,
              },
            )}>
            <LinkIcon size={25} className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
