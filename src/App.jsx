import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import AuthCallback from "./pages/AuthCallback";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 첫 화면(/) MainPage */}
        <Route path="/" element={<MainPage />} />

        {/* 로그인 페이지 */}
        <Route path="/login" element={<Login />} />

        {/* 게스트 로그인 후 경로 */}
        <Route path="/guest" element={<div> after guest login </div>} />

        {/* 카카오 인가 코드 수신 경로 */}
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* 카카오 로그인 완료 후 경로 */}
        <Route path="/main" element={<MainPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;