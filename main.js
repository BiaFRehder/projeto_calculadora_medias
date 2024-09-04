const form = document.getElementById('form-atividade');
const imgAprovado = '<img src="./images/aprovado.png" alt= "Emoji celebrando" />';
const imgReprovado = '<img src="./images/reprovado.png" alt= "Emoji decepcionado" />';
const atividades = [];
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const notaMinima = parseFloat(prompt("Digite a nota mínima:"));

/// --> Esta variável está de fora, pois é uma variável global. Se colocasse dentro do evento, sempre que o submit for clicado essa variável iria resetar

let linhas = '';

form.addEventListener('submit', function(e) {
    e.preventDefault();

    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal();
});

function adicionaLinha() {
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    /// --> .includes é uma função para verificar um item. Nesse caso, estamos verificando se o input colocado já existe no array atividades
    if (atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade: ${inputNomeAtividade.value} já foi inserida`);
    } else {
        /// --> .push adiciona no array []. 
        /// --> parseFloat para dizer que é um número e pode não ser inteiro
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value));

        let linha = '<tr>';
        linha += `<td>${inputNomeAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`;
        linha += '</tr>';
    
        linhas += linha;
    }

    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal();

    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2);
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calculaMediaFinal() {
    let somaDasNotas = 0;

    for (let i = 0; i < notas.length; i++){
        somaDasNotas += notas[i];
    }

    return somaDasNotas / notas.length;
}

/* --> Essa forma é muito acoplada, portanto é melhor organizar através de funções 
form.addEventListener('submit', function(e){
    e.preventDefault();

    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');
    
    ///--> += é uma concatenação. Neste caso, estamos dizendo que uma linha é como um tr (linha da tabela). 
    ///--> Abaixo estamos dizendo que toda linha vai ser IGUAL um tr (nova linha de tabela) MAIS td(nova coluna da tabela) e o valor dos inputs (NomeAtividade e NotaAtividade) 
    ///--> Há um operador ternário para condições ("atalho"). if = ? else = :
    ///--> Finalizando com a linha sendo IGUAL a um tr (nova linha na tabela) MAIS fechamento da tag tr
    
    let linha = '<tr>';
    linha += `<td>${inputNomeAtividade.value}</td>`;
    linha += `<td>${inputNotaAtividade.value}</td>`;
    linha += `<td>${inputNotaAtividade.value >= 7 ? imgAprovado : imgReprovado}</td>`;
    linha += `</tr>`;

    linha += linha;

    const corpoTabela= documento.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
    
    --> Aqui limpamos o campo de input após submeter
    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
}); */