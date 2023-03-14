// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {promises as fs} from 'fs'
import path from 'path'

export default async function handler(req, res) {
    const { data } = req.query
    const filePath = path.join(process.cwd(), `public` ,`data`)
    if(!fileContent) return res.status(404).json({message: 'Not Found'})
    const fileContent = (await fs.readFile(filePath + `/${data}.json`, `utf-8`))
    res.status(200).json(JSON.parse(fileContent))
  }