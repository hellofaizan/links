import React from 'react'
import Image from 'next/image';
import { useState, useEffect } from 'react'

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

  if (isLoading) return <div className='w-screen h-screen flex justify-center items-center'>
    <Image src={"/faizan.png"} width={60} height={60} alt="HelloFaizan Splach Screen Logo"></Image>
  </div>

  if (!data) return <div className='w-screen h-screen flex justify-center items-center'>
    <Image src={"/faizan.png"} width={60} height={60} alt="HelloFaizan Splach Screen Logo"></Image>
  </div>

  return (
    <>
      {console.log(dcData)}
      {console.log(data)}
    </>
  )
}

export default Home