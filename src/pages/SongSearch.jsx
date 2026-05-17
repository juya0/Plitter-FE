import React, { useState } from 'react';

export default function SongSearch() {
    // 사용자의 검색 키워드 저장
    const [keyword, setKeyword] = useState('');
    
    // API 응답으로 받은 검색 결과 저장 : 검색 후 결과 화면에 표시하기 위함
    const [searchResults, setSearchResults] = useState([]);
    
    // 로딩 중 여부 : API 호출 시 로딩중 메세지 or 스피너 표시
    const [isLoading, setIsLoading] = useState(false);
    
    // 에러 메세지(검색 실패 시 사용자에 알림)
    const [error, setError] = useState(null);
    
    // 검색 결과 개수 제한 (기본값 10)
    const [limit, setLimit] = useState(10);

    // 입력창 값 변할 때 실행 for 입력마다 상태 업데이트
    const handleInputChange = (event) => {
        setKeyword(event.target.value);
        // 입력창 값을 keyword에 저장
    };

    // API 호출
    const searchTracks = async () => {

        // 검색어 없으면 알림 띄우고 함수 종료
        if (!keyword.trim()) {
            alert('검색어를 입력해주세요.');
            return;
        }

        // API 호출 시작 : 로딩 상태 true로 변경
        setIsLoading(true);

        // 기존 에러 메세지 삭제(새 검색 시 이전 에러 남지 않게)
        setError(null);

        try{
            // API URL 생성 (쿼리 파라미터 포함)
            const query = new URLSearchParams({
                keyword: keyword, // 검색어
                limit: limit // 개수 제한
            });

            // *** 백엔드 서버에 GET 요청 및 응답 대기 ***
            const response = await fetch(`/api/tracks/search?${query}`);

            // 백엔드 응답을 JSON 형식으로 변환
            const data = await response.json();

            // HTTP 응답 상태 코드 확인 (성공: 200~299 / 실패: 400,401,500)
            if (!response.ok){
                setError(data.message || '검색 중 오류가 발생했습니다.');
                // API에서 받은 에러 메세지 사용 or 에러 메세지 띄우기
                setSearchResults([]); // 결과 초기화(에러 전 결과 제거)
                return;
            }

            // 성공 시 API 응답의 content 배열을 상태에 저장
            setSearchResults(data.content); // track 객체들 저장(spotifyId, title, artistName등)
        } catch (err){
            // 네트워크 오류나 다른 문제 발생 시 처리
            setError('네트워크 오류가 발생했습니다.');
            setSearchResults([]);
        } finally{
            // 로딩 완료: 성공/실패 상관없이 로딩 상태를 false로 변경
            setIsLoading(false); // API 호출 완료 표시
        }
    };

    return (
        <div>
            <h1> Song Search</h1>
        </div>
    );
}