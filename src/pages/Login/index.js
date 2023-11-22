import React, { useState } from 'react'
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import Button from '../../components/Button';
import Input from '../../components/Input';
import useAuth from '../../hooks/useAuth';

const Login = () => {

  const { signin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    // if (!email | !senha) {
    //   setError("Preencha todos os campos");
    //   return;
    // }

    // const res = signin(email, senha);

    // if (res) {
    //   setError(res);
    //   return;
    // }

    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, passwd: senha }),
      });
      const data = await response.json();
      console.log(data)

      const res = signin(email, senha);

      if (res) {
        setError(res);
        return;
      }

      navigate("/home");

    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }

  };

  return (
    <C.Container>
      <C.Label>SISTEMA DE LOGIN</C.Label>
      <C.Content>
        <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        <C.labelError>{error}</C.labelError>
        <Button Text="Entrar" onClick={handleLogin} />
        <C.LabelSignup>
          Não tem uma conta?
          <C.Strong>
            <Link to="/signup">&nbsp;Registre-se</Link>
          </C.Strong>
        </C.LabelSignup>
      </C.Content>
    </C.Container>
  )
}

export default Login