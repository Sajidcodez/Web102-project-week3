import './App.css' 
import React from 'react'
import Nav from './Nav.jsx'
import CardContainer from './CardContainer.jsx'

function App() {
  return (
    <div className="appContainer">
      <Nav />
      <main className="content">
        <CardContainer />
      </main>
    </div>
  )
}

export default App ;
