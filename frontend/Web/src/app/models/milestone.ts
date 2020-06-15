export interface Milestone {
  readonly milestoneId: string;
  name: string;
  description: string;
  projectPartId: string;
  reachDate: Date;
}
