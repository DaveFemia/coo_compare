"use client";
import React, { useState } from 'react';
import { AiOutlineCaretLeft,AiOutlineCaretDown } from "react-icons/ai";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
return (
  <div className="border-1">
    <button
      className={`w-full text-left p-4 shadow-lg ${isOpen ? 'bg-green-300 rounded-t-md' : 'bg-gray-200 rounded-md'}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center mx-12 font-bold">
        <span>{title}</span>
        {isOpen ? <div className='hover:scale-110'><AiOutlineCaretDown /></div> : <div className='hover:scale-110'><AiOutlineCaretLeft /></div>}
      </div>
    </button>
    {isOpen && <div className="p-4 border-8 bg-gray-100 rounded-b-md">{children}</div>}
  </div>
);
};

export default AccordionItem;