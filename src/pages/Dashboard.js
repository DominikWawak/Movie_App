import { updateCurrentUser } from '@firebase/auth'
import React,{useState,useContext} from 'react'
import { Card,Button,Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import firebase from 'firebase/compat/app'
import { Link, useHistory} from 'react-router-dom'


export default function Dashboard() {


    const [error,setError]=useState("")

    // const {auth}=useContext(useAuth)
    // console.log(auth)
    
    const currentUser = firebase.auth().currentUser;
    //const currentUser  = useAuth()
   // const {logOut} = useAuth()
    const history= useHistory()


    async function handleLogOut(){

        setError('')

        try{
            await firebase.auth().signOut()
            history.pushState('/Dashboard')
        } catch{
            setError('Failed to log Out')
        }

    }
    return (
        <>
        <Card>
            <Card.Body>
                <h2 className="text=center mb-4">Profile</h2>
                {error && <Alert variant="danger"> {error}</Alert>}
                <strong>Email:</strong>  {currentUser.email}
                <Link to="/updateProfile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
            </Card.Body>

        </Card>
        <div className = "w-100 text-center mt-2">
            <Button variant="link"onClick={handleLogOut}>LogOut</Button>
        </div>
        </>
    )
}
