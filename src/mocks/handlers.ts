import { http, HttpResponse } from 'msw';

import { hspace } from './browser.ts';

const rooms = [
  {
    id: '1',
    name: 'RED ROOM',
  },
  {
    id: '2',
    name: 'BLUE ROOM',
  },
  {
    id: '3',
    name: 'GREEN ROOM',
  },
  {
    id: '4',
    name: 'PURPLE ROOM',
  },
  {
    id: '5',
    name: 'WHITE ROOM',
  },
];

const ReservationStatus = {
  REQUESTED: 0, // 예약 대기
  APPROVED: 1, // 예약 승인
  REJECTED: 2, // 승인 반려
  CANCELED: 3, // 예약 취소
  USED: 4, // 사용 완료
};

type Reservation = {
  id: string;
  applicantId: string;
  participantIds: string[];
  startDate: string;
  endDate: string;
  roomId: string;
  purpose: string;
  content: string;
  status: (typeof ReservationStatus)[keyof typeof ReservationStatus];
};

const reservations: Reservation[] = [];

export const handlers = [
  http.get(hspace('/me'), () => {
    return HttpResponse.json({
      id: crypto.randomUUID(),
      nickname: 'Nickname123',
      email: 'Email@gmail.com',
    });
  }),
  http.get(hspace('/rooms'), () => {
    return HttpResponse.json(rooms);
  }),
  http.get(hspace('/reservations'), () => {
    return HttpResponse.json(reservations);
  }),
  http.post(hspace('/reservations'), async ({ request }) => {
    try {
      const requestBody = await request.json();

      const { applicantId, startDate, endDate, roomId } = requestBody as Omit<Reservation, 'id'>;

      const id = crypto.randomUUID();

      const newReservation: Reservation = {
        id,
        applicantId,
        startDate,
        endDate,
        roomId,
        content: '',
        participantIds: [applicantId],
        purpose: '',
        status: ReservationStatus.REQUESTED,
      };
      reservations.push(newReservation);

      return HttpResponse.json(newReservation);
    } catch (e) {
      return HttpResponse.error();
    }
  }),
  http.delete(hspace('/reservations/:id'), () => {
    return new HttpResponse('SUCCESS', { status: 200 });
  }),
];
