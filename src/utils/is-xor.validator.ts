import {
    ValidationArguments,
    ValidationOptions,
    registerDecorator,
} from 'class-validator';

export function IsXor(
    property1: string,
    property2: string,
    validationOptions?: ValidationOptions,
) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            name: 'isXor',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property1, property2],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const [prop1, prop2] = args.constraints as string[];
                    const hasProp1 =
                        args.object?.[prop1] !== undefined &&
                        args.object?.[prop1] !== null;
                    const hasProp2 =
                        args.object?.[prop2] !== undefined &&
                        args.object?.[prop2] !== null;
                    return (!hasProp1 && hasProp2) || (hasProp1 && !hasProp2);
                },
                defaultMessage(args: ValidationArguments) {
                    const [prop1, prop2] = args.constraints as string[];
                    return `Either ${prop1} or ${prop2} must be provided, but not both`;
                },
            },
        });
    };
}
