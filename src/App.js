import { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Route, Routes, useNavigate } from "react-router-dom";
import Admin from "./components/admin";
import Consumer from "./components/consumer";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/") navigate("/admin");
  })

  return (
    <DndProvider backend={HTML5Backend} >
      <Routes>
          <Route
            path="*"
            element={<Admin />}
          />
          <Route index exact path="/admin" element={<Admin/>}/>
          <Route exact path="/consumer" element={<Consumer/>}/>
      </Routes>
    </DndProvider>
  );
}

export default App;
