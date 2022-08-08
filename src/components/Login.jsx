import React from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import {Navigate, useNavigate} from "react-router-dom"


const Login = () => {

const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault()
    const email = e.target.email.value;
    const password = e.target.password.value;

    const regexEmail =   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  
    if(email === '' || password === ''){
      new Swal({
        title: 'Error',
        text: 'Los campos no deben estar vacios',
        icon: 'error'
      })
      return
    }
    
    if(email !== '' && !regexEmail.test(email)){
      new Swal({
        title: 'Error',
        text: 'Ingrese un correo válido',
        icon: 'error'
      })
      return
    }

    if(email !== 'challenge@alkemy.org' || password !== 'react'){
      new Swal({
        title: 'Error',
        text: 'Credenciales inválidas',
        icon: 'error'
      })
      return
    }
    new Swal({
      title: 'Formulario Completo',
      text: 'Su formulario está listo para ser enviado',
      icon: 'success'
    })
    axios
    .post('http://challenge-react.alkemy.org', {email, password})
    .then(res => {
      console.log(res.data)
      const token = res.data.token;
      sessionStorage.setItem('token', token);
      navigate('/Listado')
    })
  }

  let token = sessionStorage.getItem("token");

  return (
    <>
      { token && <Navigate to='/Listado' />}
        <h2>Formulario de Login</h2>
        <form onSubmit={submitHandler}>
            <label><span> Correo Electrónico: </span><br />
              <input type="text" name='email'  />
            </label>
            <br />
            <label> <span>Contraseña: </span><br />
              <input type="password" name='password' />
            </label>
            <br />
            <button className='btn btn-success mt-2' type='submit'>Ingresar</button>
        </form>
    </>
  )
}

export default Login