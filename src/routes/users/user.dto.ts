import { IsString, Validate } from "class-validator"
import { IsValidRoles, IsValidEmail } from "./user.validation.classes"

class CreateUserDto {
  @IsString()
  public username: string

  @IsString()
  public nickname: string

  @Validate(IsValidEmail)
  public email: string

  @Validate(IsValidRoles)
  public role: string
}

export default CreateUserDto
