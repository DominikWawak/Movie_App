import { formatMs } from '@material-ui/core'
import React ,{useRef ,useState}from 'react'
import {Form,Button,Card, FormLabel, FormControl, Alert} from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
//USE HISTORY ADDED
import { Link } from 'react-router-dom'

export default function SignUpForm() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmationlRef = useRef()
    const {signUp} = useAuth()
    const [error,setError] = useState("")
    const [loading,setLoading] = useState(false)


    async function handleSubmit(e){
        // Prevent form from refresing 

        if(passwordRef.current.value !== passwordConfirmationlRef.current.value){
            return setError('Password do not match')
        }
        e.preventDefault()

        try{
            setError("")
            setLoading(true)
         await signUp(emailRef.current.value,passwordRef.current.value)
        } catch{
            setError('Failed to create account ')
        
        }
        setLoading(false)
    }



    return (
        <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">SIGN UP</h2>
                
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id ="email">
                        <FormLabel>Email</FormLabel>
                        <FormControl type ="email" ref= {emailRef} required/>
                    </Form.Group>
                    <Form.Group id ="password">
                        <FormLabel>Password</FormLabel>
                        <FormControl type ="password" ref= {passwordRef} required/>
                    </Form.Group>
                    <Form.Group id ="password-confirmation">
                        <FormLabel>Password Confirmation</FormLabel>
                        <FormControl type ="password" ref= {passwordConfirmationlRef} required/>
                    </Form.Group>
                    <br/>
                    <Button disabled= {loading} className="w-100" type ="submit">SignUP</Button>
                </Form>
            </Card.Body>
        </Card>

        <div className="w-100 text-center mt-2">
            Already have account? <Link to="/logIn">Log In</Link>
        </div>
            
        </>
    )
}
