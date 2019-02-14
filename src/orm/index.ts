import "reflect-metadata"
import { createConnection } from "typeorm"
import { FlightRoute } from "./entity/FlightRoute";

createConnection()
  .then(async connection => {

    console.log("Inserting a new user into the database...");
    const flightRoute = new FlightRoute();
    flightRoute.aAirportName = "青岛流亭机场"
    flightRoute.dAirportName = '上海虹桥机场'
    //await connection.manager.save(flightRoute);
    //console.log("Saved a new flightRoute with id: " + flightRoute.id);
    const flightRouteRepo = connection.getRepository(FlightRoute);
    console.log("Loading flightRoutes from the database...")
    const flightRoutes = await flightRouteRepo.find()
    console.log("Loaded flightRoutes: ", flightRoutes)

    console.log("Here you can setup and run express/koa/any other framework.");

  })
  .catch(error => console.log(error));
