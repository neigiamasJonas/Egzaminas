
import { useState, useEffect } from "react";
import axios from 'axios';
import BackContext from "./BackContext";
import ServicesCrud from "./serv/Crud";
import WorkersCrud from "./workers/Crud";
import Nav from "./Nav";
import { v4 as uuidv4 } from 'uuid';
import {authConfig} from '../../Functions/auth';

function Back( {show}) {

    // services //
    const [lastUpdate, setLastUpdate] = useState(Date.now());
    const [services, setServices] = useState(null);
    const [createService, setCreateService] = useState(null);
    const [deleteService, setDeleteService] = useState(null);
    const [editService, setEditService] = useState(null);
    const [modalService, setModalService] = useState(null);

    // workers //
    const [workers, setWorkers] = useState(null);
    const [createWorker, setCreateWorker] = useState(null);
    const [deleteWorker, setDeleteWorker] = useState(null);
    const [editWorker, setEditWorker] = useState(null);
    const [modalWorker, setModalWorker] = useState(null);

    // Photo //
    const [deletePhoto, setDeletePhoto] = useState(null);


    // MSG //
    const [messages, setMessages] = useState([]);

    const showMessage = (m) => {
        const id = uuidv4();
        m.id = id;
        setMessages(msg => [...msg, m])
        setTimeout(() => {
            setMessages(mes => mes.filter(ms => ms.id !== id))
        }, 5000);

    }

    // Read services / workers //
    useEffect(() => {
        axios.get('http://localhost:3006/admin/services', authConfig())
        .then(res => {
            setServices(res.data)
        })
    }, [lastUpdate]);

    useEffect(() => {
        axios.get('http://localhost:3006/admin/workers', authConfig())
        .then(res => {
            setWorkers(res.data)
        });
    }, [lastUpdate]);


    // Create services / workers //
    useEffect(() => {
        if (null === createService) return;

        axios.post('http://localhost:3006/admin/services', createService, authConfig())
        .then(res => {
            showMessage(res.data.msg);
            setLastUpdate(Date.now());
        })
        .catch(error => {
            showMessage({ text: error.message, type: 'danger' });
        })

    }, [createService]);

    useEffect(() => {
        if (null === createWorker) return;
        axios.post('http://localhost:3006/admin/workers', createWorker, authConfig())
            .then(res => {
                showMessage(res.data.msg);
                setLastUpdate(Date.now());
            })
            .catch(error => {
                showMessage({ text: error.message, type: 'danger' });
            })
    }, [createWorker]);



    // Delete services / workers //
    useEffect(() => {
        if (null === deleteService) return;

        axios.delete('http://localhost:3006/admin/services/' + deleteService.id, authConfig())
        .then(res => {
            showMessage(res.data.msg);
            setLastUpdate(Date.now());
        })
        .catch(error => {
            showMessage({ text: error.message, type: 'danger' });
        })

    }, [deleteService]);

    useEffect(() => {
        if (null === deleteWorker) return;
        axios.delete('http://localhost:3006/admin/workers/' + deleteWorker.id, authConfig())
            .then(res => {
                showMessage(res.data.msg);
                setLastUpdate(Date.now());
            })
            .catch(error => {
                showMessage({ text: error.message, type: 'danger' });
            })
    }, [deleteWorker]);


    // Delete photo //
    useEffect(() => {
        if (null === deletePhoto) return;

        axios.delete('http://localhost:3006/admin/photos/' + deletePhoto.id, authConfig())
        .then(res => {
            showMessage(res.data.msg);
        })
        .catch(error => {
            showMessage({ text: error.message, type: 'danger' });
        })

    }, [deletePhoto]);


    // Edit services / workers //
    useEffect(() => {
        if (null === editService) return;
        axios.put('http://localhost:3006/admin/services/' + editService.id, editService, authConfig())
            .then(res => {
                showMessage(res.data.msg);
                setLastUpdate(Date.now());
            })
            .catch(error => {
                showMessage({ text: error.message, type: 'danger' });
            })
    }, [editService]);

    useEffect(() => {
        if (null === editWorker) return;
        axios.put('http://localhost:3006/admin/workers/' + editWorker.id, editWorker, authConfig())
            .then(res => {
                showMessage(res.data.msg);
                setLastUpdate(Date.now());
            })
            .catch(error => {
                showMessage({ text: error.message, type: 'danger' });
            })
    }, [editWorker]);

    return (
        <BackContext.Provider value={
            {
                // services //
                services,
                setCreateService,
                setDeleteService,
                setEditService,
                setModalService,
                modalService,
                // workers//
                workers,
                setCreateWorker,
                setDeleteWorker,
                setEditWorker,
                setModalWorker,
                modalWorker,
                // messages //
                messages,
                showMessage,
                // photo //
                setDeletePhoto
            }
            }>
            {
                show === 'admin' ? 
                    // ADMIN //
                    <>
                        <Nav/>
                            <h3 className="container" style={{marginTop: "30px"}}>Admin page</h3>
                            
                    </>
                : show === 'services' ? <ServicesCrud/>
                    
                : show === 'workers' ? <WorkersCrud/>
                    
                : null
            }
        </BackContext.Provider>

    )

}

export default Back;