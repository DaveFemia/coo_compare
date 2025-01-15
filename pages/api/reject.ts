import { NextApiRequest, NextApiResponse } from 'next';
import { rename } from 'fs/promises';
import axios from 'axios';
import { io } from 'socket.io-client';
import { readdirSync } from 'fs';

const socket = io('http://localhost:8087');
// const socket = io('http://10.230.150.218:3000')
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { dirName } = req.query;
  
  if (!dirName) {
    res.status(400).send('Directory name is required');
    return;
  }
  try {
    await rename(`public/${dirName}`, `public/${dirName}_completed`);
    const directories1 = readdirSync('public', { withFileTypes: true }).filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name);
    console.log(`Approving ${dirName}`);
    const directories = directories1.filter((dir) => dir.includes('complete')===false);
    socket.emit('variableFromReject', directories);
    socket.emit('logging', `${dirName} has been rejected`);
    const data = {
      "status": "rejected",
      "isbn": dirName
    };
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://10.79.28.74:51088/scripting/approval',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
    res.status(200).json({ status: 'rejected', dirName });
  } catch (e) {
    console.error(e);
    res.status(500).send('Error approving directory');
  }
}