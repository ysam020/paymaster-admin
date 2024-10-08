import "./App.css";
import { useState } from "react";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import { UserContext } from "./contexts/UserContext";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("pm_user")));
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">{user ? <Homepage /> : <LoginPage />}</div>
    </UserContext.Provider>
  );
}

export default App;
