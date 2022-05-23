import { Servico } from "./Service"

export interface Project {
    id: number,
    budget: number,
    name: string,
    category: {
        id: number,
        name: string
    }
    cost: number,
    services: Servico[],
}
