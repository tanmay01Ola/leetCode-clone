import {BrowserRouter , Routes , Route} from "react-router";
import "./index.css";
import { Signup } from "./screens/signup";

export function App() {
  return(
      <div>
        <BrowserRouter>
            <Routes>
              <Route path="/signup" element={<Signup></Signup>}></Route>
              </Routes>
                </BrowserRouter>
      </div>
  )
}

export default App;
