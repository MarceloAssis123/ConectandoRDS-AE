'use client'

import { useState } from "react";
import styles from "./home.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const route = useRouter()

  function ButtonCLick(){

    route.replace('/livros')
  }


  const [nome, setNome] = useState('');
  const [numeroDePaginas, setNumeroDePaginas] = useState('');
  const [dataDeLancamento, setDataDeLancamento] = useState('');

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const livroData = {
      nome,
      numeroDePaginas,
      dataDeLancamento
    };

    try {
      const response = await fetch('/api/livro', { // Substitua pelo caminho correto do seu endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(livroData)
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Livro enviado com sucesso:', result);

      // Limpar o formulário ou executar outras ações após o envio bem-sucedido
      setNome('');
      setNumeroDePaginas('');
      setDataDeLancamento('');
      alert('Livro Adicionado')

    } catch (error) {
      console.error('Falha ao enviar o livro:', error);
      // Tratar o erro, por exemplo, mostrando uma mensagem para o usuário
    }
  };

  return (
    <div className={styles.container}>
      <button onClick={ButtonCLick} className={styles.contactButton}>
        Ver Livros
        <div className={styles.iconButton}>
          <svg
            height="24"
            width="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </button>
      <div className={styles.divForm}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <p className={styles.title}>Adicionar livro </p>
          <label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className={styles.input}
              required
            />
            <span>Nome</span>
          </label>

          <label>
            <input
              type="number"
              value={numeroDePaginas}
              onChange={(e) => setNumeroDePaginas(e.target.value)}
              className={styles.input}
              required
            />
            <span>Número de Páginas</span>
          </label>

          <label>
            <input
              type="date"
              value={dataDeLancamento}
              onChange={(e) => setDataDeLancamento(e.target.value)}
              className={styles.inputdate}
              required
            />
            <span>Data de Lançamento</span>
          </label>

          <button className={styles.submit} type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};