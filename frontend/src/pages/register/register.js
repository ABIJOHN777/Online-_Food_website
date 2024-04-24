import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import './register.css'
import Swal from 'sweetalert2';

export default function Register() {

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      window.location.href = '/'
    }
  }, [])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')
  const [loading, setLoading] = useState(false)


  const navigate = useNavigate()


  function handleregister(e) {
    e.preventDefault();
    setLoading(true);
    if (password !== cpassword) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Passwords do not match",
        showConfirmButton: false,
        timer: 2000
      });
      setLoading(false);
      return;
    }
  
    // Check if the email ends with "@jecc.ac.in"
    if (!email.toLowerCase().endsWith('@jecc.ac.in')) {
        alert("please enter jecc mail id")
      setLoading(false);
      return
      
    }
  
    axios.post(`${process.env.REACT_APP_BACKEND_URL}register/user/UserRegister`, { name, email, password })
      .then((result) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully Registered",
          showConfirmButton: false,
          timer: 2000
        });
        navigate('/Login');
      })
      .catch(err => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Couldn't Register",
          showConfirmButton: false,
          timer: 2000
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="register-container">
      <div className="register-form">
        <h2 className="register-title">Register</h2>
        <form onSubmit={handleregister} >
          <input required type="text" placeholder='name' className='form-control' value={name} onChange={(e) => setName(e.target.value)} />
          <input required type="email" placeholder='email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input required type="password" placeholder='password' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} />
          <input required type="password" placeholder='confirm password' className='form-control' value={cpassword} onChange={(e) => setCpassword(e.target.value)} /><br/>
          <button style={{borderRadius:"100px",backgroundColor:"#5f518f"}} className='btn btn-standard' disabled={loading} >
            {loading && <i className='fa fa-refresh fa-spin'></i>}
            {loading && <span>loading..</span>}
            {!loading && <span>Register</span>}

          </button>
          <p>Have an Account? <Link to='/Login'>Login</Link></p>
        </form>
      </div>
    </div>
  )
}
