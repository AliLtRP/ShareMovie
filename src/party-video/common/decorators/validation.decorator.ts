import {
  ValidationOptions,
  isNotEmpty,
  isString,
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
        validate(value: any): boolean {
          return isNotEmpty(value) && isString(value);
        },
        defaultMessage() {
          return `${name} must be not empty and a string`;
        },
      },
    });
  };
}
