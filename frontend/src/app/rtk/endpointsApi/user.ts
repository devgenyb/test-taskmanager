import { RequestMethod } from "@/shared/types/httpMethods";
import { backApiEndpoints } from "../apiConstants";
import { backApi } from "..";


const userApi = backApi.injectEndpoints({
    endpoints: build => ({
        login: build.mutation({
            query: body => ({
                url: '/' + backApiEndpoints.auth.login,
                method: RequestMethod.POST,
                body
            })
        }),
        logout: build.mutation<any, void>({
            query: () => ({
                url: '/' + backApiEndpoints.auth.logout,
                method: RequestMethod.POST
            })
        })
    })
})


export const { useLoginMutation, useLogoutMutation } = userApi