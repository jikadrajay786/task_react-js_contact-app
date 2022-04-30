import { authContext } from "./Context/LoginContext";
import { useState, useEffect } from "react";
import Container from "./components/Container";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import PageNotFound from "./components/PageNotFound";
import { ProtectedRoute } from "./components/Protected";
import GridComp from "./components/GridComp";
import ListComp from "./components/ListComp";

const App = () => {
  const [authStatus, setAuthStatus] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("loggedData"));
    if (data) {
      setAuthStatus(true);
    }
    return true;
  }, [authStatus, setAuthStatus]);

  return (
    <>
      <BrowserRouter>
        <authContext.Provider value={{ authStatus, setAuthStatus }}>
          <Routes>
            <Route path="" element={<Navigate to="/login" />} />

            <Route
              path="/login"
              element={
                <ProtectedRoute>
                  <Container />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                authStatus === true ? (
                  <Navigate to="/dashboard/grid" />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="grid" element={<GridComp />} />
              <Route path="list" element={<ListComp />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </authContext.Provider>
      </BrowserRouter>
    </>
  );
};
export default App;
