import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm"
import { Base } from './fragment/base'
import { UserAuth } from './UserAuth'

@Entity('users')
export class User extends Base {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
      type: 'varchar',
      length: 50,
      unique: true,
      comment: '用户名'
    })
    userName: string

    @Column({
      type: 'varchar',
      length: 256,
      comment: '头像链接',
      default: ''
    })
    avatar: string

    @Column({
      type: 'varchar',
      length: 50,
      comment: '昵称',
      default: 'root'
    })
    nickName: string

    @OneToMany(type => UserAuth, userAuth => userAuth.user)
    userAuths: UserAuth[]
}
