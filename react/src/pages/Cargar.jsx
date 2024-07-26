import React, { useState } from 'react';
import Modal from '../components/Modal';
import NavBar from '../components/NavBar';
import './styles/Cargar.css';

const Cargar = () => {
    const [modal, setModal] = useState(false);

    const [personaje, setPersonaje] = useState({
        nombrereal: '',
        nombresh: '',
        casa: '',
        año: '',
        equipamiento: '',
        biografia: '',
        imgURL: '',

        nombrerealValid: false,
        nombreshValid: false,
        casaValid: false,
        añoValid: false,
        equipamientoValid: false,
        biografiaValid: false,
        imgURLValid: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPersonaje({ ...personaje, [name]: value, [`${name}Valid`]: value.trim() !== '' });
    };

    const validateForm = () => {
        return (
            personaje.nombrerealValid &&
            personaje.nombreshValid &&
            personaje.casaValid &&
            personaje.añoValid &&
            personaje.equipamientoValid &&
            personaje.biografiaValid &&
            personaje.imgURLValid
        );
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            const res = await fetch('http://localhost:6060/cargar', {
                method: 'POST',
                body: JSON.stringify(personaje),
                headers: { 'Content-Type': 'application/json' }
            });
            setModal(true)
        } else {
            alert('Por favor complete todos los campos obligatorios.');
        }
    };

    return (
        <div>
            <NavBar />
            <div className="inputs">
                <h3>Crear personaje</h3>
                <div className="input-row">
                    <div className="input-group">
                        <label htmlFor="nombresh">Nombre personaje</label>
                        <input type="text" id="nombresh" name="nombresh" onChange={handleChange} placeholder='Ingrese nombre...' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="nombrereal" className="required">Nombre del actor</label>
                        <input type="text" id="nombrereal" name="nombrereal" onChange={handleChange} placeholder='Ingrese actor...' required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="año" className="required">Año de aparición</label>
                        <input type="text" id="año" name="año" onChange={handleChange} placeholder='Ingrese año de aparición...' required />
                    </div>
                </div>
                <div className="input-row">
                    <div className="input-group select-group"> {/* Añade una clase para el grupo de selección */}
                        <label htmlFor="casa" className="required">Casa</label>
                        <div className="select-wrapper">
                            <select id="casa" name="casa" onChange={handleChange} defaultValue="">
                                <option value="" disabled>Seleccione casa...</option>
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
                        <input type="text" id="equipamiento" name="equipamiento" onChange={handleChange} placeholder='Ingrese equipamiento...' required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="biografia" className="required">Biografía</label>
                        <input type="text" id="biografia" name="biografia" onChange={handleChange} placeholder='Ingrese biografía...' required />
                    </div>
                </div>
                <div className="input-row">
                    <div className="input-group">
                        <label htmlFor="imgURL" className="required">URL de la imagen</label>
                        <input type="text" id="imgURL" name="imgURL" onChange={handleChange} placeholder='Ingrese URL de la imagen...' required />
                    </div>
                </div>
                <div className="btn">
                    <button onClick={handleSubmit}>Cargar</button>
                </div>
            </div>
            {modal && <Modal operacion={"cargado"} />} {/* Renderiza el Modal cuando modal es true */}
        </div>
    );
};

export default Cargar;
