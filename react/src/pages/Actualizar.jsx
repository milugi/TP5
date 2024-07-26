import React,{useState} from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Modal from '../components/Modal';
import NavBar from '../components/NavBar';
import './styles/Cargar.css';

const Actualizar = () => {

    const{id} = useParams();
    const[modal, setModal] = useState(false) 
    const [datos, setDatos] = useState()

    const [personaje, setPersonaje] = useState()


    const Actualizar = async() =>{
console.log('personaje', personaje)        
const res = await fetch(`http://localhost:6060/actualizar/${id}`,
        {
            method: 'PUT',
            body: JSON.stringify(personaje),
            headers: {"Content-Type": "application/json"}
        })
        setModal(true)
    
    }

    const getDatos = async() =>{
        const res = await fetch(`http://localhost:6060/personaje/${id}`)
        const data = await res.json();
        setDatos(data);
        setPersonaje(data);
    }

    
    const handleChange = (e) =>{
        setPersonaje({ ...personaje, [e.target.name]: e.target.value });
    }

    useEffect(()=>{
        getDatos()
    },[])

  return (
    <div>
        <NavBar/>
        <div className="title">
            <h2>Actualizar Personaje</h2>
        </div>
        <div className="inputs">
                <h3>Ingrese los datos correspondientes</h3>
                <div className="input-row">
                    <div className="input-group">
                        <label htmlFor="nombreSH">Nombre personaje</label>
                        <input type="text" id="nombreSH" name = "nombreSH" onChange= {handleChange} placeholder={`${datos?.nombreSH}`} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="nombrereal" className="required">Nombre del actor</label>
                        <input type="text" id="nombrereal" name = "nombreReal" onChange= {handleChange} placeholder={`${datos?.nombreReal}`} required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="año" className="required">Año de aparición</label>
                        <input type="text" id="año" name = "año" onChange= {handleChange} placeholder={`${datos?.año}`} required />
                    </div>
                </div>
                <div className="input-row">
                    <div className="input-group select-group"> {/* Añade una clase para el grupo de selección */}
                        <label htmlFor="casa" className="required">Casa</label>
                        <div className="select-wrapper">
                            <select id="casa" name="casa" onChange={handleChange} defaultValue={datos?.casa}>
                                <option value={datos?.casa}>{datos?.casa}</option>
                                <option value="Marvel">Marvel</option>
                                <option value="DC">DC</option>
                            </select>
                            <div className="select-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="input-group">
                        <label htmlFor="equipamiento" className="required">Equipamiento</label>
                        <input type="text" id="equipamiento" name = "equipamiento" onChange= {handleChange} placeholder={`${datos?.equipamiento}`} required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="biografia" className="required">Biografía</label>
                        <input type="text" id="biografia" name = "biografia" onChange= {handleChange} placeholder={`${datos?.biografia}`} required />
                    </div>
                </div>
                <div className="input-row">
                    <div className="input-group">
                        <label htmlFor="imgURL" className="required">URL de la imagen</label>
                        <input type="text" id="imgURL" name = "imgURL" onChange= {handleChange} placeholder={`${datos?.imgURL}`} required />
                    </div>
                </div>
                <div className="btn">
                <button onClick={Actualizar}>Actualizar</button>
                </div>
            </div>
        {modal && <Modal operacion={"actualizado"}/>}
    </div>
  )
}

export default Actualizar