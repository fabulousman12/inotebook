import React, { useEffect, useContext, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import Category from './Category';
import { useHistory } from "react-router-dom";
import AddImageModal from './AddImageModel';

const Notesimage = () => {
  const context = useContext(NoteContext);
  const history = useHistory();
  const { getimg, chosecat } = context;

  const [showModal, setShowModal] = useState(false);
  const [images2, setImages2] = useState([]); // Local state to hold images
  const [loading, setLoading] = useState(true); // Spinner state

  useEffect(() => {
    let token = localStorage.getItem('token');

    async function fetchData() {
      if (token) {
        try {
          const data = await getimg();
          setImages2(data);
        } catch (error) {
          console.error('Error fetching images:', error);
        } finally {
          setLoading(false);
        }
      } else {
        history.push('/login');
      }
    }

    fetchData();
  }, [history]);

  const filteredImages = images2.filter(image => {
    if (chosecat === 'All') {
      return image.category !== 'personal';
    }
    return image.category === chosecat && image.category !== 'personal';
  });

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="container row">
      <div className="col-9">
        <h2>Displaying {chosecat} notes</h2>
      </div>
      <div className="col-3 text-right row justify-content-end">
        <button className="btn" style={{ backgroundColor: "#ADD8E6", color: 'black' }} onClick={openModal}>
          Add
        </button>
      </div>

      {/* Spinner */}
      {loading ? (
        <div className="col-12 text-center my-5">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {filteredImages.length > 0 ? (
            filteredImages.map((image, index) => (
              <Category
                key={index}
                imageArray={image.images}
                name={image.name}
                category={image.category}
                comment={image.comment}
              />
            ))
          ) : (
            <div className="col-12">
              <p className="text-center">No notes uploaded</p>
            </div>
          )}
        </>
      )}

      <AddImageModal show={showModal} handleClose={closeModal} />
    </div>
  );
};

export default Notesimage;
