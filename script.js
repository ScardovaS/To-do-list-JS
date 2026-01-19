const inputTarefa = document.getElementById("inputTarefa");
const botaoAdd = document.getElementById("addTarefa");
const listaTarefa = document.getElementById("listaTarefa");
const botaoClean = document.getElementById("clean");
const filtroPen = document.getElementById("pendentes");
const filtroCon = document.getElementById("concluidas");
const filtroAll = document.getElementById("todas");
let filtroAtual = "todas"


let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function salvarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function removerTarefa(id) {
  tarefas = tarefas.filter(tarefa => tarefa.id !== id);
  salvarTarefas();
  renderizarTarefas();
}


function renderizarTarefas() {
  listaTarefa.innerHTML = "";

  let tarefasFiltradas = [];

  if (filtroAtual === "todas") {
    tarefasFiltradas = tarefas;
  } else if (filtroAtual === "pendentes") {
    tarefasFiltradas = tarefas.filter(tarefa => !tarefa.concluida);
  } else if (filtroAtual === "concluidas"){
    tarefasFiltradas = tarefas.filter(tarefa=> tarefa.concluida)
  }

  tarefasFiltradas.forEach(tarefa => {
    const li = document.createElement("li");
    li.textContent = tarefa.texto;

    if (tarefa.concluida) {
      li.classList.add("ativo");
    }

    li.addEventListener("click", () => {
      tarefa.concluida = !tarefa.concluida;
      salvarTarefas();
      renderizarTarefas();
    });

    listaTarefa.appendChild(li);

    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "Remover";
    botaoRemover.addEventListener("click", (e) => {
      e.stopPropagation(); // evita ativar o toggle
      removerTarefa(tarefa.id);
    });

    li.appendChild(botaoRemover);
  });
}

function adicionarTarefa() {
  const text = inputTarefa.value.trim();
  if (text === "") return;

  const novaTarefa = {
    id: Date.now(),
    texto: text,
    concluida: false
  };

  tarefas.push(novaTarefa);
  salvarTarefas();
  renderizarTarefas();

  inputTarefa.value = "";
}

botaoAdd.addEventListener("click", adicionarTarefa);

inputTarefa.addEventListener("keydown",(e)=>{

  
})

botaoClean.addEventListener("click", () => {
  tarefas = [];
  salvarTarefas();
  renderizarTarefas();
});

filtroPen.addEventListener("click", ()=>{
  filtroAtual = "pendentes"
  renderizarTarefas()
})

filtroCon.addEventListener("click", ()=>{
  filtroAtual = "concluidas"
  renderizarTarefas()
})

filtroAll.addEventListener("click", ()=>{
  filtroAtual = "todas"
  renderizarTarefas()
})

renderizarTarefas();
