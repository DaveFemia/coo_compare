"use client";
import { io } from 'socket.io-client';
import React, { useEffect, useState } from 'react';
function Hello() {
    const [log, setLog] = useState<string[]>([]);
    console.log("Hello, I'm a component");
    const socket = io('http://prepresscontrolcenter.lsccom.com:8087');
    // const socket = io('http://192.168.50.244:8087');
    useEffect(() => {
        socket.on("clientlogging", (data) => {
            const d = new Date();
            const year = d.getFullYear();
            const month = d.getMonth() + 1;
            const day = d.getDate();
            const hour = d.getHours();
            const minute = d.getMinutes();
            const message = `${month}-${day}-${year} ${hour}:${minute} - ${data}`;
          console.log("In Hello Logging socket: " + data);
          setLog((prevLog) => [message, ...prevLog]);
        });
    
        return () => {
          socket.off("clientlogging");
        };
      }, []);
    return (
        <div>
            <div>
            <h1>Instructions:</h1>
            <p>&nbsp; 1. Compare the Original image and the Adjusted image.</p>
            <p>&nbsp; 2. If both images look the same you can hit the Approve button, otherwise hit reject</p></div>
            <div>
                <h1>Approvals</h1>
                <textarea
                    value={log.join('\n')}
                    readOnly
                    className="w-full h-64 p-2 border rounded resize-none overflow-y-scroll"
                />
            </div>
        </div>
        
    );
}
export default Hello;