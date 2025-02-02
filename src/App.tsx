import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import CharacterList from "./pages/CharacterList";
import CharacterDetails from "./pages/CharacterDetails";
import Favorites from "./pages/Favorites";
import { CharacterProvider } from "./context/CharacterContext";
import Toast from "./components/Toast";

function App() {
  return (
    <BrowserRouter>
      <CharacterProvider>
        <div className="flex">
          <Sidebar />
          <main className="min-h-[100vh] flex-1 ml-64 p-8 bg-background-primary">
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
