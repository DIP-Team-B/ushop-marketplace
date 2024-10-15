import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./ui/accordion";
import { useState, useEffect } from "react";
import { Slider } from "./ui/slider";

type FilterState = {
  price: [number, number];
  size: string[];
  color: string[];
};

type FilterAccordionProps = {
  onFilterChange: (newFilters: FilterState) => void;
};

const Filter: React.FC<FilterAccordionProps> = ({ onFilterChange }) => {
  const [selectedPrice, setSelectedPrice] = useState<[number, number]>([0, 100]); // Price range slider
  const [selectedSize, setSelectedSize] = useState<string[]>(["XS", "S", "M", "L", "XL"]);
  const [selectedColor, setSelectedColor] = useState<string[]>(["Black", "Red", "Blue", "Green", "Yellow"]);

  useEffect(() => {
    handleFilterChange();
  }, [selectedPrice, selectedSize, selectedColor]);

  const handleFilterChange = () => {
    onFilterChange({
      price: selectedPrice,
      size: selectedSize,
      color: selectedColor,
    });
  };

  return (
    <div className="w-full lg:w-64 p-4">
      <Accordion type="multiple" className="space-y-4">
        {/* Price Filter with Slider */}
        <AccordionItem value="price">
          <AccordionTrigger>Price</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col space-y-2">
              <label>Price Range: ${selectedPrice[0]} - ${selectedPrice[1]}</label>
              <Slider
                min={0}
                max={100}
                value={selectedPrice}
                step={1}
                onChange={(newRange: [number, number]) => {
                  setSelectedPrice(newRange);
                }}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Size Filter */}
        <AccordionItem value="size">
          <AccordionTrigger>Size</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col space-y-2">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <label key={size}>
                  <input
                    type="checkbox"
                    name="size"
                    value={size}
                    checked={selectedSize.includes(size)}
                    onChange={() => {
                      const newSizeSelection = selectedSize.includes(size)
                        ? selectedSize.filter((s) => s !== size)
                        : [...selectedSize, size];
                      setSelectedSize(newSizeSelection);
                    }}
                  />{" "}
                  {size}
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Color Filter */}
        <AccordionItem value="color">
          <AccordionTrigger>Color</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col space-y-2">
              {["Black", "Red", "Blue", "Green", "Yellow"].map((color) => (
                <label key={color}>
                  <input
                    type="checkbox"
                    name="color"
                    value={color}
                    checked={selectedColor.includes(color)}
                    onChange={() => {
                      const newColorSelection = selectedColor.includes(color)
                        ? selectedColor.filter((c) => c !== color)
                        : [...selectedColor, color];
                      setSelectedColor(newColorSelection);
                    }}
                  />{" "}
                  {color}
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Clear Filter Button */}
        <button
          className="mt-4 p-2 bg-red-500 text-white rounded-md"
          onClick={() => {
            setSelectedPrice([0, 100]);
            setSelectedSize(["XS", "S", "M", "L", "XL"]);
            setSelectedColor(["Black", "Red", "Blue", "Green", "Yellow"]);
          }}
        >
          Clear Filters
        </button>
      </Accordion>
    </div>
  );
};

export default Filter;
