// FILE: app/components/DirectoryComponent.tsx
"use client";
import React, {useState} from 'react';
import Image from 'next/image';

interface DirectoryComponentProps {
  dirName: string;
}

const DirectoryComponent: React.FC<DirectoryComponentProps> = ({ dirName }) => {
    // const imagePath = `/${dirName}/image.png`;
    const original = `/CRApproval/${dirName}/${dirName}_original.png`;
    const adjusted = `/CRApproval/${dirName}/${dirName}_adjusted.png`;
    const adjustedhighlight = `/CRApproval/${dirName}/${dirName}_adjusted_highlight.png`;

    const [highlight, setHighlight] = useState(false);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = `CRApproval/api/download?dirName=${dirName}`;
        link.download = `${dirName}.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
      const handleApprove = async () => {
        try {
            const response = await fetch(`CRApproval/api/approve?dirName=${dirName}`, {
              method: 'GET',
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
            //   window.location.reload();
            }
          } catch (error) {
            console.error('Error approving directory:', error);
          }
      };
      const handleReject = async () => {
        try {
            const response = await fetch(`CRApproval/api/reject?dirName=${dirName}`, {
              method: 'GET',
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
            //   window.location.reload();
            }
          } catch (error) {
            console.error('Error approving directory:', error);
          }
      };
  return (
    <div className="container mx-auto border-2 rounded-md p-3">
        <h2>Job: {dirName}</h2>
        <div className="relative mx-auto border-2 grid grid-cols-2">
            <div className="image-container mx-auto">
                <h4>Original:</h4>
                <Image
                className="mx-2"
                src={original}
                style={{ objectFit: 'contain'}}
                width={500}
                height={0}
                alt={`Image in ${dirName}`}
                priority
                />
            </div>
            <div className="image-container mx-auto">
                <h4>Adjusted:</h4>
                <Image
                className="mx-2"
                src={highlight ? adjustedhighlight : adjusted}
                style={{ objectFit: 'contain'}}
                width={500}
                height={0}
                alt={`Image in ${dirName}`}
                priority
                />
            </div>
        </div>
        <div className="flex justify-center m-4">
            <button className="bg-green-300 text-white px-4 py-2 rounded m-2" onClick={handleApprove}>Approve</button>
            <button className="bg-red-300 text-white px-4 py-2 rounded m-2" onClick={handleReject}>Reject</button>
            <button className="bg-gray-300 text-white px-4 py-2 rounded m-2" onClick={handleDownload}>Download</button>
            <label className="flex items-center">
          <input
            type="checkbox"
            className="mr-2"
            checked={highlight}
            onChange={() => setHighlight(!highlight)}
          />
          Highlight Print Code
        </label>
        </div>
    </div>
  );
};

export default DirectoryComponent;