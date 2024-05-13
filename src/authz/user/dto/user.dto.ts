import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class UserDto {
  @IsString()
  @IsNotEmpty()
  public sub: string

  // Validates for an integer
  @IsNumber()
  public iat: number
}
