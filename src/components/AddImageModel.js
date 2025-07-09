import React, { useState, useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

const AddImageModal = ({ show, handleClose }) => {
    const { Imgadd,  } = useContext(NoteContext);
    const categories = [,'Maths', 'Physics', 'Bio', 'Chem' , 'Stat' , 'Computer' , 'English' , 'Constituition','Electronics','tech','Biochem','others','personal'];

    const [formData, setFormData] = useState({
        name: '',
        images: [],
        comment: '',
        category: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, images: e.target.files });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, images, comment, category } = formData;
        if (!name || images.length === 0 || !comment || !category) {
            alert('Please fill in all required fields.');
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('name', name);
        formDataToSend.append('comment', comment);
        formDataToSend.append('category', category);
        for (let i = 0; i < images.length; i++) {
            formDataToSend.append('images', images[i]);
        }

        await Imgadd(formDataToSend);
        handleClose();
    };

    return (
        <div className={`modal fade ${show ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: show ? 'block' : 'none' }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content bg-dark text-white p-3">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Image</h5>
                        <button type="button" className="close text-white" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <label className="text-white">Name</label>
                                <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
                            </div>
                            <div className="form-group mb-3">
                                <label className="text-white">Images</label>
                                <input type="file" className="form-control-file" name="images" multiple onChange={handleFileChange} />
                            </div>
                            <div className="form-group mb-3">
                                <label className="text-white">Comment</label>
                                <textarea className="form-control" rows="3" name="comment" value={formData.comment} onChange={handleChange}></textarea>
                            </div>
                            <div className="form-group mb-3">
                                <label className="text-white">Category</label>
                                <select className="form-control" name="category" value={formData.category} onChange={handleChange}>
                                    <option value="">Select category...</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddImageModal;
