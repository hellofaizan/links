import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Online = (props) => {
    const id = props.id
    const [data, setData] = useState("")
    useEffect(() => {
        axios.get(`https://api.lanyard.rest/v1/users/${id}`)
            .then((res) => {
                setData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        return () => {
            data
        }
    }, [data, id])

    if (data?.data?.active_on_discord_desktop === false && data?.data?.active_on_discord_mobile === false) {
        return (
            <span className="ml-2 w-2 h-2" title={data.data?.discord_status}>
                <span className="absolute w-2 h-2 bg-gray-500 rounded-full animate-ping" />
                <span className="absolute w-2 h-2 bg-gray-500 rounded-full" />
            </span>
        )
    }
    return (
        <span className="ml-2 w-2 h-2" title={data.data?.discord_status}>
            <span className="absolute w-2 h-2 bg-green-500 rounded-full animate-ping" />
            <span className="absolute w-2 h-2 bg-green-500 rounded-full" />
        </span>
    )
}

export default Online