export interface Project {
    id: number,
    budget: number,
    name: string,
    category: {
        id: number,
        name: string
    }
    cost?: number,
    services?: [],
}
