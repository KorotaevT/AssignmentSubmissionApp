import { useState } from "react";
import "./App.css";
import { useLocalState } from "./util/useLocalStorage";
import { Route, Routes } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Dashboard from "./Dashboard";
import CodeReviwerDashboard from "./CodeReviewerDashboard";
import Homepage from "./Homepage";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import AssignmentView from "./AssignmentView";
import "bootstrap/dist/css/bootstrap.min.css";
import CodeReviewerAssignmentView from "./CodeReviewerAssignmentView";

function App() {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [roles, setRoles] = useState(getRolesFromJwt());

  function getRolesFromJwt() {
    if (jwt) {
      const decodedJwt = jwtDecode(jwt);
      return decodedJwt.authorities;
    } else {
      return [];
    }
  }

  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          roles.find((role) => role === "REVIEWER") ? (
            <PrivateRoute>
              <CodeReviwerDashboard />
            </PrivateRoute>
          ) : (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          )
        }
      />
      <Route
        path="/assignments/:id"
        element={
          roles.find((role) => role === "REVIEWER") ?
          <PrivateRoute>
            <CodeReviewerAssignmentView />
          </PrivateRoute>:
          <PrivateRoute>
            <AssignmentView />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Homepage />} />
    </Routes>
  );
}

export default App;
