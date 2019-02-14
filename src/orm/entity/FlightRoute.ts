import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"
import { Base } from './fragment/base'

@Entity()
export class FlightRoute extends Base {

    @PrimaryGeneratedColumn()
    id: string

    @Column()
    dAirportTlc: string

    @Column()
    dCityName: string

    @Column()
    dCityTlc: string

    @Column()
    dAirportName: string

    @Column()
    aAirportTlc: string

    @Column()
    aCityName: string

    @Column()
    aCityTlc: string

    @Column()
    aAirportName: string
}
