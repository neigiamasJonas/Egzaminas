import { useEffect, useState, useContext, useRef } from "react";
import BackContext from "../BackContext";
import getBase64 from '../../../Functions/base64'

function Edit() {

    const { modalWorker, setEditWorker, setModalWorker, services, setDeletePhoto } = useContext(BackContext);


    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [spec, setSpec] = useState('');
    const [service, setService] = useState("0");

    // photo //
    const fileInput = useRef();
    const [photoPrint, setPhotoPrint] = useState(null);

    const doPhoto = () => {
        getBase64(fileInput.current.files[0])
        .then(photo => setPhotoPrint(photo))
        .catch(_ => {
        })
    }

    const handleDeletePhoto = () => {
        setDeletePhoto({id: modalWorker.id})
        // setPhotoPrint(null);
        setModalWorker(w => ({...w, photo: null}))
    }

    useEffect(() => {
        if (null === modalWorker) {
            return;
        }
        setName(modalWorker.name);
        setSurname(modalWorker.surname);
        setSpec(modalWorker.spec);
        setService(services.filter(s => s.title === modalWorker.service && s.city === modalWorker.city)[0].id);
        setPhotoPrint(modalWorker.photo)
    }, [modalWorker, services]);

    const handleEdit = () => {
        const data = {
            
            id: modalWorker.id,
            name,
            surname,
            spec,
            service: parseInt(service),
            photo: photoPrint
        };
        setEditWorker(data);
        setModalWorker(null);
    }

    if (null === modalWorker) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Item Changer</h5>
                        <button type="button" className="close" onClick={() => setModalWorker(null)}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                       <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" onChange={e => setName(e.target.value)} value={name} />
                            <small className="form-text text-muted">Enter your worker Name here.</small>
                        </div>
                        <div className="form-group">
                            <label>Surname</label>
                            <input type="text" className="form-control" onChange={e => setSurname(e.target.value)} value={surname} />
                            <small className="form-text text-muted">Enter your Workers surname here.</small>
                        </div>
                        <div className="form-group">
                            <label>Speciality</label>
                            <input type="text" className="form-control" onChange={e => setSpec(e.target.value)} value={spec} />
                            <small className="form-text text-muted">Enter your Workers speciality here.</small>
                        </div>
                        <div className="form-group">
                            <label>Services</label>
                            <select className="form-control" onChange={e => setService(e.target.value)} value={service}>
                                <option value="0">Please, select Service</option>
                                {
                                    services ? services.map(service => <option key={service.id} value={service.id}>{service.title} in {service.city}</option>) : null
                                }
                            </select>
                            <small className="form-text text-muted">Select Service here.</small>
                        </div>
                        <div className="form-group">
                            <label>Photo</label>
                            <br/>
                            <input type="file" ref={fileInput} onChange={doPhoto}/>
                            <small className="form-text text-muted">Upload photo</small>
                        </div>
                        {
                            photoPrint ? <div className='photo-bin'><img src={photoPrint} alt='chosen img'></img></div> : null
                        }
                        </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-secondary" onClick={() => setModalWorker(null)}>Close</button>
                        <button type="button" className="btn btn-outline-primary" onClick={handleEdit}>Save changes</button>
                        <button type="button" className="btn btn-outline-danger" onClick={handleDeletePhoto}>Remove photo</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Edit;