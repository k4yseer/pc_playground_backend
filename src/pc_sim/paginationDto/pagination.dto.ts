import { OffsetWithoutLimitNotSupportedError } from "typeorm";

export class paginationDto {
  page: number;  
  limit: number;
  search: string | null;
  offset: number | null;
}

export interface PaginatedResult<T> {
    data: T[];
    meta: {
        totalItems: number;
        itemCount: number;
        itemsPerPage: number;
        currentPage: number;   
        totalPages: number;
    };
}