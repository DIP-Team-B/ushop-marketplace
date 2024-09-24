import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface PromoCardsProps {
  name: string;
  image1: string;
  image2: string;
  id: string;
  price: number;
  disc: string;
}

const PromoCards: React.FC<PromoCardsProps> = ({
  name,
  id,
  image1,
  image2,
  price,
  disc,
}) => {
  const [isHovered, setHovered] = useState(false);
  return (
    <Link className="w-[200px] overflow-hidden block" href={`/${id}`}>
      <div
        className="flex flex-col gap-1"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="w-full aspect-[2/3] relative">
          <Image
            src={`/images/${image1}.png`}
            alt={name}
            fill={true}
            style={{ objectFit: "cover" }}
            className={`absolute transition-all duration-100 ease-in-out ${
              isHovered ? "block" : "hidden"
            }`}
          ></Image>
          <Image
            src={`/images/${image2}.png`}
            alt={name}
            fill={true}
            style={{ objectFit: "cover" }}
            className={`absolute transition-all duration-100 ease-in-out ${
              isHovered ? "hidden" : "block"
            }`}
          ></Image>
        </div>
        <p className="text-sm text-mainBlack">{name}</p>
        <div className="flex gap-2 items-center">
          <p className="text-primaryRed-600 font-semibold text-md">${price}</p>
          <div className="text-xs text-primaryRed-600 border-primaryRed-600 border-[1px] rounded-[2px] flex items-center justify-center h-4 w-9">
            -{disc}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PromoCards;
