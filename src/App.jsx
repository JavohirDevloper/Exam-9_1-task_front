import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import CreateRoom from "./pages/CreateRoom";
import ListRoom from "./pages/ListRoom";
import ShowRoom from "./pages/ShowRoom";
import UpdateRoom from "./pages/UpdateRoom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ListRoom />} />
        <Route path="/add-room" element={<CreateRoom />} />
        <Route path="/show-room/:id" element={<ShowRoom />} />
        <Route path="/update-room/:id" element={<UpdateRoom />}></Route>
      </Routes>
    </>
  );
}
export default App;
