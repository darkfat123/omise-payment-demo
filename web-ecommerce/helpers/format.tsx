function formatCardNumber(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1-");
}
export { formatCardNumber };

type CardBrand = "visa" | "mastercard" | "jcb" | "unionpay" | "unknown";

function detectCardBrand(cardNumber: string): CardBrand {
  const digits = cardNumber.replace(/\D/g, "");

  if (/^4/.test(digits)) return "visa";
  if (/^5[1-5]/.test(digits)) return "mastercard";
  if (/^6/.test(digits)) return "unionpay";
  if (/^35/.test(digits)) return "jcb";

  return "unknown";
}
export { detectCardBrand };

function formatErrorDescByCode(code: string) {
  switch (code) {
    case "insufficient_fund":
      return "The card has insufficient funds.";

    case "stolen_or_lost_card":
      return "The card has been reported as lost or stolen.";

    case "failed_processing":
      return "The payment could not be processed. Please try again.";

    case "payment_rejected":
      return "The payment was rejected by the card issuer.";

    case "failed_fraud_check":
      return "The payment was declined due to suspected fraud.";

    case "invalid_account_number":
      return "The card number is invalid.";

    default:
      return "An unknown error occurred. (Code: " + code + ")";
  }
}
export { formatErrorDescByCode };


function CardIcon({ brand }: { brand: CardBrand }) {
  const src =
    brand === "visa"
      ? "/icons/visa.svg"
      : brand === "mastercard"
        ? "/icons/mastercard.svg"
        : brand === "jcb"
          ? "/icons/jcb.svg"
          : brand === "unionpay"
            ? "/icons/unionpay.svg"
            : "/icons/card.svg";

  return (
    <div className="w-8 h-6 flex items-center justify-center">
      <img
        src={src}
        className="max-w-full max-h-full object-contain"
        alt={brand}
      />
    </div>
  );
}
export { CardIcon };