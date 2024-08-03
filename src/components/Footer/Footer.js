import React from 'react';
import { Button } from 'primereact/button';

export default function Footer() {
  return (
    <div className="bg-pink-950 text-white py-8 px-6">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <div className="text-2xl font-bold">
            <span>
             <h1 className='text-center'>NEC MULTI-PURPOSE</h1>
             <h2 className='text-center'>COOPERATIVE</h2>
            </span>
          </div>
        </div>
        <div className='w-full md:w-1/4 mb-6 md:mb-0 space-y-4'>
      
        <ul>
        <Button  label="Company Profile" link onClick={() =>  window.open('https://necmpc.com/company-profile/', '_blank')} />
        </ul>
        <ul>
        <Button  label="Governance" link onClick={() =>  window.open('https://necmpc.com/governance/', '_blank')} />
        </ul>
        <ul>
        <Button  label="Management Team" link onClick={() =>  window.open('https://www.facebook.com/necmpctaguig', '_blank')} />
        </ul>
        <ul>
        <Button  label="Contact Us" link onClick={() =>  window.open('https://necmpc.com/', '_blank')} />
        </ul>
        </div>
        <div className="w-full md:w-1/4 mb-6 md:mb-0 space-y-4">
          <h3 className="text-lg font-semibold mb-2">Social Media</h3>
          <ul>
          <Button  label="Facebook" link onClick={() =>  window.open('https://www.facebook.com/necmpctaguig', '_blank')} />
          </ul>
        </div>  
      </div>
    </div>
    
  );
}
