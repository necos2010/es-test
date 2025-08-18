import { Routes, Route } from "react-router-dom";

import Main from "./features/Main/MainPage.tsx";
import Warning from "./features/Warning/Warning.tsx";
import Questions from "./features/Question/Questions.tsx";
import Congra from "./features/Congra/Congra.tsx";
import Loading from "./features/LoadingPage/Loading.tsx";

function App() {
  return (
    <Routes>
      <Route path="/congra" element={<Congra/>}/>
      <Route path="/questions" element={<Questions/>}/>
      <Route path="/warning" element={<Warning/>} />
      <Route path="/main" element={<Main />} />
      <Route path="/loading" element={<Loading/>}/>
    </Routes>
  );
}

export default App;
