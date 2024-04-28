'use client'

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

const SettingsButton = () => {

    const pathname = usePathname();
    const settingsHref = '/dashboard/settings';
    const LinkIcon = Cog6ToothIcon;

    return (
        <Link href={settingsHref} className={clsx('flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-custom2 hover:text-custom md:flex-none md:justify-start md:p-2 md:px-3',
            {
                'bg-custom2 text-custom': pathname === settingsHref,
                'bg-gray-50': pathname !== settingsHref,
            },
        )}>
            <LinkIcon className="w-6" />
            <p className="hidden md:block">Configuración</p>
        </Link>
    )
}

export default SettingsButton;