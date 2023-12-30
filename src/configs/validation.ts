/* config-validation.ts */

import { plainToClass } from 'class-transformer';
import {
    IsDefined,
    IsNumberString,
    IsString,
    MinLength,
    validateSync,
} from 'class-validator';

class EnvironmentVariables {
    @IsDefined()
    @IsNumberString()
    @MinLength(1)
    APP_PORT: string;

    @IsDefined()
    @IsString()
    @MinLength(1)
    APP_NAME: string;

    @IsDefined()
    @IsString()
    @MinLength(1)
    APP_VERSION: string;

    @IsDefined()
    @IsString()
    @MinLength(1)
    DB_URL: string;

    @IsDefined()
    @IsString()
    @MinLength(1)
    ANONYMOUS_CREDENTIAL: string;

    @IsDefined()
    @IsString()
    @MinLength(1)
    JWT_SECRET_KEY: string;
}

export function validateConfig(configuration: Record<string, unknown>) {
    const finalConfig = plainToClass(EnvironmentVariables, configuration, {
        enableImplicitConversion: true,
    });

    const errors = validateSync(finalConfig, { skipMissingProperties: false });

    let index = 0;
    for (const err of errors) {
        Object.values(err.constraints).map((str) => {
            ++index;
            console.log(index, str);
        });
        console.log('\n ***** \n');
    }
    if (errors.length)
        throw new Error('Please provide the valid ENVs mentioned above');

    return finalConfig;
}