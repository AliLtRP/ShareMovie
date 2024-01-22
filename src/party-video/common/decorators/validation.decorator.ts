import {
  IsEmpty,
  IsString,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

export function IsNotEmptyAndString(validationOption?: ValidationOptions) {
  return function (object: object, name: string) {
    registerDecorator({
      name: 'IsEmptyAndString',
      target: object.constructor,
      propertyName: name,
      options: validationOption,
      validator: {
        validate(value): boolean {
          return IsEmpty(value) && IsString(value) ? true : false;
        },
        defaultMessage() {
          return `${name} must be not empty and a string`;
        },
      },
    });
  };
}
