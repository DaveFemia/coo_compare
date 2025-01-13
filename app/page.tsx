"use client";

import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Hello from '@/app/components/hello';
import DirectoryComponent from '@/app/components/DirectoryComponent';
import AccordionItem from '@/app/components/AccordionItem';

const socket = io();

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [directories1, setDirectories1] = useState<string[]>([]);
  // const [directories2, setDirectories] = useState<string[]>([]);

  const fetchDirectories = async () => {
    try {
      const response = await fetch('/api/builddir');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setDirectories1(data);
    } catch (error) {
      console.error('Error fetching directories:', error);
    }
  };

  useEffect(() => {
    fetchDirectories();

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });

      // const testing = ["test", "test2", "test3"];
      // socket.emit('variableFromClient', testing);
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("variableFromServer", (data) => {
      console.log(data);
    });
    socket.on("directories", (data) => {
      // setDirectories1((prevDirectories) => [...prevDirectories, ...data]);
      setDirectories1(data);
      console.log("UPDATE "+data);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("directories");
    };
  }, []); // Empty dependency array ensures this runs only once

  const directories = directories1.filter((dir) => !dir.includes('complete'));
  console.log(directories + isConnected + transport);

  return (
    <>
      <div className="container mx-auto px-4 text-black">
        <h1 className="text-3xl">CR reupload approval:</h1>
        {/* <p>Status: {isConnected ? "connected" : "disconnected"}</p>
        <p>Transport: {transport}</p> */}
        <Hello />
        <div className="bg-midnight grid grid-cols-1 md:grid-cols-1 gap-4">
          {directories.map((dir) => (
            <AccordionItem key={dir} title={`Job: ${dir}`}>
              <DirectoryComponent key={dir} dirName={dir} />
            </AccordionItem>
          ))}
        </div>
      </div>
    </>
  );
}