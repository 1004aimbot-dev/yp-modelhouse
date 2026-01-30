
export enum Screen {
  Home = 'home',
  Location = 'location',
  Benefits = 'benefits',
  Story = 'story',
  Types = 'types',
  VirtualTour = 'virtual-tour',
  Contact = 'contact',
  Admin = 'admin',
  ChatBot = 'chatbot',
  SalesGuide = 'sales-guide'
}

export interface HouseType {
  id: string;
  name: string;
  title: string;
  desc: string;
  size: string;
  img: string;
  floorPlanImg: string;
  tags: string[];
  icons: string[];
}

export interface Benefit {
  id: string;
  number: string;
  title: string;
  desc: string;
  img: string;
  icon: string;
}

export interface ConsultationRequest {
  id: string;
  name: string;
  phone: string;
  date: string;
  isRead?: boolean;
}
