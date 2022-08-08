import React from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Buscador = () => {

    const navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault();
        const keyword = e.currentTarget.keyword.value.trim();

        if(keyword.length === 0){
            new Swal({
                title: 'Error',
                text: 'Tienes que escribir una palabra clave!',
                icon: 'error'
            })
        }else if(keyword.length < 4){
            new Swal({
                title: 'Error',
                text: 'Tienes que escribir más de 4 caracteres!',
                icon: 'error'
            })
        }else{
            e.currentTarget.keyword.value='';
            navigate(`/Resultados?keyword=${keyword}`)
        }
    }
  return (
    <form className='d-flex align-items-center' onSubmit={submitHandler} >
        <label className='form-label mb-0 mx-2' >
            <input className='form-control' type="text" name='keyword' placeholder='Escribe una palabra clave...' />
        </label>
        <button className='btn btn-success' type='submit' >Buscar</button>
    </form>
  )
}

export default Buscador