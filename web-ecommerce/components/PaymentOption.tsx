type Props = {
  title: string;
  description: string;
  onClick: () => void;
};

export default function PaymentOption({
  title,
  description,
  onClick,
}: Props) {
  return (
    <div
      onClick={onClick}
      className="border rounded-lg p-4 cursor-pointer hover:ring-2 transition"
    >
      <h2 className="text-lg font-medium">{title}</h2>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}
