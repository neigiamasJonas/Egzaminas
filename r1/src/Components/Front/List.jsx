import { useContext } from "react";
import FrontContext from "./FrontContext";
import Line from "./Line";


function List() {

    const {workers} = useContext(FrontContext);

    return (
        <div className="card mt-4">
            <div className="card-header">
                <h2>List of Workers</h2>
            </div>
            <div className="card-body">
                <ul className="list-group">
                    {
                    workers ? workers.map(w => <Line key={w.id} line={w}></Line>) : null
                    }
                </ul>
            </div>
        </div>
    );
}

export default List;