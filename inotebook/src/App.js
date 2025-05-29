import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './component/NavBar/Navbar';
import Home from './component/Home/Home';
import About from './component/About/About';
import NoteState from './component/context/NoteState';
import Notes from './component/Notes/Notes';


function App() {
  return (
    <div>
      <NoteState>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/notes' element={<Notes/>}/>
      </Routes>
      </NoteState>
    </div>
  );
}

export default App;
