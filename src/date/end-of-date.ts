import endOf from './end-of';

export default function endOfDate(date: Date): Date {
    return endOf(date, 'day');
}
