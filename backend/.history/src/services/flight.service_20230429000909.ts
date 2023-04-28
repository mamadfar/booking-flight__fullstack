import API from "../config/API"

export const airportService = (query: any, Authorization: string | undefined) => {
    return API.post("/search", query, {
        headers: {
          Authorization
        }
      })
}