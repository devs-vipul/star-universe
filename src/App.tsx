import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import CharacterList from "./pages/CharacterList";
import CharacterDetails from "./pages/CharacterDetails";
import { CharacterProvider } from "./context/CharacterContext";
import Toast from "./components/Toast";
import { cn } from "./lib/utils";
import Favorites from "./pages/Favorites";

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <BrowserRouter>
      <CharacterProvider>
        <div className="flex">
          <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
          <main
            className={cn(
              "min-h-[100vh] flex-1 p-8 bg-background-primary transition-all",
              isCollapsed ? "ml-16" : "ml-64"
            )}
          >
            <Routes>
              <Route path="/" element={<CharacterList />} />
              <Route path="/character/:id" element={<CharacterDetails />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
            <Toast />
          </main>
        </div>
      </CharacterProvider>
    </BrowserRouter>
  );
}

export default App;
