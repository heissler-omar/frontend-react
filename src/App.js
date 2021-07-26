import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// Components:
import CreateUsers from './components/createUsers/CreateUsers';
import ViewUsers from './components/viewUsers/ViewUsers';

function App() {
  return (
    <div className="App">
      
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <div className="row principalRow">
        <div className="col-7">
          <CreateUsers/>
        </div>
      </div>
      <div className="row principalRow">
        <div className="col-7">
          <ViewUsers/>
        </div>
      </div>
      
    </div>
  );
}

export default App;
