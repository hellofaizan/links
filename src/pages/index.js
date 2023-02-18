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

  const today = new Date();
  let year = today.getFullYear();
  // Checking if the birthday is today
  if (today.getMonth == 9 && today.getDate == 13) {
    year = year + 1;
  }
  // Getting date of birth for next year
  const bday = data?.Faizan?.birthday
  const birthdate = new Date(year, bday?.month, bday?.day);
  // Get the number of milliseconds in 1 day
  const one_day = 1000 * 60 * 60 * 24;
  // Get the remaining amount of days
  const remainingDays = Math.ceil((birthdate.getTime() - today.getTime()) / (one_day));

  if (isLoading) return <div className='w-screen h-screen flex justify-center items-center'>
    <Image src={"/faizan.png"} width={60} height={60} alt="HelloFaizan Splach Screen Logo"></Image>
  </div>

  if (!data) return <div className='w-screen h-screen flex justify-center items-center'>
    <Image src={"/faizan.png"} width={60} height={60} alt="HelloFaizan Splach Screen Logo"></Image>
  </div>

  return (
    <>

      {/* Main Card */}
      <div className='main w-screen h-auto flex justify-center items-start'>
        <div className='md:rounded-xl p-5 w-screen md:h-auto flex flex-col bg-white dark:bg-[#151515] md:dark:bg-[#1c1c1c] md:mt-10 md:mb-10 md:shadow-lg md:w-2/5'>

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
                <span className='text-xs font-mono'>👋 No status available. Am I alive?</span>
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

          {/* Card 1 */}
          <div className='grid mb-5 grid-cols-3 space-x-3'>
            {/* One */}
            <Link className='col-span-2 relative space-x-2 font-semibold flex text-black dark:text-white justify-center items-center rounded-lg bg-[#e4e4e4] dark:bg-[#282828] shadow-md overflow-hidden p-10' href={data?.Faizan?.cards?.card1?.link}>
              <p class="whitespace-nowrap absolute right-2 top-2 rounded-full bg-purple-100 px-2.5 py-0.5 text-[10px] text-purple-700">
                What&apos;s New
              </p>
              <p className='text-sm text-center'>{data && data?.Faizan?.cards?.card1?.title}</p>
            </Link>
            {/* Two */}
            <div className='md:col-span-1 bg-[#3478ccb1] text-white rounded-lg shadow-md flex flex-col justify-center items-center'>
              <div className='flex justify-center place-items-baseline'>
                <p className='text-3xl md:text-4xl'>{remainingDays}</p>
                <p>days</p>
              </div>
              <p className='text-xs md:text-sm'>Untill Birthday</p>
            </div>
          </div>

          <iframe className='rounded-lg h-[200px] md:h-[300px] shadow-md' allowFullScreen src={`https://www.youtube.com/embed/${data?.Faizan.videoId}`}></iframe>

          <div className='grid grid-cols-1 mt-5 md:grid-cols-3 gap-2'>

            <div className="ytCard col-span-2 shadow-md">
              <a href={`${data?.Faizan?.youtube}`} className="relative block overflow-hidden rounded-lg bg-[url(https://cdn.discordapp.com/attachments/1065518726855807067/1076462213080043521/2023-01-21_01.png)] bg-cover bg-center bg-no-repeat">

                <div className="relative bg-black bg-opacity-20 p-5 pt-40 text-white">
                  <p className="text-sm font-semibold">I am bad at Youtube & Minecraft</p>
                </div>
              </a>

            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Home