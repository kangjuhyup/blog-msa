import { IsEthereumAddress, IsString } from "class-validator";

export class WriteDto {
    @IsEthereumAddress()
    address : string;

    @IsString()
    cids : string;
}