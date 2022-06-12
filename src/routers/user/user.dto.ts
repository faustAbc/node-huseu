import {
  IsString,
  IsDefined,
  IsInt,
  Length,
  IsPositive,
  Matches,
  Min,
  Max,
} from 'class-validator';

class UserDto {
  @IsString()
  @IsDefined()
  @Length(4, 127)
  login!: string;

  @IsString()
  @IsDefined()
  @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/gm)
  public password!: string;

  @IsInt()
  @IsDefined()
  @IsPositive()
  @Min(4)
  @Max(100)
  public age!: string;
}

export default UserDto;
