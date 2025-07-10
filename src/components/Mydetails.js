import React, { useEffect, useContext, useState, useCallback } from 'react';
import NoteContext from '../context/notes/NoteContext';
import { useHistory } from "react-router";
import Mynotesimg from './Mynotesimage';

const Mydetails = () => {
    const context = useContext(NoteContext);
    const { host, getimg } = context;

    const [user, setUser] = useState({});
    const [userImages, setUserImages] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [offset, setOffset] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            history.push('/login');
            return;
        }

        const fetchUserAndImages = async () => {
            try {
                const response = await fetch(`${host}/api/auth/getuser`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Auth': token
                    }
                });

                if (!response.ok) throw new Error('Failed to fetch user details');
                const userData = await response.json();
                setUser(userData);

                fetchMoreImages(1, userData._id); // initial image fetch

            } catch (error) {
                console.error('Error fetching user or images:', error);
            }
        };

        fetchUserAndImages();
    }, [history, host]);

    const fetchMoreImages = async (page, userId = user._id) => {
        setLoading(true);
        try {
            const data = await getimg(page);
            const userImgs = data.filter(img => img.user === userId);

            if (userImgs.length < 20) {
                setHasMore(false);
            }

            setUserImages(prev => {
                const existingIds = new Set(prev.map(img => img._id));
                const newImages = userImgs.filter(img => !existingIds.has(img._id));
                return [...prev, ...newImages];
            });
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = useCallback(() => {
        if (!hasMore || loading) return;

        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 100) {
            const nextOffset = offset + 1;
            setOffset(nextOffset);
            fetchMoreImages(nextOffset);
        }
    }, [offset, hasMore, loading]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    useEffect(() => {
        const filtered = userImages.filter((img) => {
            const query = searchTerm.toLowerCase();
            return (
                img.name.toLowerCase().includes(query) ||
                img.category?.toLowerCase().includes(query) ||
                img.comment?.toLowerCase().includes(query)
            );
        });
        setFilteredImages(filtered);
    }, [searchTerm, userImages]);

    return (
        <>
            {/* User Info */}
        <div className="container mt-5 d-flex justify-content-center">
    <div className="card shadow-lg rounded-4 border-0 p-4" style={{ maxWidth: '600px', width: '100%', backgroundColor: '#0d1117', color: '#f0f6fc' }}>
        <div className="d-flex flex-column flex-md-row align-items-center gap-4">
            <div className="rounded-circle bg-light d-flex justify-content-center align-items-center" style={{ width: '90px', height: '90px', fontSize: '1.8rem', fontWeight: 'bold', color: '#0d1117' }}>
                {user.name?.charAt(0).toUpperCase() || '?'}
            </div>
            <div>
                <h3 className="fw-bold mb-1">{user.name}</h3>
               <p className="mb-0" style={{ fontSize: '0.95rem', color: '#ffffff' }}>
                    <i className="bi bi-envelope-fill me-2"></i>{user.email}
                </p>
            </div>
        </div>
    </div>
</div>


            {/* Search Bar */}
            <div className="container mb-4 d-flex justify-content-center">
                <input
                    type="text"
                    className="form-control"
                    placeholder="🔍 Search name, category, or comment..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        maxWidth: '500px',
                        padding: '10px 15px',
                        fontSize: '1rem',
                        borderRadius: '8px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                        border: '1px solid #ccc'
                    }}
                />
            </div>

            {/* Image Grid */}
            <div className="Notes container row d-flex justify-content-center">
                {filteredImages.length > 0 ? (
                    filteredImages.map((image) => (
                        <Mynotesimg
                            key={image._id}
                            image={image.images}
                            imageid={image._id}
                            name={image.name}
                            category={image.category}
                            comment={image.comment}
                        />
                    ))
                ) : !loading ? (
                    <p>No images to display.</p>
                ) : null}

                {/* Loader Spinner */}
                {loading && (
                    <div className="col-12 text-center my-4">
                        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}

                {/* No more images */}
                {!hasMore && !loading && filteredImages.length > 0 && (
                    <div className="col-12 text-center my-3">
                        <p>No more images to show.</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default Mydetails;
