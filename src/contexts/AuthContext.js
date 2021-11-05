import React , {useContext,useState, useEffect}from 'react'
import {app} from "../firebase"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
//import { getAuth, createUserWithEmailAndPassword } from "firebase/compat/auth";


const AuthContext = React.createContext();
const auth=getAuth()
export function useAuth(){
    return useContext(AuthContext);
}



export default function AuthProvider({children}) {
    const [currentUser,setCurrentUser] = useState()
    const [loading,setLoading] = useState(false)

    function signUp(email,password){
        return createUserWithEmailAndPassword(auth,email,password) .then((userCredential) => {
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
        return signInWithEmailAndPassword(auth,email,password) .then((userCredential) => {
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

    useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      
        setCurrentUser(user)
        setLoading(false)
        
    })

    return unsubscribe
},[])

    const value = {
        currentUser,
        signUp,
        logIn
    }
    return (
        <AuthContext.Provider value = {value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
