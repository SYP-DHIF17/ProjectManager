export interface Milestone {
  readonly milestoneId: string;
  position: number;
  name: string;
  projectPartId: string;
  startDate: Date;
  plannedEndDate: Date;
  realEndDate: Date;
}
