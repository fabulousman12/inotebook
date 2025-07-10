import React, { useState, useEffect, useContext } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import NoteContext from '../context/notes/NoteContext';
import '../Imagemodel.css';
import { Buffer } from 'buffer';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import './Imagemodel.css';
const Mynotesimg = ({ image, name, category, comment, imageid }) => {
    const context = useContext(NoteContext);
    const { deleteimg } = context;

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageUrls, setImageUrls] = useState([]);

    const bufferToBase64 = (buffer) => {
        return Buffer.from(buffer).toString('base64');
    };

    useEffect(() => {
        if (image.length > 0) {
            const urls = image.map(imagesin => {
                try {
                    const base64String = bufferToBase64(imagesin.data);
                    return `data:${imagesin.contentType};base64,${base64String}`;
                } catch (error) {
                    console.error('Error converting buffer to base64:', error);
                    return null;
                }
            }).filter(url => url !== null);

            setImageUrls(urls);
        }
    }, [image]);

    const openLightbox = () => setLightboxOpen(true);
    const closeLightbox = () => setLightboxOpen(false);

    const downloadAllImagesAsZip = async () => {
        const zip = new JSZip();
        const imgFolder = zip.folder("images");

        imageUrls.forEach((url, index) => {
            const base64Data = url.split(',')[1];
            const imgName = `${name}_${index + 1}.jpg`;
            imgFolder.file(imgName, base64Data, { base64: true });
        });

        const content = await zip.generateAsync({ type: 'blob' });
        saveAs(content, `${name}_images.zip`);
    };

    return (
        <div className="col-md-4 my-4 d-flex align-items-stretch">
            {imageUrls.length > 0 && (
                <div className="card shadow-sm w-100" style={{ minHeight: '400px', position: 'relative' }}>
                    <img
                        src={imageUrls[0]}
                        alt={name}
                        className="card-img-top"
                        style={{
                            cursor: 'pointer',
                            height: '250px',
                            width: '100%',
                            objectFit: 'cover',
                            borderTopLeftRadius: '5px',
                            borderTopRightRadius: '5px',
                        }}
                        onClick={openLightbox}
                    />
                    <div className="card-body text-white" style={{ backgroundColor: '#1a1a1a', minHeight: '140px' }}>
                        <h5 className="card-title" style={{ fontSize: '1.2rem' }}>
                            {name}
                            {category && category !== 'All' && (
                                <span className="badge bg-secondary mx-2">{category}</span>
                            )}
                        </h5>
                        <p className="card-text" style={{ fontSize: '0.95rem' }}>{comment}</p>
                        <button
                            className="btn btn-danger"
                            style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                padding: '5px 10px',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                            onClick={() => deleteimg(imageid)}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
                </div>
            )}

   {lightboxOpen && (
  <div className="fullscreen-modal" onClick={closeLightbox}>
    <div className="top-buttons" onClick={(e) => e.stopPropagation()}>
      <button className="btn btn-danger" onClick={closeLightbox}>✕ Close</button>
      <button className="btn btn-secondary" onClick={downloadAllImagesAsZip}>
        ⬇ Download 
      </button>
    </div>
    <img
      src={imageUrls[currentImageIndex]}
      alt={`img-${currentImageIndex}`}
      className="fullscreen-image"
      onClick={(e) => e.stopPropagation()}
    />
  </div>
)}

        </div>
    );
};

export default Mynotesimg;
