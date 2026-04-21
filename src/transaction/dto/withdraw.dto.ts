import { IsUUID, IsInt, Min } from 'class-validator';

export class WithdrawDto {
  @IsUUID()
  accountId!: string;

  @IsInt()
  @Min(1)
  amount!: number;
}
