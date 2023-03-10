'use strict';

let banco = [];

const getBanco = () => JSON.parse(localStorage.getItem ('TodoList')) ?? [];
const setBanco = (banco) => localStorage.setItem ('TodoList', JSON.stringify(banco));

const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('todoItem');
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}>
    `;
    document.getElementById('TodoList').appendChild(item);
}

const limparTarefas = () => {
    const TodoList = document.getElementById('TodoList');
    while (TodoList.firstChild){
        TodoList.removeChild(TodoList.lastChild);
    }
}

const atualizarTela = () => {
    limparTarefas();
    const banco = getBanco();
    banco.forEach ((item, indice) => criarItem (item.tarefa, item.status, indice));
}

const inserirTarefa = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === 'Enter'){
        const banco = getBanco();
        banco.push ({'tarefa': texto, 'status': ''})
        setBanco(banco);
        atualizarTela();
        evento.target.value = '';
    }
}

const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice (indice, 1);
    setBanco(banco);
    atualizarTela();
}

const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    setBanco(banco);
    atualizarTela();
}

const clicItem = (evento) => {
    const elemento = evento.target;
    console.log (elemento.type);
    if(elemento.type === 'button'){
        const indice = elemento.dataset.indice;
        removerItem(indice);
    }else if (elemento.type === 'checkbox'){
        const indice = elemento.dataset.indice;
        atualizarItem (indice);
    }
}

document.getElementById('newItem').addEventListener('keypress', inserirTarefa);
document.getElementById('TodoList').addEventListener('click', clicItem);

atualizarTela();