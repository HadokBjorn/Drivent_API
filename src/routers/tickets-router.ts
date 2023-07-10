import { Router } from 'express';
import ticketController from '@/controllers/tickets-controller';
import { authenticateToken } from '@/middlewares';

const ticketRouter = Router();

ticketRouter.get('/', authenticateToken, ticketController.getUserTicket);
ticketRouter.get('/types', authenticateToken, ticketController.getTicketTypes);

export { ticketRouter };
