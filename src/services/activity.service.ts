import type { ActivityEvent } from '@/types/activity';

const EVENTS: ActivityEvent[] = [];

export function generateActivityEvent(): ActivityEvent {
  const event: ActivityEvent = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    type: 'reserved',
    seatNumber: '',
    message: '',
    createdAt: Date.now(),
  };
  return event;
}

export function generateInitialActivity(count: number): ActivityEvent[] {
  return Array.from({ length: count }, (_, i) => ({
    ...generateActivityEvent(),
    createdAt: Date.now() - (i + 1) * 15000,
  }));
}
