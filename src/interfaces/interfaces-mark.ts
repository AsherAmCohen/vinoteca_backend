export interface SearchMarksServiceProps {
    word?: string;
}

export interface SearchMarksQueryProps {
    word: string;
}

export interface CreateMarkServiceProps {
    name: string;
    description: string;
}

export interface CreateMarkQueryProps {
    name: string;
    description: string;
}

export interface MarksServiceProps {
    page?: number;
    rowsPerPage?: number;
}

export interface MarksQueryProps {
    skip: number;
    take: number;
}