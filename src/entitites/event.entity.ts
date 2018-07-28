import { Column, Entity } from 'typeorm';

@Entity()
export class EventEntity{
  @Column('int')
  time:number;
  @Column()
  data:any;
}
