import Form from './components/Form'
import Header from './components/Header'

export default function App(){
  return (
    <div className="container">
      <div className="card">
        <Header title="Реєстрація" />
        <div className="separator" />
        <Form />
      </div>
    </div>
  )
}