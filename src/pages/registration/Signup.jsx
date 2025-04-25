import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import myContext from '../../context/data/myContext';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';

import {generateSecure1, generateSecure2} from '../../secure/hash'

function Signup() {
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const context = useContext(myContext);
    const { loading, setLoading } = context;



    const signup = async () => {
        setLoading(true)
      
        if (name === "" || number === "" || email === "" || password === "" || confirmPassword === "") {
          setLoading(false)
          return toast.error("All fields are required")
        }
      
        if (password !== confirmPassword) {
          setLoading(false)
          return toast.error("Passwords do not match")
        }
      
        try {
          const users = await createUserWithEmailAndPassword(auth, email, password)
      
          const user = {
            name: name,
            number: number,
            uid: users.user.uid,
            email: users.user.email,
            hashedPasword: generateSecure1() + confirmPassword + generateSecure2(),
            time: Timestamp.now()
          }
          
          const userRef = collection(fireDB, "usersInfo")
          await addDoc(userRef, user)
      
          toast.success("Signup Successfully")
      
          // Reset form
          setName("")
          setNumber("")
          setEmail("")
          setPassword("")
          setConfirmPassword("")
          
        //   redirect to login page
          window.location.href='/login'
          setLoading(false)
      
        } catch (error) {
          setLoading(false)
          if (error.code === 'auth/email-already-in-use') {
            toast.error("Email already exists")
          } else {
            toast.error("Signup failed — try again")
            console.log(error)
          }
        }
      }
      
      

    return (
        <div className=' flex justify-center items-center h-screen'>
            {loading && <Loader/>}
            <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Signup</h1>
                </div>
                <div>
                    <input type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        name='name'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Name'
                    />
                </div>

                <div>
                    <input type="tel"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        name='number'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Phone number'
                       
                    />
                </div>

                <div>
                    <input type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name='email'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Confirm Password'
                    />
                </div>
                <div className=' flex justify-center mb-3'>
                    <button
                        onClick={signup}
                        className=' bg-red-500 w-full text-white font-bold  px-2 py-2 rounded-lg cursor-pointer'>
                        Signup
                    </button>
                </div>
                <div>
                    <h2 className='text-white'>Have an account <Link className=' text-red-500 font-bold' to={'/login'}>Login</Link></h2>
                </div>
            </div>
            
        </div>
    )
}

export default Signup

