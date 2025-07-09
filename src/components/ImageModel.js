import React,{useRef,useState} from 'react';
import '../Imagemodel.css'  // Import the CSS file for styling
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
const ImageModal = ({ show, onClose, srcString, imageName,imagecat }) => {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    if (!show) {
        return null;
    }
   

    const downloadImage = () => {
        // Create a temporary anchor element
        const downloadLink = document.createElement('a');
        downloadLink.href = srcString;
        downloadLink.download = imageName; // Set the filename for download
        document.body.appendChild(downloadLink);
        downloadLink.click(); // Simulate click to trigger download
        document.body.removeChild(downloadLink); // Clean up
    };
    const viewImage = () => {
        setIsLightboxOpen(true);
    };


    return (
        <div className="modal show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" style={{fontSize:'2rem',color:'black'}}>{imageName}</h5>
                        <button type="button" className="btn-close red-close-button" aria-label="Close" style={{color:"red"}} onClick={onClose}></button>
                    </div>
                    <div className="modal-body position-relative">
                        <img src={srcString} alt={imageName}  onClick={viewImage} className="img-fluid w-100" />
                        <div className="image-title-overlay">
                        <button className="btn btn-primary" onClick={downloadImage}>Download</button>
                        </div>
                    </div>
                </div>
            </div>
            {isLightboxOpen && (
                <Lightbox
                mainSrc={srcString}
                onCloseRequest={() => setIsLightboxOpen(false)}
                toolbarButtons={[
                    <button key="download" className="btn btn-lightbox-download" onClick={downloadImage}>
                        Download
                    </button>
                ]}
                />
            )}
        </div>
    );
};

export default ImageModal;
