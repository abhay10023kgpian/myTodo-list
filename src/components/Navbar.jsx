import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-slate-800 text-white py-2'>
        <div className='logo'>
            <span className='font-bold text-xl mx-8'>myTodo</span>
        </div>
      <ul className='flex gap-5 mx-8'>
        <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all'>Your tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
