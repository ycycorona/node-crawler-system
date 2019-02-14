import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm"
import { Base } from './fragment/base'
import { User } from "./User"

@Entity('user_auths')
export class UserAuth extends Base {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
      type: 'int',
      width: 11,
      comment: '用户id'
    })
    id_user: number

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

    @ManyToOne(type => User, user => user.userAuth)
    user: User
}
