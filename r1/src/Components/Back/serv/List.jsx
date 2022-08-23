import { useContext } from "react";
import BackContext from "../BackContext";
import Line from "./Line";


function List() {
    
    const {services} = useContext(BackContext)

    return (
        <div className="card mt-4">
            <div className="card-header">
                <h2>List of Services</h2>
            </div>
            <div className="card-body">
                <ul className="list-group">
                    {
                    services ? services.map(service => <Line key={service.id} line={service}></Line>) : null
                    }
                </ul>
            </div>
        </div>
    );
}

export default List;