export class CreateRamDto {
    ramName: string;
    ramType: string;
    capacity: string;
    speed: string;
    ramFilepath?: string | null; // Optional field for the file path of the RAM
}
