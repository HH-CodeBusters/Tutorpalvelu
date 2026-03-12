export type appUser = {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  address: string;
  zipcode: string;
  city: string;
  gender: string;
  school: string;
  tutor: boolean;
  parent: boolean;
  subjects?: { subjectname: string }[];
  id: number;
};

export interface Appointment {
  id: string
  tutorId: string
  customerName: string
  start: string
  end: string
}

export interface Availability {
  tutorId: string
  start: string
  end: string
}
