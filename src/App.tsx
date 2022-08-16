import { useState } from "react"
import './style.css'
import { Tarefas } from "./components/Tarefas"
import { TarefaProps } from './components/Tarefas'

import * as Papa from 'papaparse'

function App() {
  const [tarefas, setTarefas] = useState<TarefaProps[]>([])

  async function importCalcure(event: any) {
    Papa.parse(event.target?.files[0], {
      delimiter: ',',
      skipEmptyLines: true,
      complete: function(res: any) {
        const dados: TarefaProps[] = []
        res.data.map((lista: any) => {
          dados.push({ nome: lista[0], feito: lista[1] === 'done' ? true : false })
        })
        setTarefas([...tarefas, ...dados])
      }
    })

  }

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
      <div className="importExport">
        <input type="file" name="file" accept=".csv" onChange={importCalcure} />
        {/* <button type="submit">Exportar tarefas</button> */}
      </div>
      <div className="addTarefa">
        <input className="input" id="tarefa" placeholder="Nova tarefa" />
        <button onClick={criaTarefa}>Adicionar</button>
      </div>
      {tarefas.map((tarefa, index) => {
        return (
          <Tarefas id={index} nome={tarefa.nome} feito={tarefa?.feito} />
        )
      })}
    </>
  )
}

export default App
