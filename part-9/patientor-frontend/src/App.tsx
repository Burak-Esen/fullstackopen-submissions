import React, { useEffect, FC } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";
import PatientModal from "./PatientModal";
import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { fetchPatientList, fetchDiagnoses } from './services';

import PatientListPage from "./PatientListPage";

const App: FC = () => {
  const [, dispatch] = useStateValue();

  useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);
    fetchPatientList(dispatch);
    fetchDiagnoses(dispatch);
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route exact path="/">
              <PatientListPage />
            </Route>
            <Route exact path="/patients/:id">
              <PatientModal />
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
