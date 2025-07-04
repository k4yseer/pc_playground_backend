export class CreateGameDto {
    game: string;
    processor: string;
    memory: string;
    graphics: string;
    directx?: string; // Optional field
    storage: string;
}
