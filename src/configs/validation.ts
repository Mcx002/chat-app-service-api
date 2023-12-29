/* config-validation.ts */

import { plainToClass } from 'class-transformer';
import {
    IsAlpha,
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

    /* DATA CONFIG */
    @IsDefined()
    @IsNumberString()
    @MinLength(1)
    DB_PORT: string;

    @IsDefined()
    @IsString()
    @MinLength(1)
    DB_HOST: string;

    @IsDefined()
    @IsAlpha()
    @MinLength(1)
    DB_USERNAME: string;

    @IsDefined()
    @IsString()
    @MinLength(1)
    DB_PASSWORD: string;

    @IsDefined()
    @IsString()
    @MinLength(1)
    DB_NAME: string;

    @IsDefined()
    @IsString()
    @MinLength(1)
    ANONYMOUS_USERNAME: string;

    @IsDefined()
    @IsString()
    @MinLength(1)
    ANONYMOUS_PASSWORD: string;

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