import { Card } from '@mui/material'
import React from 'react'
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
function Complaints() {
  return (
    <Card className="flex flex-col w-[15%] p-2 space-y-2 rounded-md" sx={{color:"gray"}}>
            <div className="flex flex-row justify-between items-center">
                <div className='font-bold text-4xl'>1</div>
                <div className='rounded-full bg-cyan-950 p-0.5 text-white'><LocalPostOfficeIcon/></div>
            </div>
            <div className='text-xs text-center'>Total Complaints</div>
        </Card>
  )
}

export default Complaints