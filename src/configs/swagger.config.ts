import { INestApplication } from '@nestjs/common';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import * as yaml from 'js-yaml';

import * as swaggerUi from 'swagger-ui-express';

export function setupSwagger(app: INestApplication) {
    const openApiPath = resolve(process.cwd(), './docs/openapi.yaml');
    const openApiDocument = yaml.load(
        readFileSync(openApiPath, 'utf8'),
    ) as Record<string, unknown>;

    app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));
}
