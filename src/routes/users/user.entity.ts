import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id?: number

  @Column()
  public username: string

  @Column()
  public nickname: string

  @Column()
  public email: string

  @Column()
  public role: string

}

export default User
