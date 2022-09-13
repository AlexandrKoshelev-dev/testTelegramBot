import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("bigint")
  telegramId: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  lang: string;
}
