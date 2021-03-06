import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import School from "./Components/School";
import CreateSchool from "./Components/CreateSchool";
import UpdateSchool from "./Components/UpdateSchool";
import "./styles.css";
import Home from "./Components/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="navbar">
        <Link to="/">
          Schools
        </Link>
        <Link to="/create-school">
          Create
        </Link>
      </div>
      <div className="main">
      <Switch>
          <Route path="/school/:id" exact>
            <School />
          </Route>
          <Route path="/update-school/:id" exact>
            <UpdateSchool />
          </Route>
          <Route path="/create-school" exact>
            <CreateSchool />
          </Route>
          <Route path="/">
            <Home />
          </Route>
      </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
