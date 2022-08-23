import { useState } from "react";
import { useContext } from "react";
import FrontContext from "./FrontContext";

function Line({ line }) {

    const { setRateIt } = useContext(FrontContext);

    //// rate
    const [rate, setRate] = useState('5')
    const rateNow = () => {

        setRateIt({
            rate: parseInt(rate),
            id: line.id
            
        });
        console.log(rate);
        console.log(line.id);
    }

    
    return (
        <li className="list-group-item">
            <div style={{display: "flex", justifyContent: "space-between", flexWrap: "wrap"}}>
            <div className="content" style={{flexDirection: "column", justifyContent: "space-between"}}>
                    <div>
                        <div>Name: <b>{line.name}</b></div>
                        <div>Surname: <b>{line.surname}</b></div>
                        <div>Speciality: <b>{line.spec}</b></div>
                        <div>Service: <b>{line.ser}</b></div>
                        <div>City: <b>{line.city}</b></div>
                        <div style={{marginTop: "20px"}}>Rating: <b>                        
                            {
                            line.rate_sum ? (line.rate_sum / line.rates).toFixed(2) + " Stars" : 'Not rated yet'
                            }
                        </b>
                        </div>
                    </div>

                </div>
                <div>
                        {
                            line.photo ? <div className='photo-bin'><img src={line.photo} alt='chosen img'></img></div> : null
                        }
                </div>
                <div className="form-group" style={{display: "flex", flexDirection: "column"}}>
                    <label style={{marginRight: '7px'}} className='mr-2'>Select rating here</label>
                    <select value={rate} onChange={e => setRate(e.target.value)}>
                       <option value="1">1 star</option>
                       <option value="2">2 stars</option>
                       <option value="3">3 stars</option>
                       <option value="4">4 stars</option>
                       <option value="5">5 stars</option>
                    </select>
                    <button type="button" className="btn btn-outline-success ml-2" style={{marginTop: "20px"}} onClick={rateNow}>Rate worker</button>
                </div>
            </div>
        </li>
    );
}

export default Line;