import { useContext } from "react";
import BackContext from "../BackContext";
import Line from "./Line";


function List() {

    const {workers} = useContext(BackContext);

    return (
        <div className="card mt-4">
            <div className="card-header">
                <h2>List of Workers</h2>
            </div>
            <div className="card-body">
                <ul className="list-group">
                    {
                    workers ? workers.map(worker => <Line key={worker.id} line={worker}></Line>) : null
                    }
                </ul>
            </div>
        </div>
    );
}

export default List;