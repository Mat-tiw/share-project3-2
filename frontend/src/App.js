import { Route, Routes } from 'react-router-dom';
import './styles/App.css';
import Login from './components/login'
import Main from './components/main'
import Display from './components/display';
import Register from './components/register';
import User from './components/user'
import Testpage from './components/testpage';
import Testing from './testing/testing';
import Testlanding from './testing/testlanding'
import Testingcompare from './testing/testingcompare'
import Admin from './components/admin';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Login/>}/>
        <Route path='/Main' element={<Main/>}/>
        <Route path='/Display' element={<Display/>}/>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/User' element={<User/>}/>
        <Route path='/test' element={<Testpage/>}/>
        <Route path='/testi' element={<Testing/>}/>
        <Route path='testinput' element={<Testingcompare/>}/>
        <Route path='testland' element={<Testlanding/>}/>
        <Route path='admin'element={<Admin/>}/>
      </Routes>
    </div>
  );
}

export default App;
