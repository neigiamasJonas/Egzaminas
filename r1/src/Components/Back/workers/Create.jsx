
import { useContext, useState, useRef } from 'react';
import BackContext from '../BackContext';
import getBase64 from '../../../Functions/base64'

function Create() {

    const { services, setCreateWorker, showMessage } = useContext(BackContext);

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [spec, setSpec] = useState('');
    const [service, setService] = useState('');

    // photo //
    const fileInput = useRef();
    const [photoPrint, setPhotoPrint] = useState(null);


    const doPhoto = () => {
        getBase64(fileInput.current.files[0])
        .then(photo => setPhotoPrint(photo))
        .catch(_ => {
            // tylim
        })
    }

    const handleCreate = () => {
        if (service === '0') {
            showMessage({ text: 'Please, select Service!', type: 'danger' });
            return;
        }
        const data = { 
            name, 
            surname,
            spec,
            service: parseInt(service),
            photo: photoPrint
        };
        setCreateWorker(data);
        setName('');
        setSurname('');
        setSpec('');
        setService("0")
        setPhotoPrint(null);
        fileInput.current.value = null;

        console.log(data);
    }


    return (
        <div className="card mt-4">
            <div className="card-header">
                <h2>Create new Item</h2>
            </div>
            <div className="card-body">
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
                            services ? services.map(s => <option key={s.id} value={s.id}>{s.title} in {s.city}</option>) : null
                        }
                    </select>
                    <small className="form-text text-muted">Select Service here.</small>
                </div>
                <div className="form-group">
                    <label>Photo</label>
                    <input type="file" ref={fileInput} onChange={doPhoto}/>
                    <small className="form-text text-muted">Upload photo</small>
                </div>
                {
                    photoPrint ? <div className='photo-bin'><img src={photoPrint} alt='chosen img'></img></div> : null
                }
                <button type="button" className="btn btn-outline-primary" onClick={handleCreate}>Create</button>
            </div>
        </div>
    );
}

export default Create;