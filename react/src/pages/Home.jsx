// Home.jsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Card from '../components/Card';
import NavBar from '../components/NavBar';
import './styles/Home.css';

const Home = () => {
  const [personaje, setPersonaje] = useState(null);
  const [personajesFiltrados, setPersonajesFiltrados] = useState(null);
  const [busqueda, setBusqueda] = useState('');

  const listar = async () => {
    try {
      const res = await fetch("http://localhost:6060/allpersonajes");
      const data = await res.json();
      console.log(data);
      setPersonaje(data);
      setPersonajesFiltrados(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const filtrar = (busqueda) => {
    if (!busqueda) {
      setPersonajesFiltrados(personaje); // Mostrar todos si la búsqueda está vacía
      return;
    }

    const resBusqueda = personaje.filter((elemento) =>
      elemento.nombreSH.toString().toLowerCase().includes(busqueda.toLowerCase())
    );
    setPersonajesFiltrados(resBusqueda);
  }

  const handleChange = (e) => {
    const valorBusqueda = e.target.value;
    setBusqueda(valorBusqueda);
    filtrar(valorBusqueda);
  }

  useEffect(() => {
    listar();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="busqueda">        
        <div className="search-container">
          <input
            name="busqueda"
            value={busqueda}
            type="text"
            onChange={handleChange}
            placeholder='Ingrese el nombre de un superhéroe'
            className="search-input"
          />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>
      </div>
      <div className='titulo'><h1>Personajes </h1></div>
      

      <div className="cards">
        
        {personajesFiltrados && personajesFiltrados.map((per) => (
          <Card key={per.id} objPersonajes={per} />
        ))}
      </div>
    </div>
  );
}

export default Home;
