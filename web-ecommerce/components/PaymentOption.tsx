type Props = {
  title: string;
  description: string;
  imageSrc?: string;
  onClick: () => void;
};

export default function PaymentOption({
  title,
  description,
  imageSrc,
  onClick,
}: Props) {
  return (
    <div
      onClick={onClick}
      className="flex flex-row items-center border rounded-lg p-4 cursor-pointer hover:ring-2 transition bg-[var(--box)]"
    >
      <div>
        <h2 className="text-lg font-medium">{title}</h2>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <img src={imageSrc} className="h-8 ml-auto" />
    </div>
  );
}
