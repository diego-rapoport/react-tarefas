import { useState } from "react"
import './style.css'
import { Tarefas } from "./components/Tarefas"
import { TarefaProps } from './components/Tarefas'

function App() {
  const [tarefas, setTarefas] = useState<TarefaProps[]>([])

  function criaTarefa() {
    const inputTarefa = document.getElementById('tarefa') as HTMLInputElement
    const nomeTarefa = inputTarefa.value
    const novaTarefa = {
      nome: nomeTarefa,
    }

    setTarefas([...tarefas, novaTarefa])
    inputTarefa.value = ''
  }

  return (
    <>
      <h1>Lista de Tarefas</h1>
      <div className="addTarefa">
        <input className="input" id="tarefa" placeholder="Nova tarefa" />
        <button onClick={criaTarefa}>Adicionar</button>
      </div>
      {tarefas.map((tarefa, index) => {
        return (
          <Tarefas id={index} nome={tarefa.nome} />
        )
      })}

    </>
  )
}

export default App
