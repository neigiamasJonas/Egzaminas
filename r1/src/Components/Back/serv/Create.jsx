import { useContext, useState } from 'react';
import BackContext from '../BackContext';

function Create() {

    const { setCreateService } = useContext(BackContext);

    const [title, setTitle] = useState('');
    const [city, setCity] = useState('');


    const handleCreate = () => {
        const data = { title, city };
        setCreateService(data);
        setTitle('');
        setCity('');
    }

    return (
        <div className="card mt-4">
            <div className="card-header">
                <h2>Create new Category</h2>
            </div>
            <div className="card-body">
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" onChange={e => setTitle(e.target.value)} value={title} />
                    <small className="form-text text-muted">Enter your Service name here.</small>
                </div>
                <div className="form-group">
                    <label>City</label>
                    <input type="text" className="form-control" onChange={e => setCity(e.target.value)} value={city} />
                    <small className="form-text text-muted">Enter City name here.</small>
                </div>
                <button type="button" className="btn btn-outline-primary" onClick={handleCreate}>Create</button>
            </div>
        </div>
    );
}

export default Create;