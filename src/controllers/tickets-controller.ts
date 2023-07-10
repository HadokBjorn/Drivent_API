import httpStatus from 'http-status';
import { Request, Response } from 'express';
import ticketRepository from '@/repositories/ticket-repository';
import { notFoundError } from '@/errors';
import { AuthenticatedRequest } from '@/middlewares';

async function createTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketTypeId } = req.body;
  const ticketCreated = await ticketRepository.createTicketDB(ticketTypeId, userId);
  if (!ticketCreated) throw notFoundError();
  res.status(httpStatus.CREATED).send(ticketCreated);
}

async function getTicketTypes(req: Request, res: Response) {
  const ticketTypes = await ticketRepository.getAllTicketTypesDB();
  return res.status(httpStatus.OK).send(ticketTypes);
}
async function getUserTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  if (!userId) throw notFoundError();
  const ticket = await ticketRepository.getUserTicketDB(userId);
  if (!ticket) throw notFoundError();
  res.status(httpStatus.OK).send(ticket);
}

const ticketController = {
  createTicket,
  getTicketTypes,
  getUserTicket,
};

export default ticketController;
