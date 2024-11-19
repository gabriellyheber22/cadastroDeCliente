var containerCadastro;

document.addEventListener("DOMContentLoaded", function () { //função DOMContentLoaded --> Ele é disparado quando o documento HTML inicial foi completamente carregado e analisado, sem esperar que folhas de estilo, imagens e subframes sejam completamente carregados
    containerCadastro = document.getElementsByClassName('containerPrincipal__cadastro')[0];
});



function cadastroCliente() {// Função de abrir e Fechar o container de Cadastro

    var styleCadastro = window.getComputedStyle(containerCadastro);// styleCadastro:  Verifica o estilo computado do elemento, ou seja, verifica o estilo definido tanto Inline, quanto no CSS
    if (styleCadastro.display === "none") {
        containerCadastro.style.display = "block";
    } else {
        containerCadastro.style.display = "none";
    }
}

//function cancela() {
//    containerCadastro.style.display = "none";
//}

class Cliente {
    constructor() {
        this.id = 1;
        this.arrayCliente = [];
        this.editId = null;
        

    }
    salva() {
        let cliente = this.lerDadosInput(); //Atribuindo a função ler dados na variavel cliente
        if(this.validaCampo(cliente)){ //Verificando se é verdadeiro
           if(this.editId == null){
            this.adicionar(cliente);
        }else{
            this.editar(this.editId, cliente);
        }
        }
        this.listaTabela();
        this.cancela();// Chama a função cancelar depois de salvar, para que os campos de entradas sejam limpos

    }

    lerDadosInput() {
        let cliente = {}; //Criando um objeto vazio
        cliente.id = this.id;
        cliente.nome = document.getElementById('nome').value; //Pegando o valor informado no input
        cliente.email = document.getElementById('email').value;
        cliente.celular = document.getElementById('telefone').value;
        cliente.cidade = document.getElementById('cidade').value;

        return cliente;
    }
    validaCampo(cliente) {
        let mensagem = '';
        let camposVazios = [];
        let primeiroCampoVazio = null;
        if (cliente.nome == '') {
            camposVazios.push(cliente.nome);
            mensagem += '* Informe o nome do Cliente.\n';
           
            //document.getElementById("nome").style.borderColor = "lightblue";
            //document.getElementById("nome").focus();
            
        }
        if (cliente.email == '') {
            camposVazios.push(cliente.email);
            mensagem += '* Informe o Email do Cliente.\n';
            
           // document.getElementById("email").style.borderColor = "lightblue";
           // document.getElementById("email").focus();
        }
        if (cliente.celular == '') {
            camposVazios.push(cliente.celular);
            mensagem += '* Informe o Telefone do Cliente.\n';
            
            //document.getElementById("telefone").style.borderColor = "lightblue";
            //document.getElementById("telefone").focus();
        }
        if (cliente.cidade == '') {
            camposVazios.push(cliente.cidade);
            mensagem += '* Informe o cidade do Cliente.\n';
           
            //document.getElementById("cidade").style.borderColor = "lightblue";
            //document.getElementById("cidade").focus();
        }
        if (mensagem != '') {
            alert(mensagem + camposVazios.join(", "));
           // alert(mensagem);
            //containerCadastro.style.display = "block";
            document.getElementById(primeiroCampoVazio).focus();
            return false;
            
        }
        
        return true;
    }

    adicionar(cliente){
        this.arrayCliente.push(cliente);
        this.id++; //Incrementando o Id para o proximo ciente
    }

    listaTabela(){
        let tbody = document.getElementById('bodyTabela');
        tbody.innerText = ''; //Inicializando a a tabela como vazia toda vez que for chamada a função listaTabela, para que os campos de entradas sejam limpos 

        for( let i=0; i< this.arrayCliente.length; i++){ //Percorrendo os itens do vetor
            let linha = tbody.insertRow(); //Inserindo nova linha na tabela
            
            let celula_id = linha.insertCell(); //Insere uma celula (coluna) Id na linha
            celula_id.classList.add('coluna__id'); //Adiciona a classe coluna__id para deixar o display como none
            
            let celula_nome = linha.insertCell(); //Criando uma celula (coluna) na linha
            let celula_email = linha.insertCell();
            let celula_celular = linha.insertCell();
            let celula_cidade = linha.insertCell();
            let celula_acaos = linha.insertCell();

            celula_nome.innerText = this.arrayCliente[i].nome; //Inserindo os dados no Html
            celula_email.innerText = this.arrayCliente[i].email;
            celula_celular.innerText = this.arrayCliente[i].celular;
            celula_cidade.innerText = this.arrayCliente[i].cidade;

            //Criando botões

            let botaoEditar = document.createElement('button');
            botaoEditar.innerText = 'Editar';
            botaoEditar.classList.add('botaoEditar');
            botaoEditar.setAttribute('onclick', 'cliente.preparaEdicao ('+ JSON.stringify(this.arrayCliente[i])+')'); //Convertendo o objeto vetor produto em uma string json para os dados retornar ao input por meio da função preparaEdicao

            let botaoExcluir = document.createElement('button');
            botaoExcluir.innerText = 'Excluir';
            botaoExcluir.classList.add('botaoExcluir');
            botaoExcluir.setAttribute('onclick', 'cliente.deletar('+ this.arrayCliente[i].id+ ')') //inserindo a função deletar na imagem de exclusão, passando o id do produto como parametro concatenado para identifcar a linha que é para excluir

            celula_acaos.appendChild(botaoEditar); //Adicionando os botoes na coluna de Ações
            celula_acaos.appendChild(botaoExcluir);
       
        }

    }
    editar(id, cliente){
        
        for(let i=0; i<this.arrayCliente.length; i++){
            if(this.arrayCliente[i].id == id){
                this.arrayCliente[i].nome = cliente.nome;
                this.arrayCliente[i].email = cliente.email;
                this.arrayCliente[i].celular = cliente.celular;
                this.arrayCliente[i].cidade = cliente.cidade;
            }
        }
    }

    preparaEdicao(dados){
        this.editId = dados.id;
        containerCadastro.style.display = "block";
        document.getElementById('nome').value = dados.nome;
        document.getElementById('email').value = dados.email;
        document.getElementById('telefone').value = dados.celular;
        document.getElementById('cidade').value  = dados.cidade;
        document.getElementById('botaoAtualiza').innerText = 'Atualizar';
    }
    

   cancela(){
    document.getElementById('nome').value = '';//Deixando o campo input vazio ao se clicado em cancelar 
    document.getElementById('email').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('botaoAtualiza').innerText = 'Salvar'
    this.editId = null;
    containerCadastro.style.display = "none";
   }
   deletar(id, cliente){
    if(confirm('Deseja realmente deletar o cliente do ID: ' +id)){//Alert de confirmação antes de executar a função de deletar
    let tbody = document.getElementById('bodyTabela');
    for(let i=0; i<this.arrayCliente.length; i++){
        if(this.arrayCliente[i].id== id){
            this.arrayCliente.splice(i,1);
            tbody.deleteRow(i);
        }
    }
   }

}
}
let cliente = new Cliente();

