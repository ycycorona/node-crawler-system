import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Base } from './fragment/base'
import { FlightInfo } from './FlightInfo'

@Entity()
export class CabinInfo extends Base {

  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'float',
    default: 0
  })
  salePrice: number

  @Column({
    type: 'float',
    default: 0
  })
  price: number

  @Column({
    type: 'varchar',
    default: '',
    length: 10
  })
  cabinClass: string

  @Column({
    type: 'varchar',
    default: 0,
    length: 10
  })
  priceClass: number

  @Column({
    type: 'float',
    default: 0
  })
  rate: number

  @Column({
    type: 'int',
    default: 0
  })
  seatCount: number

  @Column({
    type: 'varchar',
    default: '',
    length: 50
  })
  specialClassName: string

  @Column('simple-array')
  productInfoList: string[]

  @ManyToOne(type => FlightInfo)
  flightInfo: FlightInfo
}
