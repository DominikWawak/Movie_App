import { updateCurrentUser } from '@firebase/auth'
import React,{useState,useContext,useEffect} from 'react'
import { Card,Button,Alert } from 'react-bootstrap'
import {app} from '../firebase'
import {db} from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import firebase from 'firebase/compat/app'
import  { getFirestore, collection,query, where, getDocs,limit,orderBy } from "firebase/firestore"
import { Link, useHistory} from 'react-router-dom'


export default  function Dashboard() {


    const firestore = firebase.firestore()


    
    const [error,setError]=useState("")

    const[posts,setPosts]=useState([])

    // const {auth}=useContext(useAuth)
    // console.log(auth)
    
    const currentUser = firebase.auth().currentUser;
    //const currentUser  = useAuth()
   // const {logOut} = useAuth()
    const history= useHistory()


    
        const postRef = collection(db,"posts")

        useEffect(() => {
            const getPosts = async() =>{
                const data = await getDocs(postRef)
                console.log(data)
                // map to the data in the database but not the id 
                setPosts(data.docs.map((doc) => ({...doc.data(),id: doc.id})))
                
                // data.docs.forEach((doc)=>{
                //     setPosts([...posts,{...doc.data(),id: doc.id}])
                // })
                 
               
            }

            getPosts()
        }, [])

        console.log(posts)
       // const query = messageRef.orderBy('createdAt').limit(25)
    //    const q= query(postRef,orderBy("createdAt"),limit(25));

    //    const querySnapshot = getDocs(q);
    //    querySnapshot.forEach((doc) => {
    //      // doc.data() is never undefined for query doc snapshots
    //      console.log(doc.id, " => ", doc.data());
    //    });
    

    // function ChatMessage(props){
    //     const {text,uid} = props.message;
    //     return <p>{text}</p>
    // }

    async function handleLogOut(){

        setError('')

        try{
            await firebase.auth().signOut()
            history.push('/logIn')
        } catch{
            setError('Failed to log Out')
        }

    }
    return (
        <>
        <Card>
            <Card.Body>
                <div>
                <h2 className="text=center mb-4">Profile</h2>
                
            <Button variant="link"onClick={handleLogOut}>LogOut</Button>
            </div>
        
                {error && <Alert variant="danger"> {error}</Alert>}
                <strong>Email:</strong>  {currentUser.email}
                <Link to="/updateProfile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
            </Card.Body>

        </Card>

        <div>
            {posts.map((post) =>{
                return (
                <div>
                    {" "}
                    <h1>{post.text}</h1>
                    <h2>{post.createdAt}</h2>
                </div>
                )
            })}
        </div>
       
        </>
    )
}
