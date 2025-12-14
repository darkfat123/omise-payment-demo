import http from "./http";

export type PromptPayInitResponse = {
  download_uri: string;
  charge_id: string;
};

export type CardPaymentRequest = {
  card: {
    number: string;
    name: string;
    expiration_month: string;
    expiration_year: string;
    security_code: string;
  };
  items: {
    productId: number;
    quantity: number;
  }[];
};


export type CardPaymentResponse = {
  charge_id: string;
  status: "pending" | "successful" | "failed";
  error?: string;
};

export const createCardPayment = (req: CardPaymentRequest) =>
  http.post<CardPaymentResponse, CardPaymentResponse>(
    "/pay/card",
    req
  );

export const createPromptPayPayment = (cart: any) =>
  http.post<PromptPayInitResponse, PromptPayInitResponse>(
    "/pay/promptpay",
    cart
  );

export const checkPaymentStatus = (chargeId: string) =>
  http.get<{ status: string }, { status: string }>(
    `/pay/status/${chargeId}`
  );
