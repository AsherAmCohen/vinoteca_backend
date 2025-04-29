export interface CreateCategoryServiceProps {
    name: string;
    description: string;
}

export interface CreateCategoryQueryProps {
    name: string;
    description: string;
}

export interface CategorysServiceProps {
    page?: number;
    rowsPerPage?: number;
}

export interface CategorysQueryProps {
    skip: number;
    take: number;
}