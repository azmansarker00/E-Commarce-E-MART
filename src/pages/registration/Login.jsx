import { Link } from 'react-router-dom'
import myContext from '../../context/data/myContext';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Loader from '../../components/loader/Loader';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const context = useContext(myContext)
    const { loading, setLoading} = context

    const login = async () => {
        setLoading(true);
        try {
          const result = await signInWithEmailAndPassword(auth, email, password);
          localStorage.setItem('user', JSON.stringify(result));
          toast.success('Signin Successfully');
          window.location.href = '/';
        } catch (error) {
          switch (error.code) {
            case 'auth/user-not-found':
              toast.error("You don't have any account. Redirecting to signup...");
              setTimeout(() => {
                window.location.href = '/signup';
              }, 2000);
              break;
            case 'auth/wrong-password':
              toast.error("Incorrect password. Please try again.");
              break;
            case 'auth/invalid-email':
              toast.error("Invalid email format.");
              break;
            default:
              toast.error("Signin Failed. Please try again.");
          }
        }
        setLoading(false);
      };
      
   
    return (
        <div className=' flex justify-center items-center h-screen'>
            {loading && <Loader/>}
            <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Login</h1>
                </div>
                <div>
                    <input type="email"
                        name='email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                    />
                </div>
                <div className=' flex justify-center mb-3'>
                    <button
                    onClick={login}
                        className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg cursor-pointer hover:bg-yellow-600 transition-all duration-300 ease-in-out'>
                        Login
                    </button>
                </div>
                <div>
                    <h2 className='text-white'>Don't have an account <Link className=' text-yellow-500 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Login