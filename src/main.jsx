import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './components/Header.jsx'
import Nav from './components/nav.jsx'
import Search from './components/chatContent/input.jsx'
import Content from './components/chatContent/content.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Nav />
    <Content />
    <Search />
  </StrictMode>,
)
