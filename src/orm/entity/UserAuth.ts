import {Entity, Index, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm"
import { Base } from './fragment/base'
import { User } from "./User"

@Entity('user_auths')
@Index(["userId", "auth_type"], { unique: true })
export class UserAuth extends Base {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true })
    userId: number;

    @Column({
      type: 'varchar',
      length: 50,
      comment: '授权的类型',
    })
    auth_type: string

    @Column({
      type: 'varchar',
      length: 50,
      comment: '给定授权方式的登录名',
    })
    identifier: string

    @Column({
      type: 'varchar',
      length: 500,
      comment: '给定授权方式的授权码',
    })
    token: string

    @ManyToOne(type => User, user => user.userAuths)
    user: User
}
