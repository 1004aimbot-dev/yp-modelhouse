
import { HouseType, Benefit } from './types';

// Type A: 12평 (4x8m) - 가시성 극대화 버전
const FLOOR_PLAN_A = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1150">
  <rect width="800" height="1150" fill="white"/>
  <!-- 외벽 - 두께 대폭 강화 -->
  <rect x="200" y="150" width="400" height="800" fill="none" stroke="%23000" stroke-width="10"/>
  
  <!-- 내부 구획 -->
  <line x1="200" y1="350" x2="600" y2="350" stroke="%23333" stroke-width="4"/>
  <rect x="500" y="150" width="100" height="150" fill="%23F8F8F8" stroke="%23333" stroke-width="3"/>
  
  <!-- 메인 타이틀 -->
  <text x="400" y="80" text-anchor="middle" font-family="Pretendard" font-weight="900" font-size="36" fill="%23139E8C">TYPE A · STUDIO</text>
  
  <!-- 내부 공간 라벨 - 폰트 크기 및 굵기 강화 -->
  <text x="400" y="650" text-anchor="middle" font-family="Pretendard" font-weight="900" font-size="32" fill="%23000">LIVING / DINING</text>
  <text x="400" y="280" text-anchor="middle" font-family="Pretendard" font-weight="900" font-size="22" fill="%23333">KITCHEN</text>
  <text x="550" y="235" text-anchor="middle" font-family="Pretendard" font-weight="900" font-size="18" fill="%23333">BATH</text>
  <text x="260" y="250" text-anchor="middle" font-family="Pretendard" font-weight="900" font-size="18" fill="%23333">ENT.</text>
  
  <!-- 복층 표시 -->
  <rect x="220" y="450" width="360" height="300" fill="%23139E8C" fill-opacity="0.08" stroke="%23139E8C" stroke-width="3" stroke-dasharray="12,6"/>
  <text x="400" y="610" text-anchor="middle" font-family="Pretendard" font-weight="900" font-size="20" fill="%23139E8C">LOFT (UPPER FLOOR)</text>

  <!-- 치수선 - 세로 (강화된 스타일) -->
  <line x1="100" y1="150" x2="100" y2="950" stroke="%23000" stroke-width="3"/>
  <line x1="80" y1="150" x2="120" y2="150" stroke="%23000" stroke-width="3"/>
  <line x1="80" y1="950" x2="120" y2="950" stroke="%23000" stroke-width="3"/>
  <text x="60" y="550" text-anchor="middle" font-family="Pretendard" font-weight="900" font-size="28" fill="%23000" transform="rotate(-90, 60, 550)">8.0 m</text>
  
  <!-- 치수선 - 가로 (강화된 스타일) -->
  <line x1="200" y1="1050" x2="600" y2="1050" stroke="%23000" stroke-width="3"/>
  <line x1="200" y1="1030" x2="200" y2="1070" stroke="%23000" stroke-width="3"/>
  <line x1="600" y1="1030" x2="600" y2="1070" stroke="%23000" stroke-width="3"/>
  <text x="400" y="1110" text-anchor="middle" font-family="Pretendard" font-weight="900" font-size="28" fill="%23000">4.0 m</text>
</svg>`;

// Type B: 15평 (4.5x11m)
const FLOOR_PLAN_B = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1380">
  <rect width="800" height="1380" fill="white"/>
  <rect x="200" y="100" width="400" height="1050" fill="none" stroke="%23000" stroke-width="10"/>
  
  <line x1="200" y1="750" x2="600" y2="750" stroke="%23000" stroke-width="5"/>
  <rect x="500" y="100" width="100" height="200" fill="%23F8F8F8" stroke="%23333" stroke-width="3"/>
  
  <text x="400" y="60" text-anchor="middle" font-family="Pretendard" font-weight="900" font-size="36" fill="%23139E8C">TYPE B · 1.5 ROOM</text>
  <text x="400" y="980" text-anchor="middle" font-family="Pretendard" font-weight="900" font-size="34" fill="%23000">BEDROOM</text>
  <text x="400" y="500" text-anchor="middle" font-family="Pretendard" font-weight="900" font-size="34" fill="%23000">LIVING / KITCHEN</text>
  <text x="550" y="210" text-anchor="middle" font-family="Pretendard" font-weight="900" font-size="20" fill="%23333">BATH</text>
  
  <line x1="80" y1="100" x2="80" y2="1150" stroke="%23000" stroke-width="3"/>
  <line x1="60" y1="100" x2="100" y2="100" stroke="%23000" stroke-width="3"/>
  <line x1="60" y1="1150" x2="100" y2="1150" stroke="%23000" stroke-width="3"/>
  <text x="45" y="625" text-anchor="middle" font-family="Pretendard" font-weight="900" font-size="30" fill="%23000" transform="rotate(-90, 45, 625)">11.0 m</text>
  
  <line x1="200" y1="1240" x2="600" y2="1240" stroke="%23000" stroke-width="3"/>
  <line x1="200" y1="1220" x2="200" y2="1260" stroke="%23000" stroke-width="3"/>
  <line x1="600" y1="1220" x2="600" y2="1260" stroke="%23000" stroke-width="3"/>
  <text x="400" y="1300" text-anchor="middle" font-family="Pretendard" font-weight="900" font-size="30" fill="%23000">4.5 m</text>
</svg>`;

// Type C: 18평 (5x12m)
const FLOOR_PLAN_C = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1550">
  <rect width="800" height="1550" fill="white"/>
  <rect x="200" y="100" width="400" height="1000" fill="none" stroke="%23000" stroke-width="10"/>
  <rect x="200" y="1100" width="400" height="250" fill="%23E8F5F3" stroke="%23139E8C" stroke-width="4" stroke-dasharray="10,5"/>
  
  <text x="400" y="60" text-anchor="middle" font-family="Pretendard" font-weight="900" font-size="36" fill="%23139E8C">TYPE C · TERRACE LOFT</text>
  <text x="400" y="600" text-anchor="middle" font-family="Pretendard" font-weight="900" font-size="38" fill="%23000">GRAND LOUNGE</text>
  <text x="400" y="1235" text-anchor="middle" font-family="Pretendard" font-weight="900" font-size="28" fill="%23139E8C">PRIVATE TERRACE</text>
  
  <line x1="80" y1="100" x2="80" y2="1100" stroke="%23000" stroke-width="3"/>
  <line x1="60" y1="100" x2="100" y2="100" stroke="%23000" stroke-width="3"/>
  <line x1="60" y1="1100" x2="100" y2="1100" stroke="%23000" stroke-width="3"/>
  <text x="45" y="600" text-anchor="middle" font-family="Pretendard" font-weight="900" font-size="30" fill="%23000" transform="rotate(-90, 45, 600)">12.0 m</text>
  
  <line x1="200" y1="1440" x2="600" y2="1440" stroke="%23000" stroke-width="3"/>
  <line x1="200" y1="1420" x2="200" y2="1460" stroke="%23000" stroke-width="3"/>
  <line x1="600" y1="1420" x2="600" y2="1460" stroke="%23000" stroke-width="3"/>
  <text x="400" y="1510" text-anchor="middle" font-family="Pretendard" font-weight="900" font-size="32" fill="%23000">5.0 m</text>
</svg>`;

// Type D: 20평 (11x6m)
const FLOOR_PLAN_D = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1250 850">
  <rect width="1250" height="850" fill="white"/>
  <rect x="100" y="150" width="1000" height="500" fill="none" stroke="%23000" stroke-width="12"/>
  
  <line x1="400" y1="150" x2="400" y2="650" stroke="%23000" stroke-width="6"/>
  <line x1="800" y1="150" x2="800" y2="650" stroke="%23000" stroke-width="6"/>
  
  <text x="600" y="100" text-anchor="middle" font-family="Pretendard" font-weight="900" font-size="42" fill="%23139E8C">TYPE D · FAMILY HOUSE</text>
  <text x="250" y="410" text-anchor="middle" font-family="Pretendard" font-weight="900" font-size="28" fill="%23333">ROOM 1</text>
  <text x="600" y="410" text-anchor="middle" font-family="Pretendard" font-weight="900" font-size="38" fill="%23000">LIVING / KITCHEN</text>
  <text x="950" y="410" text-anchor="middle" font-family="Pretendard" font-weight="900" font-size="28" fill="%23333">ROOM 2</text>
  
  <line x1="100" y1="740" x2="1100" y2="740" stroke="%23000" stroke-width="4"/>
  <line x1="100" y1="720" x2="100" y2="760" stroke="%23000" stroke-width="4"/>
  <line x1="1100" y1="720" x2="1100" y2="760" stroke="%23000" stroke-width="4"/>
  <text x="600" y="800" text-anchor="middle" font-family="Pretendard" font-weight="900" font-size="34" fill="%23000">11.0 m</text>
  
  <line x1="1160" y1="150" x2="1160" y2="650" stroke="%23000" stroke-width="4"/>
  <line x1="1140" y1="150" x2="1180" y2="150" stroke="%23000" stroke-width="4"/>
  <line x1="1140" y1="650" x2="1180" y2="650" stroke="%23000" stroke-width="4"/>
  <text x="1210" y="400" text-anchor="middle" font-family="Pretendard" font-weight="900" font-size="34" fill="%23000" transform="rotate(90, 1210, 400)">6.0 m</text>
</svg>`;

export const HOUSE_TYPES: HouseType[] = [
  {
    id: 'A',
    name: '어반 미니멀 스튜디오',
    title: '1인 가구 및 주말 별장 특화',
    desc: '4x8m의 효율적인 장방형 구조에 복층 설계를 더했습니다. 1층의 높은 층고가 주는 개방감과 2층 아늑한 침실이 완벽한 조화를 이루는 미니멀 스튜디오입니다.',
    size: '12평 (39.6㎡)',
    img: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=1000',
    floorPlanImg: FLOOR_PLAN_A,
    tags: ['bed', 'bathtub'],
    icons: ['floor_lamp', 'deck']
  },
  {
    id: 'B',
    name: '프리미엄 듀오 스위트',
    title: '신혼부부 및 소규모 가구 추천',
    desc: '실제 폭 4.5m의 정갈한 거실과 독립 침실로 구성된 15평형입니다. 소형 평수임에도 거실과 침실을 완벽히 분리해 일상의 품격을 높였습니다.',
    size: '15평 (49.5㎡)',
    img: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=1000',
    floorPlanImg: FLOOR_PLAN_B,
    tags: ['bed', 'work'],
    icons: ['kitchen', 'local_parking']
  },
  {
    id: 'C',
    name: '시그니처 테라스 로프트',
    title: '복층 설계 및 개인 정원 특화',
    desc: '18평의 여유를 담은 복층형 구조입니다. 전용 광폭 테라스를 통해 자연과 소통하며, 높은 층고의 개방형 거실이 일상의 낭만을 더해줍니다.',
    size: '18평 (59.4㎡)',
    img: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=1000',
    floorPlanImg: FLOOR_PLAN_C,
    tags: ['bed', 'yard'],
    icons: ['height', 'nature']
  },
  {
    id: 'D',
    name: '그랜드 패밀리 하우스',
    title: '3~4인 가구를 위한 최적 설계',
    desc: '20평형의 컴팩트한 평면 안에 3개의 방을 알차게 배치한 3-Bay 구조입니다. 군더더기 없는 동선과 수납 시스템으로 공간 활용을 극대화했습니다.',
    size: '20평 (66.1㎡)',
    img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1000',
    floorPlanImg: FLOOR_PLAN_D,
    tags: ['family_restroom', 'meeting_room'],
    icons: ['solar_power', 'garage']
  }
];

export const BENEFITS: Benefit[] = [
  {
    id: '01',
    number: 'BENEFIT 01',
    title: '시스템 에어컨 무상 설치',
    desc: '공간의 미학을 해치지 않는 매립형 가전 제공',
    img: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=1200&auto=format&fit=crop',
    icon: 'ac_unit'
  },
  {
    id: '02',
    number: 'BENEFIT 02',
    title: '프라이빗 조경 서비스',
    desc: '단정하게 관리되는 나만의 작은 숲',
    img: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=600',
    icon: 'park'
  },
  {
    id: '03',
    number: 'BENEFIT 03',
    title: '스마트 홈 패키지',
    desc: '심플한 디자인의 월패드와 모바일 제어',
    img: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1200&auto=format&fit=crop',
    icon: 'nest_multi_room'
  },
  {
    id: '04',
    number: 'BENEFIT 04',
    title: '취득세 지원 혜택',
    desc: '입주 고객의 부담을 덜어드리는 특별 환급',
    img: 'https://images.unsplash.com/photo-1454165833767-0274b04bc929?auto=format&fit=crop&q=80&w=600',
    icon: 'payments'
  }
];
