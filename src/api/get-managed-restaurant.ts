import { api } from "@/lib/axios";

export interface GetManagedRestaurantResponse {

  id: string;
  name: string;
  description: string;
  phone: string | null;
  role: "manager" | "customer";
  createdAt: Date | null;
  updatedArt: Date | null;
}

export async function getManagedRestaurant() {
  const response = await api.get<GetManagedRestaurantResponse>('/managed-restaurant')

  return response.data;
}