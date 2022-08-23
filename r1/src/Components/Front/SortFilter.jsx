import { useContext, useState } from 'react';
import FrontContext from './FrontContext';

function SortFilter() {

    const [sortBy, setSortBy] = useState('default');

    
    const { setWorkers, workers, services, doFilter, service, setSearch } = useContext(FrontContext);

    // search //
    const [s, setS] = useState('');
    const doSearch = e => {
        setS(e.target.value)
        setSearch(e.target.value)
    }


    const doSort = e => {
        setSortBy(e.target.value);
        const w = [...workers]
        switch (e.target.value) {
            case 'ascName':
                w.sort((a, b) => {
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0;
                });
                break;
            case 'descName':
                w.sort((a, b) => {
                    if (a.name > b.name) return -1;
                    if (a.name < b.name) return 1;
                    return 0;
                });
                break;
            case 'ascSurname':
                w.sort((a, b) => {
                    if (a.surname > b.surname) return 1;
                    if (a.surname < b.surname) return -1;
                    return 0;
                });
                break;
            case 'descSurname':
                w.sort((a, b) => {
                    if (a.surname > b.surname) return -1;
                    if (a.surname < b.surname) return 1;
                    return 0;
                });
                break;
            case 'ascRates':
                w.sort((a, b) => a.rate_sum / a.rates - b.rate_sum / b.rates);
                break;
            case 'descRates':
                w.sort((a, b) => b.rate_sum / b.rates - a.rate_sum / a.rates);
                break;
            default:
                w.sort((a, b) => a.row - b.row);
        }
        setWorkers(w);
    }

    return (
        <div className="card mt-4">
            <div className="card-header">
                <h2>Sort and Filter</h2>
            </div>
            <div className="card-body">
                <div className="container">
                    <div className="row" style={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center"}}>
                        <div className="col-4" style={{minWidth: "200px"}}>
                            <div className="form-group">
                                <label>Sort By</label>
                                <select className="form-control" value={sortBy} onChange={doSort}>
                                    <option value="default">Default Sort</option>
                                    <option value="ascName">Name A-Z</option>
                                    <option value="descName">Name Z-A</option>
                                    <option value="ascSurname">Surname A-Z</option>
                                    <option value="descSurname">Surname A-Z</option>
                                    <option value="ascRates">Rates min-max</option>
                                    <option value="descRates">Rates max-min</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-4" style={{minWidth: "200px"}}>
                            <div className="form-group">
                                <label>Filter by Services</label>
                                <select className="form-control" onChange={e =>doFilter(e.target.value)} value={service}>
                                    <option value="0">All Services</option>
                                    {
                                        services ? services.map(s => <option key={s.id} value={s.id}>{s.title} in {s.city}</option>) : null
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-4" style={{minWidth: "200px"}}>
                            <div className="form-group">
                                <label>Search by Name</label>
                                <input type='text' className="form-control" value={s} onChange={doSearch}></input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SortFilter;