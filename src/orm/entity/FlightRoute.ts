import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity()
export class FlightRoute {


    @PrimaryGeneratedColumn('uuid')
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
