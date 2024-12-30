import React, { useEffect, useState } from 'react'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
function FlatCount() {
    const [flatCount,setFlatCount]=useState(null);
    useEffect(()=>{
        const fetchFlatCount=async ()=>{
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
                setFlatCount(data.length);
            } catch (error) {
                console.error("Error fetching flat count:", error);
            }
        }
        fetchFlatCount();
    })
  return (
    <div className="flex flex-col w-[20%] p-2 space-y-3 bg-blue-300 rounded-md text-blue-600">
            <div className="flex flex-row justify-between items-center">
                <div className='font-bold text-4xl'>{flatCount}</div>
                <div className='rounded-full bg-white p-0.5'><AccountBalanceIcon/></div>
            </div>
            <div className='text-xs text-center'>Total no of Flats</div>
        </div>
  )
}

export default FlatCount