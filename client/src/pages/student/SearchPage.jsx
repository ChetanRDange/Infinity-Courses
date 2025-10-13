import { useState } from "react";
import Filter from "../../components/Filter";
import SearchResult from "./SearchResult";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGetSearchCourseQuery } from "@/features/api/courseApi";
import { Link, useSearchParams } from "react-router-dom";
import { AlertCircle, Search, BookOpen, TrendingUp, Clock, Filter as FilterIcon } from "lucide-react";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [searchInput, setSearchInput] = useState(query);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");
  const [activeFilters, setActiveFilters] = useState({});

  const { data, isLoading } = useGetSearchCourseQuery({
    searchQuery: query,
    categories: selectedCategories,
    sortByPrice
  });

  const isEmpty = !isLoading && (!data?.courses || data.courses.length === 0);
  const resultsCount = data?.courses?.length || 0;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ query: searchInput.trim() });
    }
  };

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
    // Convert filters to API format
    const categories = filters.category && filters.category !== 'All Categories' ? [filters.category] : [];
    const price = filters.price && filters.price !== 'All Prices' ? filters.price : "";
    setSelectedCategories(categories);
    setSortByPrice(price);
  };

  const popularSearches = ["Web Development", "Data Science", "React", "Python", "JavaScript", "UI/UX Design"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Premium Search Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-float delay-300"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-indigo-500/20 rounded-full blur-xl animate-float delay-500"></div>

        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-10 animate-fade-in-up">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Find Your Perfect Course
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Discover from thousands of premium courses to advance your skills and boost your career
            </p>
          </div>

          {/* Enhanced Search Bar */}
          <form onSubmit={handleSearch} className="max-w-4xl mx-auto mb-10 animate-fade-in-up delay-200">
            <div className="relative flex items-center bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden transition-all duration-300 hover:bg-white/15 hover:shadow-3xl group">
              <div className="pl-6 pr-4">
                <Search className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors duration-300" />
              </div>
              <Input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search for courses, topics, or instructors..."
                className="flex-grow border-none focus-visible:ring-0 py-6 text-white placeholder-slate-400 bg-transparent text-lg font-medium"
              />
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 m-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-glow"
              >
                Search Courses
              </Button>
            </div>
          </form>

          {/* Popular Searches */}
          {!query && (
            <div className="text-center animate-fade-in-up delay-300">
              <p className="text-slate-300 mb-6 text-lg">Popular searches:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {popularSearches.map((term, index) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchInput(term);
                      setSearchParams({ query: term });
                    }}
                    className={`px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm hover:bg-white/20 transition-all duration-300 border border-white/20 hover:scale-105 hover:shadow-lg animate-fade-in-up delay-${300 + index * 100}`}
                    style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Results Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8 animate-fade-in-up">
          <div>
            {query ? (
              <>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Search Results for <span className="text-blue-600">&quot;{query}&quot;</span>
                </h1>
                <p className="text-gray-600 text-lg">
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      Searching...
                    </span>
                  ) : (
                    `Found ${resultsCount.toLocaleString()} course${resultsCount !== 1 ? 's' : ''}`
                  )}
                </p>
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  All Courses
                </h1>
                <p className="text-gray-600 text-lg">
                  Discover your next learning adventure from our comprehensive catalog
                </p>
              </>
            )}
          </div>

          {/* Filter Component */}
          <div className="flex items-center gap-4">
            <Filter
              onFilterChange={handleFilterChange}
              activeFilters={activeFilters}
            />

            {/* Sort Dropdown */}
            <select
              value={sortByPrice}
              onChange={(e) => setSortByPrice(e.target.value)}
              className="px-4 py-2.5 bg-white border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sort by</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Quick Stats */}
        {query && !isLoading && !isEmpty && (
          <div className="flex flex-wrap gap-4 mb-8 animate-fade-in-up delay-200">
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg">
              <BookOpen className="w-4 h-4" />
              <span className="font-medium">{resultsCount} Courses</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg">
              <TrendingUp className="w-4 h-4" />
              <span className="font-medium">Top Rated</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg">
              <Clock className="w-4 h-4" />
              <span className="font-medium">Updated Recently</span>
            </div>
          </div>
        )}

        {/* Results List */}
        <div className="space-y-6 animate-fade-in-up delay-300">
          {isLoading ? (
            <div className="grid gap-6">
              {Array.from({ length: 6 }).map((_, idx) => (
                <CourseSkeleton key={idx} />
              ))}
            </div>
          ) : isEmpty ? (
            <CourseNotFound query={query} />
          ) : (
            <div className="grid gap-6">
              {data?.courses?.map((course, index) => (
                <div
                  key={course._id}
                  className="course-card-hover animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <SearchResult course={course} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Load More Button */}
        {!isLoading && !isEmpty && resultsCount >= 10 && (
          <div className="text-center mt-12 animate-fade-in-up delay-500">
            <Button
              variant="outline"
              className="px-12 py-4 text-lg font-semibold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => {
                // Implement load more functionality
              }}
            >
              Load More Courses
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;

const CourseNotFound = ({ query }) => {
  return (
    <Card className="p-12 text-center shadow-lg border-0 bg-gradient-to-br from-white to-gray-50 animate-fade-in-up">
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-8 animate-scale-in">
            <AlertCircle className="text-blue-500 h-16 w-16" />
          </div>
          <h2 className="font-bold text-3xl text-gray-800 mb-4">
            No Courses Found
          </h2>
          <p className="text-gray-600 mb-8 max-w-md text-lg leading-relaxed">
            {query
              ? `We couldn't find any courses matching "${query}". Try different keywords or browse our categories.`
              : "No courses match your current filters. Try adjusting your search criteria."
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/course/search">
              <Button variant="outline" className="flex items-center gap-2 px-6 py-3 rounded-xl">
                <Search className="w-4 h-4" />
                Clear Search
              </Button>
            </Link>
            <Link to="/">
              <Button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <BookOpen className="w-4 h-4" />
                Browse All Courses
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const CourseSkeleton = () => {
  return (
    <Card className="overflow-hidden shadow-lg border-0 bg-white animate-fade-in-up">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Image Skeleton */}
          <div className="w-full md:w-80 h-48 md:h-40">
            <Skeleton className="h-full w-full rounded-t-lg md:rounded-l-lg md:rounded-t-none" />
          </div>

          {/* Content Skeleton */}
          <div className="flex-1 p-6 space-y-4">
            <div className="space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>

            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-32" />
            </div>

            <div className="flex items-center gap-6">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-12" />
            </div>

            <div className="flex items-center justify-between pt-4">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-10 w-24 rounded-lg" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};