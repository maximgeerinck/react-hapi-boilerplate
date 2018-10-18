import * as Hapi from "hapi"
import { User } from "./user/User"

declare module "hapi" {
    interface AuthCredentials extends User { }
}