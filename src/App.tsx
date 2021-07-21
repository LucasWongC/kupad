import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createWeb3ReactRoot, Web3ReactProvider } from "@web3-react/core";
import { Header, Footer } from "components";
import Home from "pages/Home";
import Sale from "pages/Sale";
import SaleDetail from "pages/SaleDetail";
import Staking from "pages/Staking";

import "styles/global.css";
import { NetworkContextName } from "constants/misc";
import getLibrary from "utils/getLibrary";

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);

const App: React.FC = () => (
  <Web3ReactProvider getLibrary={getLibrary}>
    <Web3ProviderNetwork getLibrary={getLibrary}>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/sale" exact>
            <Sale />
          </Route>
          <Route path="/sale/detail" exact>
            <SaleDetail />
          </Route>
          <Route path="/staking" exact>
            <Staking />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </Web3ProviderNetwork>
  </Web3ReactProvider>
);

export default App;
