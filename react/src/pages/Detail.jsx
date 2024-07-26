import React, {useState} from 'react'
import NavBar from '../components/NavBar'
import './styles/Detail.css'
import marvel from '../assets/marvel.png'
import dc from '../assets/dc.png'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Slider from '../components/Slider'
import { Link } from 'react-router-dom'
import Modal from '../components/Modal'

const Detail = () => {

    const {id} = useParams()
    const[modal, setModal] = useState(false)    
    const [detalle, setDetalle] = useState({
        nombresh:"",
        nombrereal: "",
        casa: "",
        año:"",
        equipamiento:"",
        biografia:"",
        imgURL:""
    });

    const [ImgCasa, setImgCasa] = useState()

    const obtenerPersonaje = async() =>{
        const res = await fetch(`http://localhost:6060/personaje/${id}`)
        const data = await res.json();
        setDetalle(data);
        if (data.casa == "Marvel"){
            setImgCasa(marvel)
        } else 
        setImgCasa(dc)
    }
    
    const eliminarPersonaje = async() =>{
        const res = await fetch (`http://localhost:6060/eliminar/${id}`,{
            method: 'DELETE'
        });
        
       
        setModal(true)
    }



    useEffect(()=>{
        obtenerPersonaje();
    },[])

    

  return (
    <>
        <NavBar/>
        {detalle &&
        <div className='detail'>
            <div className="info">
                <div className="titleimg">
                <h2>{detalle.nombreSH}</h2>
                    <div className='imagesdetail'>
                <Slider imgs = {detalle.imgURL}/>
            </div>
                </div>
                <div className="textbox">
                    <div className="text">
                    <img className='logocasa' src={ImgCasa} alt="" />
                        <h4>Nombre real: {detalle.nombreReal}</h4>
                        <h4>Año de aparición: {detalle.año} </h4>
                        <h4>Casa: {detalle.casa}</h4>
                        <h4>Equipamiento: {detalle.equipamiento} </h4>
                        <p>{detalle.biografia}</p>
                    </div>
                </div>
                <div className="btn-detail">
                    <button onClick={eliminarPersonaje}>Eliminar</button>
                    <Link to = {`/actualizar/${detalle.nombreSH}`}>
                        <button>Actualizar</button>
                    </Link>
                </div>
            </div>
        </div>
        }
        {modal && <Modal operacion={"eliminado"}/>}
    </>
  )
}

export default Detail
