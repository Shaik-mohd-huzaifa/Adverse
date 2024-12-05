import { Route, Routes } from 'react-router'
import './App.css'
import { DashBoard } from './components/Dashboard/Dashboard.component'
import { AdsGenerator } from './components/Ads Generator/AdsGenerator.component'
import { Organisation } from './components/Organisation/Organisation.component'

function App() {
  return (
    <>
      <Routes>
        <Route path='dashboard' element={<DashBoard/>}>
        <Route index element={<AdsGenerator/>}/>
        <Route path='AdsGeneration' element={<AdsGenerator/>}/>
        <Route path='Organisations' element={<Organisation/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
