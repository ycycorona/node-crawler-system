import {Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, OneToMany, JoinColumn} from "typeorm"
import { Base } from './fragment/base'
import { FlightRoute } from "./FlightRoute"
import { StopInfo } from "./StopInfo"
import { CabinInfo } from "./CabinInfo"


@Entity()
export class FlightInfo extends Base {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
      type: 'varchar',
      default: '',
      length: 50,
      comment: '航空公司名'
    })
    airlineName: string

    @Column({
      type: 'varchar',
      default: '',
      length: 10,
      comment: '航空公司代码'
    })
    airlineCode: string

    @Column({
      type: 'varchar',
      default: '',
      length: 20,
      comment: '共享航班号'
    })
    sharedFlightNumber: string

    @Column({
      type: 'varchar',
      default: '',
      length: 50,
      comment: '共享航班航司名'
    })
    sharedFlightName: string

    @Column({
      type: 'varchar',
      default: '',
      length: 50,
      comment: '飞机型号'
    })
    craftTypeName: string

    @Column({
      type: 'varchar',
      default: '',
      length: 20,
      comment: '航班号'
    })
    flightNumber: string

    @ManyToOne(type => FlightRoute)
    flightRoute: FlightRoute

    @OneToMany(type => StopInfo, stopInfo => stopInfo.flightInfo)
    stopInfos: StopInfo[]

    @OneToMany(type => CabinInfo, cabinInfo => cabinInfo.flightInfo)
    cabinInfos: CabinInfo[]

    @Column({
      type: 'datetime',
      default: null,
      comment: '起始时间'
    })
    departureDate: Date

    @Column({
      type: 'datetime',
      default: null,
      comment: '到达时间'
    })
    arrivalDate: Date

    @Column({
      type: 'datetime',
      default: null,
      comment: '获取时间'
    })
    getTime: Date
}
