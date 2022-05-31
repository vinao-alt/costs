import { Service } from "./Service"

export interface Project {
    id: number,
    budget: number,
    name: string,
    category: Category,
    cost: number,
    services: Service[],
    
}

export interface Category {
    id: number,
    name: string,
}
