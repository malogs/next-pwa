"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { AuthProvider, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { auth } from '../firebase';

const Login = () => {
  // const navigate = useNavigate();
  const router = useRouter();

  useEffect(() => {
    const userJson = localStorage.getItem('maL_user');
    const user = userJson ? JSON.parse(userJson) : null;
    if (user) {
      toast("Already Signed in as: " + user.displayName, {type: 'success', theme: 'dark'});
      setTimeout(() => {
        router.push("/home");
      }, 500);
    }
  }, [router]);

  const loginWith = async (providerName: string) => {
    try {
      let provider: AuthProvider;
      switch(providerName) {
        case 'github':
          provider = new GithubAuthProvider();
          break;
        case 'google':
        default:
          provider = new GoogleAuthProvider();
      }
  
      const res = await signInWithPopup(auth, provider);
      localStorage.setItem('maL_user', JSON.stringify(res.user));
      toast("Signed in as: " +  res.user.displayName, {type: 'success', theme: 'dark'});
      setTimeout(() => {
        router.push("/home");
      }, 500);
    } catch (error: any) {
      
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    console.log(email, " AUTH ERROR: [", errorCode, "] ===> ", errorMessage);
    }
  }

  return (
    <div className='container login-container'>
      <div>
        <h2>Welcome to MaLogs</h2>
        <p>Take control of your finances today!</p>
      </div>
      <div className="btn-container">
        <button onClick={() => loginWith('google')}><FcGoogle /> <span>Continue with Google</span></button>
        <button onClick={() => loginWith('github')}><FaGithub /> <span>Continue with Github</span></button>
      </div>
    </div>
  )
}

export default Login