import React from 'react'
import { Link } from 'react-router-dom'
import './styles/Modal.css'

const Modal = ({operacion}) => {
  return (
    <div>
        <div className="window">
            <h3>{`El personaje se ha ${operacion} correctamente`}</h3>
            <Link to = '/'>
              <button>Aceptar</button>
            </Link>
        </div>
    </div>
  )
}

export default Modal