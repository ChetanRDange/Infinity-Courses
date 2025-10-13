import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Filter as FilterIcon, X, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

const categories = [
  { id: "Next JS", label: "Next JS", icon: "⚛️" },
  { id: "Data Science", label: "Data Science", icon: "📊" },
  { id: "Frontend Development", label: "Frontend Development", icon: "🎨" },
  { id: "Fullstack Development", label: "Fullstack Development", icon: "⭐" },
  { id: "MERN Stack Development", label: "MERN Stack Development", icon: "🚀" },
  { id: "Backend Development", label: "Backend Development", icon: "⚙️" },
  { id: "Javascript", label: "Javascript", icon: "💛" },
  { id: "Python", label: "Python", icon: "🐍" },
  { id: "Docker", label: "Docker", icon: "🐳" },
  { id: "MongoDB", label: "MongoDB", icon: "🍃" },
  { id: "HTML", label: "HTML", icon: "📝" },
];

const Filter = ({ handleFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevCategories) => {
      const newCategories = prevCategories.includes(categoryId)
        ? prevCategories.filter((id) => id !== categoryId)
        : [...prevCategories, categoryId];

      handleFilterChange(newCategories, sortByPrice);
      return newCategories;
    });
  };

  const selectByPriceHandler = (selectedValue) => {
    setSortByPrice(selectedValue);
    handleFilterChange(selectedCategories, selectedValue);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSortByPrice("");
    handleFilterChange([], "");
  };

  const FilterContent = () => (
    <>
      {/* Sort Section */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            Sort By Price
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Select onValueChange={selectByPriceHandler} value={sortByPrice}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose sorting order" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Price Range</SelectLabel>
                <SelectItem value="low">💰 Low to High</SelectItem>
                <SelectItem value="high">💎 High to Low</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Categories Section */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <FilterIcon className="w-4 h-4" />
              Categories
            </CardTitle>
            {selectedCategories.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1 h-auto"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
          {selectedCategories.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {selectedCategories.map((categoryId) => {
                const category = categories.find(cat => cat.id === categoryId);
                return (
                  <Badge
                    key={categoryId}
                    variant="secondary"
                    className="text-xs px-2 py-1 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                  >
                    {category?.icon} {category?.label}
                  </Badge>
                );
              })}
            </div>
          )}
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => handleCategoryChange(category.id)}
                  className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
                <Label
                  htmlFor={category.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex items-center gap-2 flex-1"
                >
                  <span className="text-lg">{category.icon}</span>
                  {category.label}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Filters Count */}
      {(selectedCategories.length > 0 || sortByPrice) && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-700 dark:text-blue-300">
              {selectedCategories.length + (sortByPrice ? 1 : 0)} filter(s) applied
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/50 text-xs px-2 py-1 h-auto"
            >
              Clear All
            </Button>
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Mobile Filter */}
      <div className="md:hidden mb-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full flex items-center gap-2">
              <FilterIcon className="w-4 h-4" />
              Filters
              {(selectedCategories.length > 0 || sortByPrice) && (
                <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-700">
                  {selectedCategories.length + (sortByPrice ? 1 : 0)}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <FilterIcon className="w-5 h-5" />
                Filter Courses
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6 overflow-y-auto">
              <FilterContent />
            </div>
            <div className="mt-6 pt-4 border-t">
              <SheetClose asChild>
                <Button className="w-full">Apply Filters</Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Filter */}
      <div className="hidden md:block w-full md:w-[280px] lg:w-[320px]">
        <div className="sticky top-20">
          <FilterContent />
        </div>
      </div>
    </>
  );
};

export default Filter;
