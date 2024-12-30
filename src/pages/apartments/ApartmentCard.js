import { Card } from '@mui/material'
import React from 'react'
import AddHomeIcon from '@mui/icons-material/AddHome';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
function ApartmentCard({ resident }) {
  return (
    <Card className='p-5 w-[20%]'>
        <div className='flex flex-col space-y-2 text-xs text-gray-600'>
            <h1 className='text-lg font-bold text-black'>{resident?.name}</h1>
            <p>Block - {resident?.flatNo[0]}</p>
            <p><AddHomeIcon sx={{fontSize:"1rem"}}/><span className='px-2'>{resident?.flatNo}</span></p>
            <p><ContactPhoneIcon  sx={{fontSize:"1rem"}}/><span className='px-2'>{resident?.phoneNo}</span></p>
            <p><AttachEmailIcon  sx={{fontSize:"1rem"}}/><span className='px-2'>{resident?.email}</span></p>
        </div>
    </Card>
  )
}

export default ApartmentCard