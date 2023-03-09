import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image';
import dcLogo from '../../public/DC Logoo.gif';
import Spotify from '@/components/Spotify'
import Head from 'next/head'

const User = () => {
  const [data, setData] = useState(null);
  const [dcData, setDcData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const router = useRouter()
  const { slug } = router.query

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/${slug}`)
      .then(res => {
        setData(res.data)
        setLoading(false);
      })
      .catch(err => {
        console.log(err)
      })
  }, [slug])

  const dcid = data?.data?.discord_id

  // Data from LanYard API
  useEffect(() => {
    setLoading(true);
    fetch(`https://api.lanyard.rest/v1/users/${dcid}`)
      .then((res1) => res1.json())
      .then((dcData) => {
        setDcData(dcData);
        setLoading(false);
      });
  }, [dcid]);

  console.log(dcData)
  console.log(data)

  const name = dcData?.data?.discord_user?.username

  const today = new Date();
  let year = today.getFullYear();
  // Checking if the birthday is today
  if (today.getMonth == 9 && today.getDate == 13) {
    year = year + 1;
  }
  // Getting date of birth for next year
  const bday = data?.data?.birthday
  const birthdate = new Date(year, bday?.month, bday?.day);
  // Get the number of milliseconds in 1 day
  const one_day = 1000 * 60 * 60 * 24;
  // Get the remaining amount of days
  const remainingDays = Math.ceil((birthdate.getTime() - today.getTime()) / (one_day));



  if (isLoading) return <div className='w-screen h-screen flex justify-center items-center'>
    <Image src={"/faizan.png"} width={60} height={60} alt="HelloFaizan Splach Screen Logo"></Image></div>

  if (dcData?.success == false || dcData?.error?.code == "user_not_monitored") {
    return (
      <div className='flex justify-center items-center w-full h-screen text-lg font-sans font-semibold'>
        <p>User not signed up yet. Read <span><Link className='text-yellow-400 hover:scale-[1.05]' href={`/`}>Documentation </Link></span><i className='bi bi-journal-code text-yellow-400'></i></p>
      </div>
    )
  }

  if (dcData?.success == true && data?.success == true) {
    return (
      <>
        <Head>
          <title>{name} | Shareable Links</title>
          <meta name="description" content={`Shareable Links for Discord, Spotify, and more! of ${name}`} />
          <meta name="keywords" content="Shareable Links, Discord, Spotify, Github, Twitter, Instagram, Facebook, YouTube" />
          <meta name="author" content="HelloFaizan" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta property="og:title" content={`${name} | Shareable Links`} />
          <meta property="og:description" content={`Shareable Links for Discord, Spotify, and more! of ${name}`} />
          <meta property="og:image" content={data?.data?.cards?.feature?.image} />
          <meta property="og:url" content={`https://l.hellofaizan.me/${slug}`} />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Linka" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@HelloFaizandev" />
          <meta name="twitter:creator" content="@HelloFaizandev" />
          <meta name="twitter:title" content={`${name} | Shareable Links`} />
          <meta name="twitter:description" content={`Shareable Links for Discord, Spotify, and more! of ${name}`} />
          <meta name="twitter:image" content={data?.data?.cards?.feature?.image} />
          <link rel="icon" href={data?.data?.image} />

        </Head>
        {/* Main Card */}
        <div className='main w-screen h-auto flex justify-center items-start'>
          <div className='md:rounded-xl pt-5 pb-5 pl-2 pr-2 md:p-4 w-screen md:h-auto flex flex-col bg-white dark:bg-[#151515] md:dark:bg-[#1c1c1c] md:mt-10 md:mb-10 md:shadow-lg md:w-2/5'>

            {/* Profile Card */}
            <div className="top mt-3 justify-center w-full flex flex-col items-center">

              <Image className='rounded-full md:hover:scale-105' src={data?.data?.image} width={80} height={80} alt="HelloFaizan Logo" placeholder='/faizan.png' priority></Image>
              <div className='mt-3 flex items-end justify-center'>
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
            </div>

            {/* Social Card */}
            <div className='flex space-x-5 mt-3 text-2xl mb-7 items-center justify-center'>
              {data?.data?.socials?.map((socials) => (
                <div key={`${socials.icon}`} className='md:hover:scale-105'>
                  <Link href={`${socials.link}`} target="_blank"><i className={`bi bi-${socials.icon} hover:text-yellow-400 cursor-pointer`}></i></Link>
                </div>
              ))}
            </div>

            {/* Card 1 */}
            <div className='grid mb-5 grid-cols-3 space-x-3'>
              {/* One */}
              <div className='col-span-2 relative space-x-2 font-semibold flex text-black dark:text-white justify-center items-center rounded-lg bg-[#ececec] dark:bg-[#282828] shadow-md overflow-hidden pt-10 pb-10 pl-2 pr-2'>
                <p className='text-sm text-center'>{/* If else */}
                  {dcData && dcData.data.activities[0] && dcData.data.activities[0].emoji ? (
                    <span className='text-xs font-mono'>{dcData.data.activities[0].emoji.name} {dcData.data.activities[0].state}</span>

                  ) : (
                    <span className='text-xs font-mono'>👋 No status available. Am I alive?</span>
                  )}</p>
              </div>
              {/* Two */}
              <div className='md:col-span-1 bg-[#3478cc] text-white rounded-lg shadow-md flex flex-col justify-center items-center'>
                <div className='flex justify-center place-items-baseline'>
                  <p className='text-[20px] drop-shadow-lg md:text-4xl'>{remainingDays}</p>
                  <p className=' drop-shadow-lg'>days</p>
                </div>
                <p className='text-[10px] md:text-sm  drop-shadow-lg'>Untill Birthday</p>
              </div>
            </div>

            {/* IFrame og youtube video */}
            <iframe className='rounded-lg h-[200px] md:h-[300px] shadow-md md:hover:scale-[1.01]' allowFullScreen src={`https://www.youtube.com/embed/${data?.data?.videoId}`}></iframe>

            {/* Card 2 */}
            <div className='grid grid-cols-1 mt-5 md:grid-cols-3 md:gap-2'>
              {/* DC logo */}
              <div className='hidden md:block justify-center items-center rounded-lg'>
                <Link className='rounded-lg text-2xl h-full w-full p-5 flex justify-center items-center bg-[#36393e] md:hover:scale-[1.01] cursor-pointer' href={`${data?.data?.dcServer}`} target="_blank">
                  <Image src={dcLogo} height={200} width={200} alt='DC Logo'></Image>
                </Link>
              </div>
              {/* Feature Card */}
              <div className="ytCard relative col-span-2 shadow-md rounded-lg overflow-hidden">
                <Link href={data?.data?.cards?.feature?.link} passHref>
                  <p class="whitespace-nowrap absolute right-3 top-3 rounded-full bg-purple-100 px-2.5 py-0.5 text-[10px] text-purple-700">
                    What&apos;s New
                  </p>
                  <Image src={data?.data?.cards?.feature?.image} alt='BG Image' width={400} height={200}></Image>
                  <p className='absolute bottom-0 left-0 ml-3 mb-2'>{data?.data?.cards?.feature?.title}</p>
                </Link>
              </div>
            </div>

            {/* All Links */}
            <div className='mt-5'>
              {data?.data?.tabs.map((links) => (
                <div key={`${links.title}`} className='card hover:scale-[1.01] flex justify-center items-center p-5 dark:bg-[#282828] bg-[#ececec] dark:hover:bg-[#36393e] hover:bg-[#f5f3f3] mb-2 rounded-lg'>
                  <Link href={links.link} passHref>
                    <p>{links.title}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Spotify id={dcid} />
      </>
    )
  }


  return (
    null
  )
}

// const getStaticPaths = async () => {
//   const filePath = path.join(process.cwd(), `public` ,`data`)
//   const fileContent = await (await fs.readFile(filePath + `/${slug}.json`, `utf-8`))
//   const data = JSON.parse(fileContent)

//   return {
//     data,
//     fallback: false
//   }
// }


export default User
