import { useNavigate } from "react-router-dom";
import kakaoBtn from "../assets/kakao_login.png";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const handleKakaoLogin = async () => {
    try {
      const response = await fetch("/api/auth/kakao/login");

      if (!response.ok) {
        throw new Error("카카오 로그인 URL 요청 실패");
      }

      const data = await response.json();

      if (data.code !== "SUCCESS" || !data.content) {
        throw new Error(data.message || "카카오 로그인 URL이 없습니다.");
      }

      window.location.href = data.content;
    } catch (error) {
      console.error("카카오 로그인 실패:", error);
    }
  };

  const handleGuestLogin = () => {
    navigate("/guest");
  };

  return (
    <div className="login-page">
      <section className="login-content">
        <div className="login-title-box">
          <h1>FIND YOUR NUMBER 18</h1>
        </div>

        <p className="login-description">
          친구들이 추천한 노래로 나만의 노래 정체성을 발견해요
        </p>
      </section>

      <section className="login-button-section">
        <p className="login-sub-text">SNS 계정으로 간편 가입하기</p>

        <img
          src={kakaoBtn}
          onClick={handleKakaoLogin}
          alt="카카오계정으로 로그인"
          className="kakao-login-button"
        />

        <button onClick={handleGuestLogin} className="guest-login-button">
          게스트로 추천만 할게요→
        </button>
      </section>
    </div>
  );
}