
import React, { useState, useEffect } from 'react';
import { Screen, ConsultationRequest } from '../types';
import TopNav from '../components/TopNav';

interface AdminProps {
  navigateTo: (screen: Screen) => void;
  goBack: () => void;
}

const Admin: React.FC<AdminProps> = ({ navigateTo, goBack }) => {
  const [requests, setRequests] = useState<ConsultationRequest[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // 데이터 로드 및 읽음 처리
  useEffect(() => {
    if (isAuthenticated) {
      const data = localStorage.getItem('consultations');
      if (data) {
        try {
          const parsedData: ConsultationRequest[] = JSON.parse(data);
          setRequests(parsedData);

          // 모든 내역을 읽음 상태로 업데이트하여 로컬 스토리지에 저장
          const updatedData = parsedData.map(r => ({ ...r, isRead: true }));
          localStorage.setItem('consultations', JSON.stringify(updatedData));
        } catch (e) {
          console.error("데이터 파싱 오류:", e);
          setRequests([]);
        }
      }
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '0191') {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPassword('');
      setTimeout(() => setError(false), 500);
    }
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm('이 신청 내역을 삭제하시겠습니까?')) {
      setRequests(prev => {
        const updated = prev.filter(r => r.id !== id);
        localStorage.setItem('consultations', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const handleCopy = (e: React.MouseEvent, phone: string, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    navigator.clipboard.writeText(phone).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }).catch(err => {
      console.error('복사 실패:', err);
    });
  };

  const clearAll = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.confirm('주의: 모든 내역이 삭제됩니다. 계속하시겠습니까?')) {
      setRequests([]);
      localStorage.removeItem('consultations');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col bg-white min-h-screen animate-in fade-in duration-300">
        <TopNav title="관리자 인증" onBack={goBack} />
        <div className="flex-1 flex flex-col items-center justify-center px-8 pb-20">
          <div className="size-20 bg-gray-50 rounded-[30px] flex items-center justify-center mb-6 text-gray-300">
            <span className="material-symbols-outlined text-[40px]">lock</span>
          </div>
          <h2 className="text-[24px] font-black text-[#1A1A1A] tracking-tighter mb-2">Admin Login</h2>
          <p className="text-[#888888] text-[14px] text-center mb-10 leading-relaxed">
            비밀번호 4자리를 입력해주세요.
          </p>
          
          <form onSubmit={handleLogin} className={`w-full max-w-[280px] transition-transform ${error ? 'animate-bounce' : ''}`}>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••"
              maxLength={4}
              inputMode="numeric"
              autoFocus
              className="w-full text-center text-[32px] tracking-[0.5em] h-20 bg-gray-50 rounded-[24px] border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all font-black"
            />
            <button 
              type="submit"
              className="w-full mt-6 bg-primary text-white h-16 rounded-[24px] font-bold text-lg shadow-xl shadow-primary/20 active:scale-95 transition-all"
            >
              인증하기
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#F8F9FA] min-h-screen animate-in fade-in duration-300">
      <TopNav title="관리 대시보드" onBack={goBack} />
      
      <div className="p-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-[26px] font-black text-[#1A1A1A] tracking-tighter">상담 신청 현황</h3>
            <p className="text-[#888888] text-[14px] mt-1 font-medium">총 {requests.length}건 접수됨</p>
          </div>
          <button 
            onClick={clearAll}
            className="text-[12px] font-bold text-red-500 border border-red-100 bg-white px-4 py-2 rounded-xl active:scale-95 transition-all shadow-sm"
          >
            전체 삭제
          </button>
        </div>

        {requests.length === 0 ? (
          <div className="bg-white rounded-[40px] p-20 flex flex-col items-center justify-center border border-gray-100 shadow-sm text-center">
            <span className="material-symbols-outlined text-gray-200 text-5xl mb-4">inbox</span>
            <p className="text-gray-400 font-bold">내역이 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <div 
                key={request.id} 
                className={`bg-white rounded-[32px] p-6 border shadow-sm flex items-center justify-between transition-all ${request.isRead ? 'border-gray-100' : 'border-primary/20 bg-primary/5'}`}
              >
                <div className="flex-1 flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[19px] font-black text-[#1A1A1A]">{request.name}</span>
                    {!request.isRead && (
                      <span className="text-[9px] bg-primary text-white px-1.5 py-0.5 rounded font-black uppercase animate-pulse">New Request</span>
                    )}
                  </div>
                  
                  <div 
                    onClick={(e) => handleCopy(e, request.phone, request.id)}
                    className="flex items-center gap-2 text-[#555555] font-bold text-[16px] cursor-pointer group w-fit py-1"
                    title="클릭하여 번호 복사"
                  >
                    <span className="tabular-nums">{request.phone}</span>
                    <span className={`material-symbols-outlined text-[16px] transition-colors ${copiedId === request.id ? 'text-primary' : 'text-gray-300 group-hover:text-primary'}`}>
                      {copiedId === request.id ? 'check' : 'content_copy'}
                    </span>
                  </div>
                  
                  <p className="text-[#BBBBBB] text-[11px] font-medium">
                    {request.date}
                  </p>
                </div>
                
                <button 
                  onClick={(e) => handleDelete(e, request.id)}
                  className="size-14 rounded-2xl flex items-center justify-center bg-gray-50 text-gray-300 hover:text-red-500 hover:bg-red-50 active:scale-90 transition-all shadow-sm group border border-transparent hover:border-red-100"
                  aria-label="내역 삭제"
                >
                  <span className="material-symbols-outlined text-[26px] pointer-events-none group-hover:scale-110 transition-transform">delete</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-auto p-12 opacity-30 text-center">
        <p className="text-[9px] font-black tracking-[0.5em] text-gray-400 uppercase">
          SECURE ADMIN CONSOLE
        </p>
      </div>
    </div>
  );
};

export default Admin;
