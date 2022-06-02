import { Service } from "./Service"

export interface Project {
    id: number,
    budget: number,
    name: string,
    category: Category,
    cost: number,
    services: Service[],
    limitDate: Date
    
}

export interface Category {
    id: number,
    name: string,
}

export interface ProjectUpdate {
    budget: number,
    name: string,
    category: Category,
    limitDate: Date
}