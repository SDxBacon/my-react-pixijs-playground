import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Jet from "pages/Jet";
import Town from "pages/Town";
import CardFire from "pages/CardFire";
import "./App.css";

const App = () => {
  return (
    <div className="App-header">
      <Router>
        <Switch>
          <Route path="/jet" component={Jet} />

          <Route path="/town" component={Town} />

          <Route path="/card-fire" component={CardFire} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
