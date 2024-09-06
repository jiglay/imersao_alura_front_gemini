function pesquisar () {
    let section = document.getElementById("resultados-pesquisa");
    let input = document.getElementById("input").value.toLowerCase();
    let resultado = "";

    if (input == "" || input == " ") {
        section.innerHTML = `
                <div class="item-resultado">
                    <p class="descricao-meta">Por favor, digite um atleta para pesquisar.</p>
                </div>
            `
        return;
    };

    for (let dado of dados) {
        let nome = dado.nome;
        let esporte = dado.esporte;
        let genero = dado.genero;

        if (nome.toLowerCase().includes(input) ||
            esporte.toLowerCase().includes(input) ||
            genero.toLowerCase().includes(input)) {
            resultado += `
                <div class="item-resultado">
                    <h2>
                        <a href="#" target="_blank">${dado.nome}</a>
                    </h2>
                    <p class="descricao-meta">${dado.descricao}</p>
                    <a href="${dado.link}" target="_blank">Mais informações</a>
                </div>
            `;
        }
    }

    section.innerHTML = resultado;

    if (!resultado) {
        section.innerHTML = `
                <div class="item-resultado">
                    <p class="descricao-meta">Desculpe. Não consegui achar esse atleta ou esporte na base.</p>
                </div>
            `
    }  
}

function verificarEnter(event) {
    if (event.keyCode === 13) {
      document.getElementById("pesquisar").click();
    }
}

async function enviarParaGemini(texto) {
    const resposta = await fetch('https://api.gemini.google.com/v1/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Adicione aqui sua chave de API e outras informações de autenticação
      },
      body: JSON.stringify({
        prompt: texto,
        // Outros parâmetros como modelo, temperatura, etc.
      })
    });
  
    const dados = await resposta.json();
    console.log(dados.message.content); // Exibe a resposta do Gemini
  }