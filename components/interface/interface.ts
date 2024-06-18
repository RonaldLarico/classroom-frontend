import Student from '../students/Index';

export interface Group {
  studentId: number;
  groupId: number;
  group: {
    groupName: string;
    link: string;
    cycle: {
      name: string;
    };
  };
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
    name: string;
    user: string;
    role: string;
    active: boolean;
  };
}
