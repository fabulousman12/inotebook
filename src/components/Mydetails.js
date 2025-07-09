import React, { useEffect, useContext, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import { useHistory } from "react-router";
import Mynotesimg from './Mynotesimage';

const Mydetails = () => {
    const context = useContext(NoteContext);
    const { host, getimg, images } = context;
    const [user, setUser] = useState({});
    const [userImages, setUserImages] = useState([]);
  
    let history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if(token){
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token not found');
                }

                // Fetch user details
                const response = await fetch(`${host}/api/auth/getuser`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Auth': token
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user details');
                }

                const userData = await response.json();
                setUser(userData);
                getimg();

                // Filter user images
                const userImages = images.filter(image => image.user === userData._id);
                setUserImages(userImages);
            } catch (error) {
                console.error('Error fetching data:', error);
               
            }
        }else{
            history.push('/login')
        }
        };

        fetchData();
    }, [getimg, history, host, images]);

    return (
        <>
            <div className="container d-flex justify-content-center mt-5">
                <div className="card text-center shadow-lg p-3 mb-5 bg-white rounded" style={{ width: '18rem' }}>
                    <div className="card-header text-white" style={{ backgroundColor: 'black' }}>
                        <h2>User Details</h2>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">User Name: {user.name}</h5>
                        <p className="card-text">Email: {user.email}</p>
                    </div>
                </div>
            </div>
            <div className="Notes container row d-flex justify-content-center">
                {userImages.length > 0 ? (
                    userImages.map((image) => (
                        <Mynotesimg key={image._id} image={image.images} imageid={image._id} name={image.name} category={image.category} comment={image.comment}/>
                    ))
                ) : (
                    <p>No images to display.</p>
                )}
            </div>
        </>
    );
}

export default Mydetails;
