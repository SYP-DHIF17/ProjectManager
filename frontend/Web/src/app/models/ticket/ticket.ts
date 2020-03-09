export interface Ticket {
  readonly ticketId: string;
  title: string;
  description: string;
  isDone: boolean;
  importance: number;
  readonly userId: string;
  readonly workpackageId: string;
}
