type BenefitCardProps = {
  benefit: string;
  index: number;
};

export function BenefitCard({ benefit, index }: BenefitCardProps) {
  return <article><span>0{index + 1}</span><h3>{benefit}</h3></article>;
}
