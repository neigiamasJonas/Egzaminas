import { useContext } from 'react';
import BackContext from '../BackContext';

function Line({ line }) {

    const { setDeleteWorker, setModalWorker } = useContext(BackContext);

    const handleDelete = () => {
        setDeleteWorker(line);
    }

    const handleEdit = () => {
        setModalWorker(line);
    }

    return (
        <li className="list-group-item">
            <div className="item">
                <div className="content" style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <div>
                        <div>Name: <b>{line.name}</b></div>
                        <div>Surname: <b>{line.surname}</b></div>
                        <div>Speciality: <b>{line.spec}</b></div>
                        <div>Service: <b>{line.service}</b></div>
                        <div>City: <b>{line.city}</b></div>
                    </div>
                    <div>
                        <div>
                            {
                                line.photo ? <div className='photo-bin'><img src={line.photo} alt='chosen img'></img></div> : null
                            }
                        </div>
                    </div>
                </div>
                <div className="buttons">
                    <button type="button" className="btn btn-outline-success ml-2" onClick={handleEdit}>Edit</button>
                    <button type="button" className="btn btn-outline-danger ml-2" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </li>
    );
}

export default Line;