import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'
import User from './User'

@Entity('user_tokens')
export default class UserToken {
  @PrimaryColumn()
  id?: string

  @Column('uuid')
  token: string

  @Column('uuid')
  user_id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @BeforeInsert()
  async userProps () {
    this.id = uuid()
    this.token = uuid()
  }
}
