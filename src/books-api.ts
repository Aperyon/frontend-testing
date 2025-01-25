import axios, { AxiosResponse } from "axios";
import { Book } from "./books-types";
import { useQuery } from "@tanstack/react-query";

export function fetchBooks(): Promise<AxiosResponse<Book[]>> {
  return axios.get("/api/books/");
}

export function useBooks() {
  return useQuery({ queryKey: ["books"], queryFn: fetchBooks });
}
