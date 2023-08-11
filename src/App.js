import { BrowserRouter as Router,Routes ,Route} from "react-router-dom";
import SignUp from './Pages/SignUp'
import Home from "./Pages/SingIn";
import Dashboard from "./Pages/Dashboard/Dashboard";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>

        <Route path="/dashboard" element={<Dashboard/>}/>
        
        <Route path="/signup" element={<SignUp/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
