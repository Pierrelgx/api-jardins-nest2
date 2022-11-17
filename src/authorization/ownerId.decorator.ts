import { SetMetadata } from '@nestjs/common';

export const OwnerId = (ownerId: boolean) => SetMetadata('ownerId', ownerId);
