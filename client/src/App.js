import { useState, useEffect } from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import School from "./Components/School";
import CreateSchool from "./Components/CreateSchool";
import axios from "axios";

function App() {
  const [data, setData] = useState({schools: []});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await axios(process.env.REACT_APP_API_URL + "/schools");
      setData(result.data.schools);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <div>
        <Link to="/">
          Schools
        </Link>
        <Link to="/create-school">
          Create
        </Link>
      </div>
      <Switch>
        <Route path="/school/:id" exact>
            <School />
          </Route>
          <Route path="/create-school" exact>
            <CreateSchool />
          </Route>
          <Route path="/" exact>
            <div>
              <h1>HOME</h1>
              {loading ? <p>Loading</p> : data && data.length > 0 ?
                data.map((school) =>           
                  (<div key={school._id}>
                    <Link to={`/school/${school._id}`}>View</Link>
                    <p>{school.schoolName}</p>
                  </div>)
                )
              : <p>No Schools</p>}
              
            </div>
          </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
