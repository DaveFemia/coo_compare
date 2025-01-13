import { NextApiRequest, NextApiResponse } from 'next';
import { readdirSync } from 'fs';
import { join } from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const directoryPath = join(process.cwd(), 'public');
  const directories = readdirSync(directoryPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  console.log("IN HANDLER " + directories);
  res.status(200).json(directories);
}