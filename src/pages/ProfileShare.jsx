import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileShare.css";
import plusIcon from "../assets/plus.png";

export default function ProfileShare() {
  const navigate = useNavigate();

  const [playlistName, setPlaylistName] = useState("봄날의 플레이리스트");
  const [copied, setCopied] = useState(false);

  const shareLink = "findyournumber18.com/pl/abc123";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
    } catch (error) {
      console.log("링크 복사 실패", error);
    }

    setCopied(true);
  };

  const handleGoRecommend = () => {
    navigate("/search");
  };

  return (
    <main className="profile-share-page">
      <header className="profile-share-header">
        <h1>FIND YOUR NUMBER 18</h1>
      </header>

      <section className="profile-share-title">
        <h2>나만의 플레이리스트 만들기</h2>
        <p>플레이리스트의 이름을 작성해 주세요!</p>
      </section>

      <section className="share-profile-image-section">
        <button type="button" className="share-profile-image-button">
          <span className="share-plus-button">
            <img src={plusIcon} alt="프로필 사진 추가" />
          </span>
        </button>
      </section>

      <section className="share-form-section">
        <label className="share-label" htmlFor="playlist-name">
          플레이리스트 이름 &#40;선택&#41;
        </label>

        <input
          id="playlist-name"
          type="text"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          className="share-input"
        />

        <label className="share-label share-link-label">공유 링크</label>

        <div className="share-link-box">{shareLink}</div>

        <p className="share-guide">
          링크를 공유하면 친구들이 곡을 추천 할 수 있어요
        </p>

        <button
          type="button"
          className={`copy-button ${copied ? "copied" : ""}`}
          onClick={handleCopyLink}
        >
          {copied ? "링크 복사 완료!" : "링크 복사하기"}
        </button>
      </section>

      <section className="share-bottom-buttons">
        <button type="button">인스타 스토리에 공유하기</button>
        <button type="button" onClick={handleGoRecommend}>
          노래 추천하러 가기
        </button>
      </section>
    </main>
  );
}