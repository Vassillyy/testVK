import {useState} from 'react'
import {Table} from '@/components/table'
import {Button} from '@/components/button'
import {Modal} from '@/components/modal'
import './App.sass'

function App() {
  const [reloadTrigger, setReloadTrigger] = useState(0)

  const reloadTable = () => {
    setReloadTrigger((prev) => prev + 1)
  }
  return (
    <div className="appContainer">
      <Table reloadTrigger={reloadTrigger} />
      <Button />
      <Modal onSuccess={reloadTable} />
    </div>
  )
}

export default App
