import React, { useEffect, useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddNoticeModal from './AddNoticeModal';
import { Backdrop, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import NoticeCard from './NoticeCard';

function NoticePage() {
  const [openModal, setOpenModal] = useState(false);
  
    const handleOpenModal = () => {
      setOpenModal(true);
    };
  
    const handleCloseModal = () => {
      setOpenModal(false); 
    };
    const role = useSelector(store => store.auth.user?.role);
    const isLoading = useSelector(store => store.notice?.loading);
    const notice = useSelector(store => store.notice?.message);
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        async function fetchAllNotices() {
            try {
                const jwtToken = localStorage.getItem('jwt');
                const response = await fetch("http://localhost:8084/api/getNoticeList", {
                    headers: {
                        "Authorization": `Bearer ${jwtToken}`,
                        "Content-Type": "application/json"
                    }
                });
                const data = await response.json();
                setNotices(data);
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchAllNotices();
    }, [notice]);

    return (
        <div className='p-5'>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            {role === "Admin" ?
                <div className='flex flex-col'>
                    <div className='w-[5rem] h-[5rem] bg-cyan-950 text-white text-xs flex justify-center items-center rounded-lg cursor-pointer' onClick={handleOpenModal}>
                        <AddNoticeModal open={openModal} close={handleCloseModal} />
                        <AddCircleIcon sx={{ fontSize: 'medium', cursor: 'pointer' }} />
                        <span className="cursor-pointer">Add Notice</span>
                    </div>
                </div> : null}
            <div className='py-5'>
                {notices.map((notice) => <NoticeCard key={notice.id} notice={notice} />)}
            </div>
        </div>
    );
}

export default NoticePage;
