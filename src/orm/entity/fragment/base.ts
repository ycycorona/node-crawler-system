import {CreateDateColumn, UpdateDateColumn, Column} from "typeorm"

export abstract class Base {

  @CreateDateColumn()
  create_time: Date

  @UpdateDateColumn()
  update_time: Date

  @Column({
    type: 'tinyint',
    width: 1,
    default: 1
  })
  status: number

}
