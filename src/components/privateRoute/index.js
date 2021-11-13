import React ,{useContext}from 'react'
import {Route,Redirect} from "react-router-dom"
import { useAuth} from '../../contexts/AuthContext'
import firebase from 'firebase/compat'

export default function PrivateRoute({component:Component, ...rest}) {
    
    const {currentUser} = useAuth()
    
    return (
        <Route
        {...rest}
        render={props=>{
            return currentUser ? <Component {...props} /> : <Redirect to="/logIn" />
        }}
        ></Route>
    )
}
