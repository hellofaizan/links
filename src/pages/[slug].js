import React from 'react'
import { useRouter } from 'next/router'

const User = () => {
  const router = useRouter()
  // Next Js slug
  const { slug } = router.query

  return (
    <div>
      {slug}
    </div>
  )
}

export default User
