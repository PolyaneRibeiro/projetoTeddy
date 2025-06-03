export interface IClients {
    id: number
    name: string
    salary: number
    companyValuation: number
    createdAt: Date
    updatedAt: Date
}

export interface IClientCreateOurEdit {
    id?: number
    name: string
    salary: string
    companyValuation: string
}

export interface IClientRemove {
    id: number
    name: string
}
