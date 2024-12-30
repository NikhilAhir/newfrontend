import React, { useEffect, useState } from 'react'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
function FlatsOccupiedCount() {
    const [occupiedCount,setOccupiedCount]=useState(0);
    useEffect(()=>{
        const fetchOccupiedCount=async ()=>{
            try {
                const jwtToken = localStorage.getItem('jwt');
                const response = await fetch('http://localhost:8082/api/getAllFlats',
                    {
                        headers: {
                            "Authorization": `Bearer ${jwtToken}`,
                            "Content-Type": "application/json"
                          }
                    }
                );
                if (!response.ok) throw new Error("Failed to fetch flats");
                const data = await response.json();
                const occupiedFlats = data.filter(flat => flat.occupied === true);
                setOccupiedCount(occupiedFlats.length);
            } catch (error) {
                console.error("Error fetching flat count:", error);
            }
        }
        fetchOccupiedCount();
    },[])
  return (
         <div className="flex flex-col w-[20%] p-2 space-y-3 bg-sky-200 rounded-md text-sky-600">
            <div className="flex flex-row justify-between items-center">
                <div className='font-bold text-4xl'>{occupiedCount}</div>
                <div className='rounded-full bg-white p-0.5'><AccountBalanceIcon/></div>
            </div>
            <div className='text-xs text-center'>Total no of Flats Occupied</div>
        </div>
  )
}

export default FlatsOccupiedCount