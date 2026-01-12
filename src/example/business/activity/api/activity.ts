import { Request } from '@site/src/utils';
import { ActivityInitData } from '../mock-data';

export const ActivityInitDataLoad = () => {
    return Request('/api/init', ActivityInitData);
}