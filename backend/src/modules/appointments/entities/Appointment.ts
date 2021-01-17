import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'
import User from '@modules/users/entities/User'

@Entity('appointments')
export default class Appointment {
  @PrimaryColumn()
  id?: string

  @Column()
  provider_id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('time with time zone')
  date: Date

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @BeforeInsert()
  appointmentProps () {
    this.id = uuid()
  }
}
