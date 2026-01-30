
import React, { useState } from 'react';
import { Screen, ConsultationRequest } from '../types';
import TopNav from '../components/TopNav';

interface ContactProps {
  navigateTo: (screen: Screen) => void;
  goBack: () => void;
}

const Contact: React.FC<ContactProps> = ({ navigateTo, goBack }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!name || !phone || !agreed) {
      alert('모든 정보를 입력하고 약관에 동의해주세요.');
      return;
    }

    const newRequest: ConsultationRequest = {
      id: Date.now().toString(),
      name,
      phone,
      date: new Date().toLocaleString('ko-KR'),
      isRead: false
    };

    const existingData = localStorage.getItem('consultations');
    const consultations = existingData ? JSON.parse(existingData) : [];
    consultations.unshift(newRequest);
    localStorage.setItem('consultations', JSON.stringify(consultations));
    
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white px-8 text-center animate-in fade-in duration-500">
        <div className="size-24 bg-primary rounded-full flex items-center justify-center mb-10 shadow-xl shadow-primary/20">
          <span className="material-symbols-outlined text-white text-[56px] font-bold">check</span>
        </div>
        <h2 className="text-[30px] font-black text-[#1A1A1A] mb-4 tracking-tighter">상담 신청 완료</h2>
        <p className="text-[#888888] text-[15px] font-medium leading-relaxed mb-12">
          “이 집이 맞는 분께만 안내드립니다.”<br/>
          라이프스타일 매칭을 위해 담당자가<br/>곧 연락드리겠습니다.
        </p>
        <button 
          onClick={() => navigateTo(Screen.Home)} 
          className="w-full max-w-[280px] bg-primary text-white h-20 rounded-full font-black text-[18px] shadow-xl shadow-primary/30 active:scale-95 transition-transform"
        >
          홈으로 이동
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <TopNav title="상담 요청" onBack={goBack} />
      
      {/* SECTION 07 */}
      <div className="px-6 py-10 text-center border-b border-gray-50 bg-gray-50/30">
        <span className="text-primary text-[11px] font-black tracking-[0.4em] uppercase mb-4 block opacity-60">Section 07</span>
        
        <div className="relative inline-block mb-8">
          <div className="absolute -inset-6 bg-primary/5 rounded-full blur-3xl"></div>
          <h2 className="relative text-[30px] font-black text-text-main leading-tight tracking-tighter">
            아무에게나<br/>분양하지 않습니다
          </h2>
        </div>
        
        {/* 리스트 텍스트 크기 축소 (text-[16px]) */}
        <div className="bg-white/90 backdrop-blur-sm rounded-[40px] p-8 border border-gray-100 shadow-xl shadow-black/5 space-y-4 max-w-[360px] mx-auto">
          {[
            { text: "소수 우선 상담제 운영", icon: "group" },
            { text: "라이프스타일 기준 1:1 매칭", icon: "person_search" },
            { text: "단지 컨셉에 맞는 입주자 선별", icon: "verified_user" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="size-9 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px] font-black">{item.icon}</span>
              </div>
              <p className="text-text-main text-[16px] font-black tracking-tight">{item.text}</p>
            </div>
          ))}
        </div>
        
        <p className="mt-8 text-primary font-black text-[18px] leading-tight italic">
          “이 집이 맞는 분께만<br/>안내드립니다.”
        </p>
      </div>

      <div className="px-6 py-10 flex-1">
        {/* 메인 카피 크기 축소 (text-[30px]) */}
        <h3 className="text-[30px] font-black text-text-main mb-12 leading-[1.15] text-center tracking-tighter">
          이건 집이 아닙니다<br/>
          당신의 <span className="text-primary underline underline-offset-8 decoration-primary/20">다음 10년</span>입니다
        </h3>

        <div className="space-y-6 max-w-[400px] mx-auto">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-3 px-2">
              <label className="text-[13px] font-black text-gray-400 uppercase tracking-widest">Client Name</label>
              <span className="material-symbols-outlined text-gray-200 text-[22px]">person</span>
            </div>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-20 bg-gray-50 border border-gray-100 rounded-[28px] px-8 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:bg-white transition-all font-black text-[18px]"
              placeholder="성함을 입력하세요"
            />
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-3 px-2">
              <label className="text-[13px] font-black text-gray-400 uppercase tracking-widest">Mobile Number</label>
              <span className="material-symbols-outlined text-gray-200 text-[22px]">smartphone</span>
            </div>
            <input 
              type="tel" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-20 bg-gray-50 border border-gray-100 rounded-[28px] px-8 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:bg-white transition-all font-black text-[18px] tabular-nums"
              placeholder="010-0000-0000"
            />
          </div>
          
          <div className="flex items-center gap-4 py-4 px-2">
            <div className="relative flex items-center shrink-0">
              <input 
                type="checkbox" 
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="peer size-8 opacity-0 absolute cursor-pointer z-10" 
                id="agree" 
              />
              <div className="size-8 bg-gray-100 border-2 border-gray-200 rounded-xl flex items-center justify-center peer-checked:bg-primary peer-checked:border-primary transition-all shadow-inner">
                <span className="material-symbols-outlined text-white text-[20px] font-black opacity-0 peer-checked:opacity-100">check</span>
              </div>
            </div>
            <label htmlFor="agree" className="text-[14px] font-bold text-text-sub cursor-pointer select-none">개인정보 수집 및 이용 동의 (필수)</label>
          </div>
        </div>
      </div>

      <div className="px-6 pb-14 pt-4 bg-white">
        <button 
          onClick={handleSubmit}
          className="w-full bg-primary text-white h-20 rounded-full font-black text-[18px] shadow-2xl shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
        >
          상담 요청하기
          <span className="material-symbols-outlined font-black text-[24px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">send</span>
        </button>
        <p className="text-center text-[12px] text-gray-400 mt-6 font-bold opacity-60">
          ※ 위치·가격·도면은 상담 요청자에 한해 상세 안내드립니다.
        </p>
      </div>
    </div>
  );
};

export default Contact;
