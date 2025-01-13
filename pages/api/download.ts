import { NextApiRequest, NextApiResponse } from 'next';
import archiver from 'archiver';
// import { createReadStream } from 'fs';
import { join } from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { dirName } = req.query;
  if (!dirName) {
    res.status(400).send('Directory name is required');
    return;
  }

  const directoryPath = join(process.cwd(), 'public', dirName as string);

  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', `attachment; filename=${dirName}.zip`);

  const archive = archiver('zip', {
    zlib: { level: 9 },
  });

  archive.on('error', (err) => {
    throw err;
  });

  archive.pipe(res);
  archive.directory(directoryPath, false);
  archive.finalize();
}