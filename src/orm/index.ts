import "reflect-metadata"
import { createConnection } from "typeorm"
import { FlightRoute } from "./entity/FlightRoute"
import { User } from "./entity/User"
import { UserAuth } from "./entity/UserAuth"

createConnection()
  .then(async connection => {

    console.log("Inserting a new user into the database...");
    const flightRoute = new FlightRoute()
    flightRoute.aAirportName = "青岛流亭机场"
    flightRoute.dAirportName = '上海虹桥机场'
    const FlightRouteRepo = connection.getRepository(FlightRoute)
    // FlightRouteRepo.save(flightRoute)
    //await connection.manager.save(flightRoute)
    //console.log("Saved a new flightRoute with id: " + flightRoute.id)
    // const flightRouteRepo = connection.getRepository(FlightRoute)
    // console.log("Loading flightRoutes from the database...")
    // const flightRoutes = await flightRouteRepo.find()
    // console.log("Loaded flightRoutes: ", flightRoutes)

    const UserRepo = connection.getRepository(User)
    // const user = new User()
    // user.userName = 'root' + Math.round(Number(Math.random().toFixed(3)) * 100)
    // await UserRepo.save(user)
    const user = await UserRepo.findOne(1, {relations: ['userAuths']})
    // const userAuths = await user.userAuths
    // console.log("userAuths: ", userAuths)
    const UserAuthRepo = connection.getRepository(UserAuth)
    const userAuth = new UserAuth()
    userAuth.auth_type = 'taobao'
    userAuth.identifier = 'test'
    userAuth.token = '123456'
    user.userAuths = [userAuth]
    await UserAuthRepo.save(userAuth)
    await UserRepo.save(user)
    console.log('saved')

  })
  .catch(error => console.log(error))
