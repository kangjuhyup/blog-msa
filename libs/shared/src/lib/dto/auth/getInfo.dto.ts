import { IsEthereumAddress, IsString } from "class-validator";

export class GetInfoDto {
    @IsEthereumAddress()
    address : string;
}