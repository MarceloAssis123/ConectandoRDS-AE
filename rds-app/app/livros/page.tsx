'use client'

import { useRouter } from 'next/navigation'
import styles from './livros.module.css'
import { useEffect, useState } from "react"


export default function Livro() {

    const route = useRouter()

    function ButtonCLick() {

        route.replace('/')
    }

    const [livros, setLivros] = useState([]);

    useEffect(() => {
        async function buscarLivros() {
            const res = await fetch('/api/livro');
            const livros_ = await res.json();
            setLivros(livros_)
        }

        buscarLivros();
    }, []);

    if (!livros) return <div>Carregando...</div>;

    return (
        <div className={styles.container}>
            <button onClick={ButtonCLick} className={styles.contactButton}>
                Adicionar Livro
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
            <div className={styles.divLivros}>
                {livros.map((item: { id: number, nome: string, numerodepaginas: number, datadelancamento: string }, index) => {
                    const dataDeLancamento = new Date(item.datadelancamento)
                    const day = dataDeLancamento.getUTCDate().toString().padStart(2, '0');
                    const month = (dataDeLancamento.getUTCMonth() + 1).toString().padStart(2, '0'); // getMonth() retorna mês de 0-11
                    const year = dataDeLancamento.getUTCFullYear();
                    item.datadelancamento = `${day}-${month}-${year}`

                    return (<h1 key={index} className={styles.livros}>ID: {item.id}, Nome: {item.nome}, Número de Páginas: {item.numerodepaginas}, Data de lançamento: {item.datadelancamento}</h1>)
                })}

            </div>
        </div>
    )
}