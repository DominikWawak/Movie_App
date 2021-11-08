import React , {useContext,useState, useEffect}from 'react'
import {app} from "../firebase"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged,sendPasswordResetEmail} from "firebase/auth";
//import { getAuth, createUserWithEmailAndPassword } from "firebase/compat/auth";
import firebase from 'firebase/compat';


const AuthContext = React.createContext();
const auth=getAuth()
export function useAuth(){
    return useContext(AuthContext);
}



export function AuthProvider({children}) {
    const [currentUser,setCurrentUser] = useState("")
    const [loading,setLoading] = useState(false)

    const usr = "hello";

    function signUp(email,password){
        createUserWithEmailAndPassword(auth,email,password) .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            // ..
          });
    }

    function logIn(email,password){

        // If i want to use another database I can just chnge the code in these functions
         signInWithEmailAndPassword(auth,email,password) .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            // ..
          });
    }


    function reserPassword(email){
        sendPasswordResetEmail(auth,email);
    }

    function logOut(){
        return auth.signOut()
    }

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(user) => {
      
        setCurrentUser(user)
        setLoading(false)
        
    })

    return unsubscribe()
},[])

    const value = {
        currentUser,
        usr,
        signUp,
        logIn,
        logOut,
        reserPassword,
    }
    return (
        <AuthContext.Provider value = {value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

