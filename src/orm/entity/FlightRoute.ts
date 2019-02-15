import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm"
import { Base } from './fragment/base'
import { FlightInfo } from './FlightInfo'

@Entity()
export class FlightRoute extends Base {

  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'varchar',
    length: 10,
    comment: '起始地机场编码'
  })
  dAirportTlc: string

  @Column({
    type: 'varchar',
    length: 50,
    comment: '起始地机场名称'
  })
  dCityName: string

  @Column({
    type: 'varchar',
    length: 10,
    comment: '起始地城市编码'
  })
  dCityTlc: string

  @Column({
    type: 'varchar',
    length: 50,
    comment: '起始地机场名称'
  })
  dAirportName: string

  @Column({
    type: 'varchar',
    length: 10,
    comment: '目的地机场编码'
  })
  aAirportTlc: string

  @Column({
    type: 'varchar',
    length: 50,
    comment: '目的地城市名称'
  })
  aCityName: string

  @Column({
    type: 'varchar',
    length: 10,
    comment: '目的地城市编码'
  })
  aCityTlc: string

  @Column({
    type: 'varchar',
    length: 50,
    comment: '目的地机场名称'
  })
  aAirportName: string

  @OneToOne(type => FlightInfo)
  flightInfo: FlightInfo
}
