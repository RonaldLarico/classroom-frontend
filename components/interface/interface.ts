import Student from '../student/Index';
import Password from '../../assets/icon/Password';

export interface Group {
  studentId: number;
  groupId: number;
  group: {
    groupName: string;
    date: string;
    link: string;
    cycle: {
      name: string;
    };
  };
  secretKey: Buffer;
  iv: Buffer;
}

export interface StudentData {
  id: number;
  user: string;
  name: string;
  role: Role;
  active: boolean;
  groups: Group[];
};

export enum Role {
  ADMIN,
  USER,
};

export interface CycleData {
  id: number;
  name: string;
}

export interface GroupData {
  id: number;
  groupName: string;
  date: string;
  link: string;
  cycle: {
    name: string;
  };
  students: Student[];
};

export interface Student {
  studentId: number;
  groupId: number;
  student: {
    id: number;
    name: string;
    user: string;
    role: string;
    active: boolean;
  };
  isChecked: boolean;
}

export interface Admin {
  user: string;
  password: string;
  name: string;
  role: Role;
};
