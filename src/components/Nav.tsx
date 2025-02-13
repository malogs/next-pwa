import Link from 'next/link';

const Nav = () => {
  return (
    <nav className='absolute bottom-0 w-full'>
      <ul className='flex gap-4 flex-row bg-grey-400 h-16 w-full justify-center items-center'>
        <li><Link href="/home">Dashboard</Link></li>
        <li><Link href="/transact">Transact</Link></li>
        <li><Link href="/history">History</Link></li>
        <li><Link href="/settings">Settings</Link></li>
      </ul>
    </nav>
  )
}

export default Nav