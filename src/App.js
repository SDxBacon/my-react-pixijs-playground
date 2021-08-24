import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Jet from "pages/Jet";
import Town from "pages/Town";
import Homepage from "pages/Homepage";
import CardFire from "pages/CardFire";
import "./App.css";

const history = createBrowserHistory();

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/jet" component={Jet} />

        <Route path="/town" component={Town} />

        <Route path="/card-fire" component={CardFire} />

        {/* FALLBACK: Homepage */}
        <Route component={Homepage} />
      </Switch>
    </Router>
  );
};

export default App;
