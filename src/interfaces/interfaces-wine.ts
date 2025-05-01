export interface StoreWineServiceProps {
    name: string;
    description: string;
    mark: number;
    category: number
    price: string;
    stock: number;
}

export interface StoreWineQueryProps {
    name: string;
    description: string;
    mark: number
    category: number;
    price: number;
    stock: number;
    image: string;
}

export interface WineImageServiceProps {
    image?: string;
}

export interface WinesServiceProps {
    page?: number,
    rowsPerPage?: number,
}

export interface WinesQueryProps {
    skip: number;
    take: number;
}