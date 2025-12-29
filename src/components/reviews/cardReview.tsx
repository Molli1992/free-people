import { CardReviewProps } from '@/types/reviews';
import { BiSolidQuoteAltLeft } from 'react-icons/bi';

export default function CardReview({
  name,
  occupation,
  description,
}: CardReviewProps) {
  return (
    <div className="flex flex-col gap-4 h-[500px] w-full max-w-xs">
      <div className="h-full flex flex-col gap-2 p-8 rounded-xl bg-secondary-darkBlue justify-between">
        <div className="flex flex-col gap-2">
          <BiSolidQuoteAltLeft className="h-12 w-12 text-orange" />
          <p className="text-base sm:text-lg text-white">{description}</p>
        </div>

        <div className="flex flex-col">
          <p className="text-base text-beige font-bold">{name}</p>
          <p className="text-base text-lightBlue font-semibold">{occupation}</p>
        </div>
      </div>
    </div>
  );
}
