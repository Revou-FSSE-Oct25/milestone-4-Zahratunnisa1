import { IsUUID, IsInt, Min } from 'class-validator';

export class DepositDto {
  @IsUUID()
  accountId!: string;

  @IsInt()
  @Min(1)
  amount!: number;
}
