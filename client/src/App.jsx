
import './App.css'

// import SecondTable from './component/secondTable'
// import Table from './component/table'
// import ThirdTable from './component/3table'
import Form from './component/form'
import Container from './container'
// import FourthTable from './component/fourthTable';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {

  return (
    <div className='app'>
      {/* <Table /> */}
      {/* <SecondTable /> */}
      {/* <ThirdTable /> */}
      {/* <Form /> */}
      {/* <Container /> */}
      <Router>
        <Routes>
          <Route path='/' element={<Container />}/>
          <Route path="/Form" element={<Form />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
