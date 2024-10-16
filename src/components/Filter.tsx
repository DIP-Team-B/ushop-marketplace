"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
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
  const [selectedPrice, setSelectedPrice] = useState<[number, number]>([0, 100]); 
  const [selectedSize, setSelectedSize] = useState<string[]>(["XS", "S", "M", "L", "XL"]);
  const [selectedColor, setSelectedColor] = useState<string[]>(["Black", "Red", "Navy", "Blue", "Green", "Beige", "White", "Pink", "Purple"]);
  const [maxPrice, setMaxPrice] = useState(100)

  const handleSliderChange = (newValues: number[]) => {
    setMaxPrice(newValues[0])
    setSelectedPrice(newRange)
  }

  const handleInputChange = (value: string) => {
    const newValue = parseInt(value, 10)
    if (!isNaN(newValue) && newValue >= 0 && newValue <= 100) {
      setMaxPrice(newValue)
    }
  }

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
        <AccordionItem value="price">
          <AccordionTrigger>Price</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col space-y-2">
              <label>Price Range: ${selectedPrice[0]} - ${selectedPrice[1]}</label>
              <Slider
                value={[maxPrice]}
                max={100}
                step={1}
                onValueChange={handleSliderChange}
                className="w-full"
              />
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Label htmlFor="min-price">Min Price</Label>
                  <Input
                    id="min-price"
                    type="number"
                    value={0}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="max-price">Max Price</Label>
                  <Input
                    id="max-price"
                    type="number"
                    min={0}
                    max={100}
                    value={maxPrice}
                    onChange={(e) => handleInputChange(e.target.value)}
                  />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Showing items priced $0 - ${maxPrice}
              </p>
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
              {["Black", "Red", "Navy", "Blue", "Green", "Beige", "White", "Pink", "Purple"].map((color) => (
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
          className="mt-4 p-2 border-black bg-beige text-black rounded-md"
          onClick={() => {
            setSelectedPrice([0, 100]);
            setSelectedSize(["XS", "S", "M", "L", "XL"]);
            setSelectedColor(["Black", "Red", "Navy", "Blue", "Green", "Beige", "White", "Pink", "Purple"]);
          }}
        >
          Clear Filters
        </button>
      </Accordion>
    </div>
  );
};

export default Filter;
