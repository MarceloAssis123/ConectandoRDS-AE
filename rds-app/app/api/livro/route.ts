import query from '@/db/db';

export async function GET() {
    try {
        const response = await query('SELECT * FROM livros;');
        return new Response(JSON.stringify(response.rows), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Erro ao buscar livros:', error);
        return new Response(JSON.stringify({ error: 'Erro ao processar a solicitação' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function POST(req: any) {
    const { nome, numeroDePaginas, dataDeLancamento } = await req.json();
    console.log(dataDeLancamento)

    if (!nome || !numeroDePaginas || !dataDeLancamento) {
        return new Response(JSON.stringify({ error: 'Parâmetros insuficientes ou inválidos' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const response = await query(
            'INSERT INTO livros (nome, numeroDePaginas, dataDeLancamento) VALUES ($1, $2, $3) RETURNING *;',
            [nome, numeroDePaginas, dataDeLancamento]
        );

        return new Response(JSON.stringify(response.rows[0]), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Erro ao inserir livro:', error);
        return new Response(JSON.stringify({ error: 'Erro ao processar a solicitação' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}