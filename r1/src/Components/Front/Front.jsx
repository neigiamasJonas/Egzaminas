import { useState, useEffect } from "react";
import {authConfig} from '../../Functions/auth';
import axios from 'axios';
import Nav from "./Nav";
import FrontContext from "./FrontContext";
import List from "./List"
import SortFilter from "./SortFilter";


function Front() {

    const [lastUpdate, setLastUpdate] = useState(Date.now());

    const [workers, setWorkers] = useState(null);
    const [services, setServices] = useState(null);
    const [service, setService] = useState(0);   
    // search
    const [search, setSearch] = useState('');
    // rate
    const [rateIt, setRateIt] = useState(null);
    // filter
    const [filter, setFilter] = useState(0);

   
    const doFilter = sid => {
        setService(sid);
        setFilter(parseInt(sid));
    }


    // GET PRODUCTS SU FILTER // + search
    useEffect(() => {
        let query;
        if (filter === 0 && !search) {
            query = '';
        } else if (filter) {
            query = '?service-id=' + filter
        } else if (search) {
            query = '?s=' + search
        }


        axios.get('http://localhost:3006/front/workers' + query, authConfig())
            .then(res => setWorkers(res.data.map((w, i) => ({...w, row:i}))));

    }, [filter, search, lastUpdate]);


    // Get Services
    useEffect(() => {
        axios.get('http://localhost:3006/front/services', authConfig())
            .then(res => setServices(res.data));
    }, []);

    // Create RATE
    useEffect(() => {
        if (null === rateIt) return;

        axios.put('http://localhost:3006/front/rate/' + rateIt.id, rateIt, authConfig())
        .then(_ => {
            setLastUpdate(Date.now());
      })

  }, [rateIt]);

    return(
        <FrontContext.Provider value={{
            workers,
            setWorkers,
            services,
            service,
            setService,
            setRateIt,
            setFilter,
            doFilter,
            setSearch
        }}>
            <Nav/>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <SortFilter/>
                        
                    </div>
                    <div className="col-12">
                        <List/>
                    </div>
                </div>
            </div>
            
        </FrontContext.Provider>
    )
}

export default Front;
