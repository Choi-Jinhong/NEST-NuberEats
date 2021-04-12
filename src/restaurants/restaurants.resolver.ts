import { Query, Resolver } from "@nestjs/graphql";
import { Restaurant } from "./Entities/restaurant.entity";

@Resolver(of => Restaurant)
export class RestaurantResolver {
    @Query(returns => Restaurant)
    myRestaurant() {
        return true;
    }
}