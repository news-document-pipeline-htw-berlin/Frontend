import { wording } from '../components/common/common';

export const WEEKDAY = () => {
    const m = new Map();
    m.Monday = wording.weekday.monday;
    m.Tuesday = wording.weekday.tuesday;
    m.Wednesday = wording.weekday.wednesday;
    m.Thursday = wording.weekday.thursday;
    m.Friday = wording.weekday.friday;
    m.Saturday = wording.weekday.saturday;
    m.Sunday = wording.weekday.sunday;
    return m;
};
