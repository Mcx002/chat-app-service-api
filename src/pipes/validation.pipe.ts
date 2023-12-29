import { ArgumentMetadata, BadRequestException, HttpStatus, Injectable, PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        // check metatype
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }

        // convert value to metatype instance
        const object = plainToInstance(metatype, value);

        // validate object
        const errors = await validate(object);
        if (errors.length > 0) {
            // prepare errors map
            const errorsMap: { [key: string]: string[] } = {}
            errors.map((error) => {
                errorsMap[error.property] = []
                for (let x in error.constraints) {
                    errorsMap[error.property].push(error.constraints[x])
                }
            })

            // throw bad request error
            throw new BadRequestException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Bad Request',
                errors: errorsMap
            });
        }

        return value;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}