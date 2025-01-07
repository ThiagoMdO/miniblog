// CSS
import styles from './Login.module.css'

import { useState, useEffect } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const { login, error: authError, loading, sucess } = useAuthentication();
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      email,
      password
    }


    const response = await login(user)

    console.log(response);
  }

  useEffect(() => {
    if (authError) setError(authError);
  }, [authError]);

  return (
    <div className={styles.login}>
        <h1>Login</h1>
        <p>Faça o login para poder postar</p>
        <form onSubmit={handleSubmit}>
          
          <label>
            <span>Email:</span>
            <input 
              type='email'
              name='email'
              required
              placeholder='Digite seu email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <span>Senha:</span>
            <input 
              type="password"
              name='password'
              required
              placeholder='Digite sua senha'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          

          {!loading && 
            <button className='btn'>
              Entrar
            </button>
          }
          {loading && 
            <button className='btn' disabled>
              Aguarde
            </button>
          }
          
          
          {error && <p className='error'>{error}</p>}
          {sucess && <p className='sucess'>{sucess}</p>}
        </form>
    </div>
  )
}

export default Login