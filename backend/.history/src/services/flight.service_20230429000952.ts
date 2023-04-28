import API from "../config/API"

export const 

export const ticketService = (query: any, Authorization: string | undefined) => {
    return API.post("/search", query, {
        headers: {
          Authorization
        }
      })
};