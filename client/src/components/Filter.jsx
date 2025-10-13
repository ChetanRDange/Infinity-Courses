import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Filter as FilterIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Filter = ({ onFilterChange, activeFilters }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const categories = [
        'All Categories',
        'Web Development',
        'Mobile Development',
        'Data Science',
        'Machine Learning',
        'Design',
        'Marketing',
        'Business',
        'Photography',
        'Music',
        'Languages'
    ];

    const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
    const durations = ['Any Duration', '0-2 Hours', '3-6 Hours', '7-17 Hours', '17+ Hours'];
    const prices = ['All Prices', 'Free', 'Paid'];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleFilterSelect = (type, value) => {
        onFilterChange({ ...activeFilters, [type]: value });
    };

    const clearFilter = (type) => {
        const newFilters = { ...activeFilters };
        delete newFilters[type];
        onFilterChange(newFilters);
    };

    const clearAllFilters = () => {
        onFilterChange({});
    };

    const activeFilterCount = Object.keys(activeFilters).length;

    const FilterSection = ({ title, options, type, selectedValue }) => (
        <div className="py-3 first:pt-0 last:pb-0">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">{title}</h4>
            <div className="space-y-1">
                {options.map((option) => (
                    <button
                        key={option}
                        onClick={() => handleFilterSelect(type, option)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${selectedValue === option
                                ? 'bg-blue-50 text-blue-700 font-medium'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Filter Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center px-4 py-2.5 bg-white border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 font-medium text-gray-700 hover:text-gray-900 group"
            >
                <FilterIcon className="w-5 h-5 mr-2 text-gray-500 group-hover:text-gray-700" />
                Filter
                {activeFilterCount > 0 && (
                    <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        {activeFilterCount}
                    </span>
                )}
                <ChevronDown
                    className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                        }`}
                />
            </button>

            {/* Active Filters Display */}
            {activeFilterCount > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                    {Object.entries(activeFilters).map(([type, value]) => (
                        <motion.div
                            key={`${type}-${value}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="inline-flex items-center px-3 py-1.5 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                            <span className="font-medium">{value}</span>
                            <button
                                onClick={() => clearFilter(type)}
                                className="ml-2 hover:text-blue-900 transition-colors"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </motion.div>
                    ))}
                    <button
                        onClick={clearAllFilters}
                        className="text-xs text-gray-500 hover:text-gray-700 underline transition-colors"
                    >
                        Clear all
                    </button>
                </div>
            )}

            {/* Dropdown Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 z-50 overflow-hidden"
                    >
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                                {activeFilterCount > 0 && (
                                    <button
                                        onClick={clearAllFilters}
                                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        Clear All
                                    </button>
                                )}
                            </div>

                            <div className="max-h-80 overflow-y-auto space-y-4">
                                <FilterSection
                                    title="Category"
                                    options={categories}
                                    type="category"
                                    selectedValue={activeFilters.category}
                                />

                                <div className="border-t border-gray-100"></div>

                                <FilterSection
                                    title="Level"
                                    options={levels}
                                    type="level"
                                    selectedValue={activeFilters.level}
                                />

                                <div className="border-t border-gray-100"></div>

                                <FilterSection
                                    title="Duration"
                                    options={durations}
                                    type="duration"
                                    selectedValue={activeFilters.duration}
                                />

                                <div className="border-t border-gray-100"></div>

                                <FilterSection
                                    title="Price"
                                    options={prices}
                                    type="price"
                                    selectedValue={activeFilters.price}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Filter;