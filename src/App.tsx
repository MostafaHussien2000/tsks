import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<>Hello From Home Page.</>} />
        <Route path="/login" element={<>Hello From Login Page.</>} />
        <Route path="/register" element={<>Hello From Sign Up Page.</>} />
      </Routes>
    </>
  );
}

export default App;
