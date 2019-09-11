import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";

const validRoles = ["Owner", "Admin", "User"]
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

@ValidatorConstraint({ name: "role", async: false })
export class IsValidRoles implements ValidatorConstraintInterface {

  validate(text: string, args: ValidationArguments) {
    return validRoles.includes(text)
  }

  defaultMessage(args: ValidationArguments) {
    return `Role '$value' should be one of the following : ${validRoles.join(', ')}`;
  }
}


@ValidatorConstraint({ name: "email", async: false })
export class IsValidEmail implements ValidatorConstraintInterface {

  validate(text: string, args: ValidationArguments) {
    return emailRegex.exec(text) !== null
  }

  defaultMessage(args: ValidationArguments) {
    return `Should be a vaild email address!`;
  }
}
