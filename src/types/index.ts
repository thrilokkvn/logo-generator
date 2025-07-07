export interface authData {
    email: string,
    password: string,
    firstName: string,
    lastName: string
}

export interface logoDetails {
    title: string,
    description: string,
    industry: string,
    logoStyle: string,
    colorPalette: string,
    includeBrandOrText: boolean,
    includeIcons: boolean
}

export interface logoDisplayType {
    id: string,
    title: string,
    description: string,
    industry: string,
    createdAt: Date,
    logoUrl: string,
    logoStyle: string,
    includeBrandOrText: boolean,
    includeIcons: boolean,
    colorPalette: string
}

export interface userType {
    email: string,
    firstName: string,
    lastName: string,
    registeredAt: Date
}

export type ValidationErrorItem = {
  path?: string;
  message?: string;
};

export type ValidationError = {
  inner?: ValidationErrorItem[];
};

export type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
  };
};