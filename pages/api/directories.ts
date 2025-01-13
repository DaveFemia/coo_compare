import { NextApiRequest, NextApiResponse } from 'next';
import { readdirSync } from 'fs';
import { join } from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("IN HANDLER")
  const directoryPath = join(process.cwd(), 'public');
  const directories = readdirSync(directoryPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  res.status(200).json(directories);
}