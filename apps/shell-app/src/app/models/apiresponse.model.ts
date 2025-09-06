export class ApiResponseModel {
  public data: any | null = null;
  public success: boolean = false;
  public statusCode: number = 0;
  public message: string | null = null;
}