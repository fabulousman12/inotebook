import React, { useState, useEffect } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import '../Imagemodel.css';
import { Buffer } from 'buffer';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const Category = ({ imageArray, name, category, comment }) => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageUrls, setImageUrls] = useState([]);

    const bufferToBase64 = (buffer) => {
        return Buffer.from(buffer).toString('base64');
    };

    useEffect(() => {
        if (imageArray.length > 0) {
            const urls = imageArray.map(image => {
                try {
                    const base64String = bufferToBase64(image.data);
                    return `data:${image.contentType};base64,${base64String}`;
                } catch (error) {
                    console.error('Error converting buffer to base64:', error);
                    return null;
                }
            }).filter(url => url !== null);

            setImageUrls(urls);
        }
    }, [imageArray]);

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
        <>
            {imageUrls.length > 0 && (
                <div className="col-md-4 my-4 d-flex align-items-stretch">
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
                        </div>
                    </div>
                </div>
            )}

            {lightboxOpen && (
                <Lightbox
                    mainSrc={imageUrls[currentImageIndex]}
                    nextSrc={imageUrls[(currentImageIndex + 1) % imageUrls.length]}
                    prevSrc={imageUrls[(currentImageIndex + imageUrls.length - 1) % imageUrls.length]}
                    onCloseRequest={closeLightbox}
                    onMovePrevRequest={() =>
                        setCurrentImageIndex((currentImageIndex + imageUrls.length - 1) % imageUrls.length)
                    }
                    onMoveNextRequest={() =>
                        setCurrentImageIndex((currentImageIndex + 1) % imageUrls.length)
                    }
                    toolbarButtons={[
                        <button
                            key="downloadAll"
                            className="btn btn-info"
                            style={{
                                color: 'white',
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                marginLeft: '10px',
                            }}
                            onClick={downloadAllImagesAsZip}
                        >
                            <i className="fa fa-download me-2"></i>
                            Download All
                        </button>
                    ]}
                />
            )}
        </>
    );
};

export default Category;
