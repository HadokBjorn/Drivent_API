import { prisma } from '@/config';

async function createTicketDB(ticketTypeId: number, enrollmentId: number) {
  return prisma.ticket.create({
    data: {
      enrollmentId,
      ticketTypeId,
      status: 'RESERVED',
      updatedAt: new Date(),
    },
    include: {
      TicketType: true,
    },
  });
}

async function getAllTicketTypesDB() {
  return prisma.ticketType.findMany({});
}

async function getUserTicketDB(id: number) {
  return prisma.enrollment.findUnique({
    include: {
      Ticket: {
        select: {
          TicketType: true,
        },
      },
    },
    where: {
      userId: id,
    },
  });
}

const ticketRepository = {
  createTicketDB,
  getAllTicketTypesDB,
  getUserTicketDB,
};

export default ticketRepository;
