import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const User = () => {
  const router = useRouter()
  // Next Js slug
  const { slug } = router.query

  return (
    <div className='flex justify-center items-center w-full h-screen text-lg font-sans font-semibold'>
      <p>User not syned with us. DM <span><Link className='hover:text-yellow-400 underline hover:decoration-wavy' href={`https://discord.gg/invite/rraBbMQraQ`}>HelloFaizan</Link></span> on <i className='bi bi-discord'></i></p>
    </div>
  )
}

export default User
