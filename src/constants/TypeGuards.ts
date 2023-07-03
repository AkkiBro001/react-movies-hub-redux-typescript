export interface DataFromAPI {
    url: string,
    params?: unknown
}

export interface ConfigurationAPI {
    base_url: string,
    secure_base_url: string,
    backdrop_sizes: string[],
    poster_sizes: string[],
    profile_sizes: string[],
    still_sizes: string[],
    logo_sizes: string[],
}

export interface DetailsAPI{
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[];
    id: number,
    original_language: string,
    original_title: string
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    name?: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}

export interface ListsAPI {
    dates?: object,
    page: number,
    results: DetailsAPI[],
    total_pages: number,
    total_results: number,
}

export interface CardSize{
    parentSize: number,
    cardWidth: number,
    cardHeight: number,
}

export interface Genres{
    id: number,
    name: string
}

export interface SelectOption{
    value: string,
    label: string
}