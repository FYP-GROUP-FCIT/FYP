
import { registerDecorator, ValidationOptions, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'timeFormat', async: false })
export class TimeFormatConstraint implements ValidatorConstraintInterface {
    validate(time: string, args: ValidationArguments) {

        return /^([01]\d|2[0-3]):?([0-5]\d)$/.test(time);
    }

    defaultMessage(args: ValidationArguments) {
        return `${args.property} must be a valid time in HH:mm format`;
    }
}

export function IsTimeFormat(validationOptions?: ValidationOptions) {
    return function (object: Record<string, any>, propertyName: string) {
        registerDecorator({
            name: 'isTimeFormat',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: TimeFormatConstraint,
        });
    };
}
