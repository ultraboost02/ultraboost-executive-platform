export type User = {
  id: string | number;
  civility: string;
  first_name: string;
  last_name: string;
  email: string;
  function_title: string;
  level: string;
  hub_level: string;
  membership_type: string;
  is_verified: boolean;
  years_of_experience: number;
  linkedin_url: string;
  status: string;
  role: string;
};

export type Bootcamp = {
  id: string | number;
  title: string;
  level: string;
  category: string;
  description: string;
  objectives: string[];
  formats: string[];
  schedules: string[];
  price_1x: number;
  price_2x: number;
  price_3x: number;
  certification_name: string;
  image: string;
  is_active: boolean;
};

export type Event = {
  id: string | number;
  title: string;
  type: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  description: string;
  speakers: string[];
  partners: string[];
  image: string;
};

export type Admission = {
  id: string | number;
  type: string;
  status: string;
  eligibility_check: boolean;
};

export type Payment = {
  id: string | number;
  amount: number;
  currency: string;
  status: string;
  installment_number: number;
  total_installments: number;
  next_installment_date: string;
};

export type HubSubscription = {
  id: string | number;
  hub_level: string;
  payment_type: string;
  status: string;
  commission_rate: number;
};
