import React from "react";
import {IonApp, IonRouterOutlet} from "@ionic/react";
import {IonReactRouter} from "@ionic/react-router";
import Home from "./pages/Home";
import {Redirect, Route} from "react-router-dom";
import BmiCalc from "./pages/BmiCalc";
import BmrCalc from "./pages/BmrCalc";

const App: React.FC = () => {
  return(
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home" component={Home} />
        <Redirect exact from="/" to="/home" />
        <Route exact path="/bmi" component={BmiCalc} />
        <Route exact path="/bmr" component={BmrCalc} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
  )
};

export default App;