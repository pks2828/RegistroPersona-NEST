import { IsEmail, IsNotEmpty, IsNumberString, IsString, IsStrongPassword, MinLength } from "class-validator";


export class CreateUserDto{

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    readonly name: string;

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    @IsNumberString()
    readonly age: number;

    @IsNotEmpty()
    @IsStrongPassword()
    readonly password: string;




}