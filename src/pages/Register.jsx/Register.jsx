// CSS
import styles from './Register.module.css';

import { useState, useEffect } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { createUser, error: authError, loading, sucess } = useAuthentication();
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      displayName,
      email,
      password
    }

    // console.log(user)

    if (password !== confirmPassword) {
      setError("A senha precisa ser a mesma")
      return;
    }

    const response = await createUser(user)

    console.log(response);
  }

  useEffect(() => {
    if (authError) setError(authError);
  }, [authError]);

  return (
    <div className={styles.register}>
        <h1>Formulário de cadastro</h1>
        <p>Compartilhe suas histórias com seus amigos</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Nome:</span>
            <input 
              type='text'
              name='displayName'
              required
              placeholder='Seu nome completo' 
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </label>
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
          <label>
            <span>Confirme sua senha:</span>
            <input 
              type="password"
              name='confirmPassword'
              required
              placeholder='Confirme sua senha'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>

          {!loading && 
            <button className='btn'>
              Cadastrar
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

export default Register;