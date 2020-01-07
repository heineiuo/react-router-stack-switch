import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  HashRouter,
  Route,
  useParams,
  useHistory,
  Link
} from "react-router-dom";
import { StackSwitch } from "./StackSwitch";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Link className="App-link" to="/learn/1">
          Learn React
        </Link>
      </header>
    </div>
  );
};

const Learn: React.FC = () => {
  const params = useParams<{ chapter: string }>();
  const history = useHistory();
  return (
    <div>
      <div
        style={{
          height: 64,
          paddingLeft: 20,
          paddingRight: 20,
          borderBottom: "1px solid #eee",
          display: "flex",
          backgroundColor: "#fff",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div style={{ width: 300, display: "flex" }}>
          <div
            onClick={history.goBack}
            style={{
              color: "#000",
              fontWeight: 300,
              backgroundColor: "#fff",
              border: "1px solid #eee",
              borderRadius: 4,
              padding: 10
            }}
          >
            <span role="img" aria-label="back">
              ⬅️
            </span>{" "}
            BACK
          </div>
        </div>
        <div>learn: {params.chapter}</div>
        <div style={{ width: 300 }}></div>
      </div>
      <div className="App">
        <div style={{ height: 300 }}></div>
        <Link className="App-link" to={`/learn/${Math.random() * 100000}`}>
          learn more
        </Link>
      </div>
    </div>
  );
};

const Router: React.FC = () => {
  return (
    <HashRouter>
      <StackSwitch>
        <Route path="/" exact component={App}></Route>
        <Route path="/learn/:chapter" exact component={Learn}></Route>
      </StackSwitch>
    </HashRouter>
  );
};

export default Router;
