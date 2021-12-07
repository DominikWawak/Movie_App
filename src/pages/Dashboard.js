
import React,{useState,useContext,useEffect} from 'react'
import { Card,Button,Alert,Form } from 'react-bootstrap'
import app from '../firebase'
import {db} from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import firebase from 'firebase/compat/app'
import  { getFirestore, collection,query, where, getDocs,limit,orderBy } from "firebase/firestore"
import { Link, useHistory} from 'react-router-dom'
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { func } from 'prop-types'



export default  function Dashboard() {


    const firestore = firebase.firestore()


    
    const [error,setError]=useState("")

    const[reviews,setReviews]=useState([])

    // const {auth}=useContext(useAuth)
    // console.log(auth)
    
    const currentUser = useAuth()
    console.log("USEr",currentUser,currentUser.currentUser.email)
    //const currentUser  = useAuth()
   // const {logOut} = useAuth()
    const history= useHistory()


    
        const reviewRef = collection(db,"reviews")

        useEffect(() => {
            const getReviews = async() =>{
                const data = await getDocs(reviewRef)
                console.log(data)
                // map to the data in the database but not the id 
                setReviews(data.docs.map((doc) => ({...doc.data(),id: doc.id})).filter(function (review){
                    return review.email===currentUser.currentUser.email;
                }))
                
                // data.docs.forEach((doc)=>{
                //     setPosts([...posts,{...doc.data(),id: doc.id}])
                // })
                 
               
            }

            getReviews()
        }, [])

        console.log(reviews)
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

    function handleSubmit(){

    }

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
                <strong>Email:</strong>  {currentUser.currentUser.email}
                <Link to="/updateProfile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
            </Card.Body>

        </Card>


        <br></br>
    {/* <Form >
        <div class="form-group">
        <label for="exampleFormControlTextarea1">Create a post</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
        <Button className="w-100" type ="submit">Post</Button>
    </Form> */}

        <h2>Your Reviews</h2>
        <br/>
        <div>
            {reviews.map((review) =>{
                return (
                //     <div>
                //     {" "}
                //     <h1>{post.text}</h1>
                //     <h2>{post.createdAt}</h2>
                // </div>
                 <Card >
                 <CardHeader
                   avatar={
                     <Avatar aria-label="recipe" >
                       {review.rating}
                     </Avatar>
                   }
                   action={
                     <IconButton aria-label="settings">
                       <FavoriteIcon />
                     </IconButton>
                   }
                   title={currentUser.currentUser.email}
                   
                   subheader={review.Review}
                 />
               </Card>
                )
            })}
        </div>
       
        </>
    )
}
