import API from "../config/API"

export const AirportService = (query: any, Authorization: string | undefined) => {
    return API.post("/autocomplete", query, {
        headers: {
          Authorization,
        },
      })
};

export const TicketService = (query: any, Authorization: string | undefined) => {
    return API.post("/search", query, {
        headers: {
          Authorization
        }
      })
};