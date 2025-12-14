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