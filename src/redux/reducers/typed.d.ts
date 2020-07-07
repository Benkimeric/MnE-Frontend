export interface BaseAction {
  type: string;
  data?: any;
  error?: any;
  response?: any;
}

export interface ModalStateInterface {
  shouldOpen: boolean;
  modalType: string;
}

export interface RoleInterface {
  id: number;
  roleName: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  users?: UserInterface[];
}

export interface UserInterface {
  userId: number;
  fullName: string;
  email: string;
  gender: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt: Date | null;
  roles?: RoleInterface[];
}

export interface UserStateInterface {
  currentUser: UserInterface | any;
  users: UserInterface[];
  isLoading: boolean;
  error: null | string;
}

export interface RoleStateInterface {
  roles: RoleInterface[];
  role: RoleInterface | any;
  isLoading: boolean;
  assignLoading: boolean;
  error: null | string;
}

export interface CenterInterface {
  centerId: number;
  name: string;
  code: string;
}

export interface HouseholdInterface {
  id: number;
  uniqueId: string;
  fullName: string;
  idNumber: number;
  birthDate: Date;
  mobile: string;
  occupation: string;
  centerId: number;
  setup: string;
  count: number;
  income: number;
  vulnerability: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null | Date;
  center: CenterInterface;
}

export interface HouseHoldStateInterface {
  households: HouseholdInterface[];
  isLoading: boolean;
  error: null | string;
}

export interface StoreInterface {
  user: UserStateInterface;
  userRole: RoleStateInterface;
  modal: ModalStateInterface;
  household: HouseHoldStateInterface;
}
