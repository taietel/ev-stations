export class CreateCompanyDto {
  id?: number;
  name: string;
  parent_company: number | null;
}
