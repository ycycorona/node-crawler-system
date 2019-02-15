import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Base } from './fragment/base'
import { FlightInfo } from './FlightInfo'

@Entity()
export class StopInfo extends Base {

  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'date',
    comment: '经停开始时间'
  })
  startDate: Date

  @Column({
    type: 'date',
    comment: '经停结束时间'
  })
  endDate: Date

  @Column({
    type: 'varchar',
    length: 20,
    comment: '城市编号'
  })
  cityCode: String

  @Column({
    type: 'varchar',
    length: 50,
    comment: '城市名称'
  })
  cityName: String

  @ManyToOne(type => FlightInfo)
  flightInfo: FlightInfo
}
