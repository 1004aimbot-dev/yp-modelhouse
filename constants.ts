
import { HouseType, Benefit } from './types';

// Helper for architectural dimension ticks
const dimTick = (x: number, y: number, isVertical: boolean) => {
  const size = 15;
  if (isVertical) {
    return `<line x1="${x - size}" y1="${y + size}" x2="${x + size}" y2="${y - size}" stroke="#999" stroke-width="1.5"/>`;
  }
  return `<line x1="${x - size}" y1="${y - size}" x2="${x + size}" y2="${y + size}" stroke="#999" stroke-width="1.5"/>`;
};

// 4x8m 복층 평면도 SVG (Type A)
const FLOOR_PLAN_A = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000">
  <rect width="800" height="1000" fill="white"/>
  <rect x="200" y="100" width="400" height="800" fill="none" stroke="%23139E8C" stroke-width="4"/>
  <text x="400" y="70" text-anchor="middle" font-family="Pretendard" font-weight="bold" font-size="24" fill="%23139E8C">1ST FLOOR (Living &amp; Kitchen)</text>
  <line x1="200" y1="300" x2="600" y2="300" stroke="%23EEEEEE" stroke-width="2"/>
  <rect x="200" y="100" width="100" height="120" fill="%23F8F9FA"/>
  <text x="250" y="165" text-anchor="middle" font-size="12" fill="%23999999">ENTRANCE</text>
  <rect x="500" y="100" width="100" height="150" fill="%23F1F1F1"/>
  <text x="550" y="180" text-anchor="middle" font-size="12" fill="%23999999">BATH</text>
  <path d="M 500 300 L 600 300 L 600 500 L 550 500 L 550 300" fill="%23E8F5F3" stroke="%23139E8C" stroke-width="1"/>
  <text x="575" y="400" text-anchor="middle" font-size="10" fill="%23139E8C" transform="rotate(90, 575, 400)">STAIRS UP</text>
  <text x="400" y="600" text-anchor="middle" font-weight="bold" font-size="20" fill="%23333333">LIVING ROOM</text>
  
  <!-- Dimension Lines Vertical -->
  <line x1="140" y1="100" x2="140" y2="900" stroke="%23999" stroke-width="1"/>
  <line x1="130" y1="100" x2="200" y2="100" stroke="%23999" stroke-width="0.5"/>
  <line x1="130" y1="900" x2="200" y2="900" stroke="%23999" stroke-width="0.5"/>
  <line x1="130" y1="110" x2="150" y2="90" stroke="%23999" stroke-width="1.5"/>
  <line x1="130" y1="910" x2="150" y2="890" stroke="%23999" stroke-width="1.5"/>
  <text x="110" y="500" text-anchor="middle" font-size="18" fill="%23999" transform="rotate(-90, 110, 500)" font-weight="bold">8.0m</text>
  
  <!-- Dimension Lines Horizontal -->
  <line x1="200" y1="950" x2="600" y2="950" stroke="%23999" stroke-width="1"/>
  <line x1="200" y1="900" x2="200" y2="960" stroke="%23999" stroke-width="0.5"/>
  <line x1="600" y1="900" x2="600" y2="960" stroke="%23999" stroke-width="0.5"/>
  <line x1="190" y1="940" x2="210" y2="960" stroke="%23999" stroke-width="1.5"/>
  <line x1="590" y1="940" x2="610" y2="960" stroke="%23999" stroke-width="1.5"/>
  <text x="400" y="985" text-anchor="middle" font-size="18" fill="%23999" font-weight="bold">4.0m</text>

  <rect x="250" y="350" width="200" height="250" fill="%23139E8C" fill-opacity="0.05" stroke="%23139E8C" stroke-dasharray="4"/>
  <text x="350" y="480" text-anchor="middle" font-weight="bold" font-size="16" fill="%23139E8C">2ND FLOOR (LOFT)</text>
</svg>`;

// Type B: 1.5룸 분리형 평면도 (15평)
const FLOOR_PLAN_B = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1200">
  <rect width="800" height="1200" fill="white"/>
  <rect x="175" y="100" width="450" height="1000" fill="none" stroke="%23139E8C" stroke-width="4"/>
  <text x="400" y="70" text-anchor="middle" font-family="Pretendard" font-weight="bold" font-size="24" fill="%23139E8C">TYPE B · 1.5 ROOM SUITE</text>
  
  <rect x="175" y="100" width="120" height="150" fill="%23F8F9FA"/>
  <text x="235" y="180" text-anchor="middle" font-size="12" fill="%23999999">ENTRANCE</text>
  
  <rect x="530" y="100" width="95" height="200" fill="%23F1F1F1"/>
  <text x="577" y="200" text-anchor="middle" font-size="12" fill="%23999999">BATH</text>

  <rect x="175" y="400" width="450" height="350" fill="%23FAFAFA"/>
  <text x="400" y="580" text-anchor="middle" font-weight="bold" font-size="20" fill="%23333333">LIVING &amp; KITCHEN</text>

  <line x1="175" y1="750" x2="625" y2="750" stroke="%23139E8C" stroke-width="2" stroke-dasharray="8"/>
  <text x="400" y="930" text-anchor="middle" font-weight="bold" font-size="20" fill="%23333333">PRIVATE BEDROOM</text>
  
  <!-- Dimension Lines Vertical -->
  <line x1="120" y1="100" x2="120" y2="1100" stroke="%23999" stroke-width="1"/>
  <line x1="110" y1="100" x2="175" y2="100" stroke="%23999" stroke-width="0.5"/>
  <line x1="110" y1="1100" x2="175" y2="1100" stroke="%23999" stroke-width="0.5"/>
  <line x1="110" y1="110" x2="130" y2="90" stroke="%23999" stroke-width="1.5"/>
  <line x1="110" y1="1110" x2="130" y2="1090" stroke="%23999" stroke-width="1.5"/>
  <text x="90" y="600" text-anchor="middle" font-size="18" fill="%23999" transform="rotate(-90, 90, 600)" font-weight="bold">11.0m</text>
  
  <!-- Dimension Lines Horizontal -->
  <line x1="175" y1="1150" x2="625" y2="1150" stroke="%23999" stroke-width="1"/>
  <line x1="175" y1="1100" x2="175" y2="1160" stroke="%23999" stroke-width="0.5"/>
  <line x1="625" y1="1100" x2="625" y2="1160" stroke="%23999" stroke-width="0.5"/>
  <line x1="165" y1="1140" x2="185" y2="1160" stroke="%23999" stroke-width="1.5"/>
  <line x1="615" y1="1140" x2="635" y2="1160" stroke="%23999" stroke-width="1.5"/>
  <text x="400" y="1185" text-anchor="middle" font-size="18" fill="%23999" font-weight="bold">4.5m</text>
</svg>`;

// Type C: 테라스 & 복층 로프트 평면도 (18평)
const FLOOR_PLAN_C = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1300">
  <rect width="800" height="1300" fill="white"/>
  <rect x="150" y="100" width="500" height="900" fill="none" stroke="%23139E8C" stroke-width="4"/>
  <rect x="150" y="1000" width="500" height="200" fill="%23E8F5F3" stroke="%23139E8C" stroke-width="2"/>
  <text x="400" y="1110" text-anchor="middle" font-weight="bold" font-size="20" fill="%23139E8C">PRIVATE TERRACE</text>
  
  <rect x="150" y="100" width="150" height="150" fill="%23F8F9FA"/>
  <text x="225" y="180" text-anchor="middle" font-size="12" fill="%23999999">ENTRANCE</text>

  <text x="400" y="600" text-anchor="middle" font-weight="bold" font-size="24" fill="%23333333">GRAND LOUNGE</text>
  <rect x="250" y="300" width="300" height="400" fill="%23139E8C" fill-opacity="0.05" stroke="%23139E8C" stroke-dasharray="5"/>
  <text x="400" y="500" text-anchor="middle" font-weight="bold" font-size="18" fill="%23139E8C">LOFT AREA (2F)</text>

  <!-- Total Vertical Dimension -->
  <line x1="80" y1="100" x2="80" y2="1200" stroke="%23999" stroke-width="1"/>
  <line x1="70" y1="100" x2="150" y2="100" stroke="%23999" stroke-width="0.5"/>
  <line x1="70" y1="1200" x2="150" y2="1200" stroke="%23999" stroke-width="0.5"/>
  <line x1="70" y1="110" x2="90" y2="90" stroke="%23999" stroke-width="1.5"/>
  <line x1="70" y1="1210" x2="90" y2="1190" stroke="%23999" stroke-width="1.5"/>
  <text x="50" y="650" text-anchor="middle" font-size="18" fill="%23999" transform="rotate(-90, 50, 650)" font-weight="bold">12.0m</text>
  
  <!-- Terrace Vertical Segment -->
  <line x1="110" y1="1000" x2="110" y2="1200" stroke="%23999" stroke-width="1" stroke-dasharray="2"/>
  <line x1="100" y1="1010" x2="120" y2="990" stroke="%23999" stroke-width="1.5"/>
  <line x1="100" y1="1210" x2="120" y2="1190" stroke="%23999" stroke-width="1.5"/>
  <text x="95" y="1100" text-anchor="middle" font-size="14" fill="%23999" transform="rotate(-90, 95, 1100)">2.0m (Terrace)</text>

  <!-- Dimension Lines Horizontal -->
  <line x1="150" y1="1250" x2="650" y2="1250" stroke="%23999" stroke-width="1"/>
  <line x1="150" y1="1200" x2="150" y2="1260" stroke="%23999" stroke-width="0.5"/>
  <line x1="650" y1="1200" x2="650" y2="1260" stroke="%23999" stroke-width="0.5"/>
  <line x1="140" y1="1240" x2="160" y2="1260" stroke="%23999" stroke-width="1.5"/>
  <line x1="640" y1="1240" x2="660" y2="1260" stroke="%23999" stroke-width="1.5"/>
  <text x="400" y="1285" text-anchor="middle" font-size="18" fill="%23999" font-weight="bold">5.0m</text>
</svg>`;

// Type D: 3베이 3룸 패밀리 하우스 (20평)
const FLOOR_PLAN_D = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 800">
  <rect width="1000" height="800" fill="white"/>
  <rect x="100" y="150" width="800" height="500" fill="none" stroke="%23139E8C" stroke-width="4"/>
  
  <rect x="100" y="150" width="220" height="300" fill="%23FAFAFA"/>
  <text x="210" y="310" text-anchor="middle" font-weight="bold" font-size="16" fill="%23666666">ROOM 1</text>
  
  <rect x="320" y="150" width="360" height="500" fill="%23F8F9FA"/>
  <text x="500" y="410" text-anchor="middle" font-weight="bold" font-size="20" fill="%23333333">LIVING &amp; KITCHEN</text>
  
  <rect x="680" y="150" width="220" height="300" fill="%23FAFAFA"/>
  <text x="790" y="310" text-anchor="middle" font-weight="bold" font-size="16" fill="%23666666">ROOM 2</text>

  <rect x="680" y="450" width="220" height="200" fill="%23F1F1F1"/>
  <text x="790" y="560" text-anchor="middle" font-weight="bold" font-size="16" fill="%23666666">MASTER</text>

  <!-- Dimension Lines Horizontal -->
  <line x1="100" y1="700" x2="900" y2="700" stroke="%23999" stroke-width="1"/>
  <line x1="100" y1="650" x2="100" y2="710" stroke="%23999" stroke-width="0.5"/>
  <line x1="900" y1="650" x2="900" y2="710" stroke="%23999" stroke-width="0.5"/>
  <line x1="90" y1="690" x2="110" y2="710" stroke="%23999" stroke-width="1.5"/>
  <line x1="890" y1="690" x2="910" y2="710" stroke="%23999" stroke-width="1.5"/>
  <text x="500" y="735" text-anchor="middle" font-size="18" fill="%23999" font-weight="bold">11.0m</text>
  
  <!-- Dimension Lines Vertical -->
  <line x1="940" y1="150" x2="940" y2="650" stroke="%23999" stroke-width="1"/>
  <line x1="900" y1="150" x2="950" y2="150" stroke="%23999" stroke-width="0.5"/>
  <line x1="900" y1="650" x2="950" y2="650" stroke="%23999" stroke-width="0.5"/>
  <line x1="930" y1="160" x2="950" y2="140" stroke="%23999" stroke-width="1.5"/>
  <line x1="930" y1="660" x2="950" y2="640" stroke="%23999" stroke-width="1.5"/>
  <text x="975" y="400" text-anchor="middle" font-size="18" fill="%23999" transform="rotate(90, 975, 400)" font-weight="bold">6.0m</text>
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
    img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=400',
    icon: 'ac_unit'
  },
  {
    id: '02',
    number: 'BENEFIT 02',
    title: '프라이빗 조경 서비스',
    desc: '단정하게 관리되는 나만의 작은 숲',
    img: 'https://images.unsplash.com/photo-1558905730-674b43731417?auto=format&fit=crop&q=80&w=400',
    icon: 'park'
  },
  {
    id: '03',
    number: 'BENEFIT 03',
    title: '스마트 홈 패키지',
    desc: '심플한 디자인의 월패드와 모바일 제어',
    img: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=400',
    icon: 'nest_multi_room'
  },
  {
    id: '04',
    number: 'BENEFIT 04',
    title: '취득세 지원 혜택',
    desc: '입주 고객의 부담을 덜어드리는 특별 환급',
    img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=400',
    icon: 'payments'
  }
];
