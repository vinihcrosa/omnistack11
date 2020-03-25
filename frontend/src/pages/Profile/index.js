import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api'
import './styles.css';
import logoImg from '../../assets/logo.svg';
export default function Profile() {
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  const history = useHistory();

  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId
      }
    }).then(response => {
      setIncidents(response.data)
    })
  }, [ongId])

  function handleeDeleteIncident(id){
    try{
      api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      });
      setIncidents(incidents.filter(incident => incident.id !== id))
    }catch(err){
      alert('Erro ao deletar caso')
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/')
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero"/>
        <span>Bem Vindo, {ongName}</span>
        <Link className='button' to='/incidents/new'>Cadastrar Novo Caso</Link>
        <button onClick={handleLogout} type='button'>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map(incident =>(
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>Valor:</strong>
            <p>{Intl.NumberFormat('pt-br', { 
              style: 'currency',
              currency:'BRL'
              }).format(incident.value)}</p>

            <button onClick={() => handleeDeleteIncident(incident.id)} type='button'>
              <FiTrash2 size='20' color='#a8a8b3'/>
            </button>
        </li>
        ))}
      </ul>
    </div>
  )
}