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
    industry: string,
    createdAt: Date,
    logoUrl: string,
    logoStyle: string   
}