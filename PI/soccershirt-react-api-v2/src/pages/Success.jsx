import React from 'react'
import { Link } from 'react-router-dom'
export default function Success(){
  return (<div className="center">
    <h1>Compra concluída! ⚽</h1>
    <p>Seu pedido foi realizado com sucesso.</p>
    <p>Em breve, enviaremos mais informações.</p>
    <p><Link className="btn" to="/">Voltar à loja</Link></p>
  </div>)
}
