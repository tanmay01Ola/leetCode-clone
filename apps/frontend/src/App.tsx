import {BrowserRouter , Routes , Route} from "react-router";
import "./index.css";
import { Signup } from "./screens/signup";
import { Signin } from "./screens/signin";
import { LandingPage } from "./screens/landingPage";

export function App() {
  return(
      <div>
        <BrowserRouter>
            <Routes>
              <Route path="/signup" element={<Signup></Signup>}></Route>
              <Route path="/signin" element={<Signin></Signin>}></Route>
              <Route path="/landingPage" element={<LandingPage></LandingPage>}></Route>
              </Routes>
                </BrowserRouter>
      </div>
  )
}

export default App;
