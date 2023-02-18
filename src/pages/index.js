import React from 'react'
import Image from 'next/image';
import { useState, useEffect } from 'react'
import Link from 'next/link';

const Home = () => {
  const [data, setData] = useState(null);
  const [dcData, setDcData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  // Data API
  useEffect(() => {
    setLoading(true);
    fetch('https://api.npoint.io/23fcf747decef3b73021')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  // Lanyard API
  useEffect(() => {
    setLoading(true);
    fetch('https://api.lanyard.rest/v1/users/890232380265222215')
      .then((res1) => res1.json())
      .then((dcData) => {
        setDcData(dcData);
        setLoading(false);
      });
  }, []);
  const id = dcData?.data?.discord_user?.id
  const avatar = dcData?.data?.discord_user?.avatar
  const name = dcData?.data?.discord_user?.username

  if (isLoading) return <div className='w-screen h-screen flex justify-center items-center'>
    <Image src={"/faizan.png"} width={60} height={60} alt="HelloFaizan Splach Screen Logo"></Image>
  </div>

  if (!data) return <div className='w-screen h-screen flex justify-center items-center'>
    <Image src={"/faizan.png"} width={60} height={60} alt="HelloFaizan Splach Screen Logo"></Image>
  </div>

  return (
    <>
      {/* Icons Card */}
      <div className='absolute bottom-0 left-0 py-2 md:block hidden ml-10 mb-5'>
        <div className='flex flex-col ml-10 mb-10 space-y-5'>
          <a href='https://discord.gg/invite/rraBbMQraQ' target="_blank" rel="noreferrer"><i className="bi bi-discord hover:text-blue-500 hover:text-xl"></i></a>
          <a href='https://youtube.com/hellofaizan' target="_blank" rel="noreferrer"><i className="bi bi-youtube hover:text-red-600 hover:text-xl"></i></a>
          <a href='https://github.com/hellofaizan' target="_blank" rel="noreferrer"><i className="bi bi-github hover:text-xl"></i></a>
          <a href='https://www.instagram.com/curiousfaizan/' target="_blank" rel="noreferrer"><i className="bi bi-instagram hover:text-[#ff2bf1] hover:text-xl"></i></a>
          <a href='https://twitter.com/HelloFaizandev' target="_blank" rel="noreferrer"><i className="bi bi-twitter hover:text-blue-500 hover:text-xl"></i></a>
        </div>
      </div>

      {/* Main Card */}
      <div className='main w-screen h-auto flex justify-center items-start'>
        <div className='md:rounded-xl p-5 w-screen md:h-auto flex flex-col bg-white dark:bg-[#151515] md:dark:bg-[#1c1c1c] md:mt-10 md:shadow-lg md:w-2/5'>

          {/* Profile Card */}
          <div className="top mt-2 justify-center w-full flex flex-col items-center">

            <Image className='rounded-full' src={`https://cdn.discordapp.com/avatars/${id}/${avatar}`} width={80} height={80} alt="HelloFaizan Logo" placeholder='/faizan.png' priority></Image>
            <div className='mt-2 flex items-end justify-center'>
              <h1 className='text-3xl font-serif'>{name}</h1>
              <span className='mb-1'>
                {/* If else */}
                {dcData && dcData.data.activities[0] && dcData.data.discord_status == "dnd" ? (
                  <span className='text-red-600 font-bold text-sm flex items-center justify-center'> <i className="bi bi-dot font-bold"></i>DND</span>
                ) : dcData && dcData.data.activities[0] && dcData.data.discord_status == "online" ? (
                  <span className='text-green-500 font-bold text-sm flex items-center justify-center'> <i className="bi bi-dot font-bold"></i>Online</span>
                ) : dcData && dcData.data.activities[0] && dcData.data.discord_status == "idle" ? (
                  <span className='text-yellow-500 font-bold text-sm flex items-center justify-center'> <i className="bi bi-dot font-bold"></i>Idle</span>
                ) : (
                  <span className='text-gray-500 text-sm flex items-center justify-center'> <i className="bi bi-dot"></i>Offline</span>
                )
                }
              </span>
            </div>

            <div className="status">
              {/* If else */}
              {dcData && dcData.data.activities[0] && dcData.data.activities[0].emoji ? (
                <span className='text-xs font-mono'>{dcData.data.activities[0].emoji.name} {dcData.data.activities[0].state}</span>

              ) : (
                <span className='text-xs font-mono'>👋 No status available. Am I alive</span>
              )}
            </div>
          </div>

          {/* Social Card */}
          <div className='flex space-x-5 mt-5 text-2xl mb-5 items-center justify-center'>
            {data?.Faizan?.socials?.map((socials) => (
              <div key={`${socials.icon}`}>
                <Link href={`${socials.link}`} target="_blank"><i className={`bi bi-${socials.icon} hover:text-yellow-400 cursor-pointer hover:text-3xl`}></i></Link>
              </div>
            ))}
          </div>

          <iframe className='rounded-lg h-[200px] md:h-[300px]' allowFullScreen src={`https://www.youtube.com/embed/${data?.Faizan.videoId}`}></iframe>
        </div>
      </div>
      </>
      )
}

      export default Home