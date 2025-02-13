"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaListAlt, FaRegListAlt } from 'react-icons/fa';
import { IoSettings, IoSettingsOutline } from 'react-icons/io5';
import { MdDashboardCustomize, MdOutlineDashboardCustomize } from 'react-icons/md';
import { RiFileTransferFill, RiFileTransferLine } from 'react-icons/ri';

const Nav = () => {
  const pathname = usePathname();
  const links = [
    {
      iconActive: <MdDashboardCustomize />,
      icon: <MdOutlineDashboardCustomize />,      
      "name": "Dashboard",
      "url": "/dashboard/home",
    },
    {
      iconActive: <RiFileTransferFill />,
      icon: <RiFileTransferLine />,   
      "name": "Transact",
      "url": "/dashboard/transact",
    },
    {
      iconActive: <FaListAlt />,
      icon: <FaRegListAlt />,   
      "name": "History",
      "url": "/dashboard/history",
    },
    {
      iconActive: <IoSettings />,
      icon: <IoSettingsOutline />,   
      "name": "Settings",
      "url": "/dashboard/settings",
    },
  ]
  
  return (
    <nav className='absolute bottom-0 left-0 w-full'>
      <ul className='flex gap-4 flex-row bg-grey-400 h-16 w-full justify-around items-center'>
        {links.map((link) => <li key={link.url}>
            <Link className={pathname === link.url ? "font-bold grid gap-1.5 place-items-center" : "grid gap-1.5 place-items-center"} href={link.url}>
              {pathname === link.url ? link.iconActive : link.icon}
              <p>{link.name}</p>
            </Link>
          </li>)}
      </ul>
    </nav>
  )
}

export default Nav