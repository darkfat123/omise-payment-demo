import http from "./http";

export type PromptPayInitResponse = {
  download_uri: string;
  charge_id: string;
};

export const createPromptPayPayment = (cart: any) =>
  http.post<PromptPayInitResponse, PromptPayInitResponse>(
    "/pay/promptpay",
    cart
  );

export const checkPaymentStatus = (chargeId: string) =>
  http.get<{ status: string }, { status: string }>(
    `/pay/status/${chargeId}`
  );
