export interface StoreWineServiceProps {
    name: string;
    description: string;
    mark: string;
    price: string;
    stock: number;
}

export interface StoreWineQueryProps {
    name: string;
    description: string;
    mark: string;
    price: number;
    stock: number;
    image: string;
}

export interface WineImageServiceProps {
    image?: string;
}