import { useEffect, useState, useContext } from "react";
import BackContext from "../BackContext";

function Edit() {

    const { modalService, setEditService, setModalService } = useContext(BackContext);


    const [title, setTitle] = useState('');
    const [city, setCity] = useState('');

    useEffect(() => {
        if (null === modalService) {
            return;
        }
        setTitle(modalService.title);
        setCity(modalService.city)
    }, [modalService]);

    const handleEdit = () => {
        const data = { id: modalService.id, title, city};
        setEditService(data);
        setModalService(null);
    }

    if (null === modalService) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Change Service info</h5>
                        <button type="button" className="close" onClick={() => setModalService(null)}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" className="form-control" onChange={e => setTitle(e.target.value)} value={title} />
                            <small className="form-text text-muted">Enter Service title here.</small>
                        </div>
                        <div className="form-group">
                            <label>City</label>
                            <input type="text" className="form-control" onChange={e => setCity(e.target.value)} value={city} />
                            <small className="form-text text-muted">Enter City name here.</small>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-secondary" onClick={() => setModalService(null)}>Close</button>
                        <button type="button" className="btn btn-outline-primary" onClick={handleEdit}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Edit;