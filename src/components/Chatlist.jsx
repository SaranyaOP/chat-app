import React, {useEffect,useMemo,useState} from 'react'
import defaultAvatar from '../../public/assets/default.jpg';
import { RiMore2Fill } from 'react-icons/ri';
import SearchModal from './SearchModal';
import { formatTimestamp } from '../utils/formatTimestamp';

import chatData from '../data/chats';

const Chatlist = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    // Simulating fetching data from a local JSON file
    setChats(chatData);
  }, []);

  const sortedChats = useMemo(() => {
    return [...chats].sort((a, b) => b.lastMessageTimestamp.seconds - a.lastMessageTimestamp.seconds); 

  },[chats])
  return (
    <section className='relative hidden lg:flex flex-col item-start justify-start bg-white h-[100vh] w-[100%] md:w-[600px] '>
      <header className='flex items-center justify-between w-[100%] lg:border-b border-b-1 border-[#898989b9] p-4 sticky md:static top-0 z-[100]' >
        <main className='flex items-center gap-3'>
          <img src={defaultAvatar} className='w-[44px] h-[44px] object-cover rounded-full' />
          <span>
            <h3 className='p-0 font-semibold text-[#2A3D39] md:text-[17px]'>{"Chatfrik user"}</h3>
            <p className='p-0 font-light text-[#2A3D39] text-[15px]'>@chatfrik</p>
          </span>
        </main>
        <button className='bg-[#D9F2ED] w-[35px] h-[35px] p-2 flex items-center justify-center rounded-lg'>
          <RiMore2Fill color='#01AA85' className='w-[28px] h-[28px]'/>
        </button>
        </header>
        <div className='w-[100%] mt-[10px] px-5'>
          <header className='flex items-center justify-between'>
            <h3 className='text-[16px]'>Messages ({chats?.length || 0})</h3>
            <SearchModal />
            
          </header>
        </div>
        <main className='flex flex-col items-start mt-[1.5rem] pb-3'>
          {sortedChats.map((chat) => ( 
          <button
          key={chat?.uid}
           className='flex items-start justify-between w-[100%] border-b border-[#9090902c] px-5 pb-3 pt-3'>
            {chat.users?.filter((user)=>user?.email!=="baxo@mailinator.com").map((user)=>(
              <>
               <div className='flex items-start gap-3'>
              <img src={user?.image} alt="avatar" className='h-[40px] width-[40px] rounded-full object-cover' />
              <span>
                <h2 className='p-0 font-semibold text-[#2A3d39] text-left text-[17px]'>{user?.fullName || "ChatFrik"}</h2>
                <p className='p-0 font-light text-[#2A3d39] text-left text-[14px]'>{chat?.lastMessage}</p>
              </span>
             
            </div>
            <p className='p-0 font-regular text-gray-400 text-left text-[11px]'>{formatTimestamp(chat?.lastMessageTimestamp)}</p></>
            ))}
          </button> 
          ))}
        </main>
    </section>
  )
}

export default Chatlist