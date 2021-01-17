import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { v4 as uuid } from 'uuid'

@Entity('users')
export default class User {
  @PrimaryColumn()
  id?: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  @Exclude()
  password: string

  @Column()
  avatar: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @BeforeInsert()
  async userProps () {
    this.id = uuid()
  }

  @Expose({ name: 'avatar_url' })
  getAvatarUrl (): string | null {
    return this.avatar ? `${process.env.API_URL}/files/${this.avatar}` : null
  }
}
