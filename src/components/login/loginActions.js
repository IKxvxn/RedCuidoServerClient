import { message } from 'antd';
import * as Mensajes from '../../assets/mensajes'

//const API_URL = 'http://localhost:8079/auth'
const API_URL = 'https://reddecuidoserver.herokuapp.com/auth'

const NEW_LOGIN_REQUEST = 'NEW_LOGIN_REQUEST'
const NEW_LOGIN_SUCCESS = 'NEW_LOGIN_SUCCESS'
const NEW_LOGIN_FAILURE = 'NEW_LOGIN_FAILURE'

const USER_LOAD_STATE = 'USER_LOAD_STATE'
const LOGOUT = 'LOGOUT'

export function ingresar(usuario,history) {
  return function (dispatch) {
    dispatch({
      type: NEW_LOGIN_REQUEST
    })
    fetch(API_URL + "/ingresar", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario),
    })
      .then(response => response.json())
      .then(usuario => {
        if (usuario.error){
          if (usuario.type===0){
            message.error("El usuario no existe en el sistema")
          }
          else{
            message.error("La contraseña proporcionada es incorrecta")
          }
          dispatch({type:NEW_LOGIN_FAILURE})
        }
        else{
          message.success("Bienvenido nuevamente "+usuario.usuario.usuario)
          history.push('/home/espera')
          dispatch({
            type: NEW_LOGIN_SUCCESS,
            usuario: usuario.usuario
          })
        }
      })
      .catch(error => {
        message.error(Mensajes.errorConexion)
        dispatch({
          type: NEW_LOGIN_FAILURE,
          error: error
        })
      })
  }
}

export const loadState = () => ({
  type: USER_LOAD_STATE,
})

export const logout = () => ({
  type: LOGOUT,
})


