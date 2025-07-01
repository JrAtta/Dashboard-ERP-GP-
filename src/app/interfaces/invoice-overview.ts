export interface InvoiceOverview {
 
  status: string;
  count: number;
  total: number;
  percent: number;
  color:string;
  paid?: number ;  // for partial paid  >>>>> total = paid + unPaid
  unPaid?: number ; // for partial paid  >>>>> total = paid + unPaid

}
