import { Refined } from '@lib/utils/types/Refined';

export type Url = Refined<string, 'url'>;
