import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity({ database: "auth" })
export class Auth {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    userName: string
}
