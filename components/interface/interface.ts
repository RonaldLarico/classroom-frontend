
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

enum Role {
    ADMIN,
    USER,
};