import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <section className="container">
    <h2>Button Group</h2>
    <div className="btn-group">
    <button type="button" className="btn btn-primary">Apple</button>
    <button type="button" className="btn btn-primary">Samsung</button>
    </div>
    </section>
  );
}

export default App;