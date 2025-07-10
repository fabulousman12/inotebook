import React, { useEffect, useContext, useState, useCallback } from 'react';
import NoteContext from '../context/notes/NoteContext';
import Category from './Category';
import { useHistory } from "react-router-dom";
import AddImageModal from './AddImageModel';

const Notesimage = () => {
  const context = useContext(NoteContext);
  const history = useHistory();
  const { getimg, chosecat } = context;

  const [showModal, setShowModal] = useState(false);
  const [images2, setImages2] = useState([]);
  const [offset, setOffset] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/login');
      return;
    }

    fetchMoreImages(offset);
  }, [history]);

  const fetchMoreImages = async (page) => {
    setLoading(true);
    try {
      const data = await getimg(page);

      if (data.length < 20) setHasMore(false);

      setImages2(prev => {
        const existingIds = new Set(prev.map(img => img._id));
        const newImages = data.filter(img => !existingIds.has(img._id));
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
  }, [offset, loading, hasMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const filteredImages = images2.filter(image => {
    const matchesCategory =
      chosecat === 'All' ? image.category !== 'personal' : image.category === chosecat && image.category !== 'personal';

    const matchesSearch = image.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.comment.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="container row">
      <div className="col-12 d-flex flex-wrap justify-content-between align-items-center mt-3 mb-4">
        <h2 className="mb-2">Displaying {chosecat} notes</h2>
        <div className="d-flex flex-wrap gap-2">
          <input
            type="text"
            className="form-control custom-search-input"
            placeholder="🔍 Search by name, category or comment..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              maxWidth: '300px',
              borderRadius: '8px',
              padding: '8px 12px',
              border: '1px solid #ccc',
              fontSize: '1rem',
            }}
          />
          <button
            className="btn"
            style={{ backgroundColor: "#ADD8E6", color: 'black' }}
            onClick={openModal}
          >
            Add
          </button>
        </div>
      </div>

      {/* Spinner */}
      {filteredImages.length === 0 && loading ? (
        <div className="col-12 text-center my-5">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {filteredImages.map((image, index) => (
            <Category
              key={index}
              imageArray={image.images}
              name={image.name}
              category={image.category}
              comment={image.comment}
            />
          ))}

          {loading && (
            <div className="col-12 text-center my-3">
              <div className="spinner-border text-secondary" role="status" style={{ width: '2rem', height: '2rem' }}>
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {!hasMore && (
            <div className="col-12 text-center my-3">
              <p>No more notes to show.</p>
            </div>
          )}
        </>
      )}

      <AddImageModal show={showModal} handleClose={closeModal} />
    </div>
  );
};

export default Notesimage;
