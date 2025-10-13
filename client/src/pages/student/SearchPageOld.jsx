import { useState } from "react";
import Filter from "../../components/Filter";
import SearchResult from "./SearchResult";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGetSearchCourseQuery } from "@/features/api/courseApi";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { AlertCircle, Search, BookOpen, TrendingUp, Clock } from "lucide-react";

const SearchPage = () => {   
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("query") || "";
  const [searchInput, setSearchInput] = useState(query);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const { data, isLoading } = useGetSearchCourseQuery({
    searchQuery: query,
    categories: selectedCategories,
    sortByPrice
  });
  
  const isEmpty = !isLoading && (!data?.courses || data.courses.length === 0);
  const resultsCount = data?.courses?.length || 0;

  const handleFilterChange = (categories, price) => {
    setSelectedCategories(categories);
    setSortByPrice(price);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ query: searchInput.trim() });
    }
  };

  const popularSearches = ["Web Development", "Data Science", "React", "Python", "JavaScript", "UI/UX Design"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-950 dark:to-slate-900">
      {/* Premium Search Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Find Your Perfect Course</h1>
            <p className="text-xl text-slate-300 mb-8">Discover from thousands of courses to advance your skills</p>
          </div>
          
          {/* Enhanced Search Bar */}
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-8">
            <div className="relative flex items-center bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden transition-all duration-300 hover:bg-white/15 group">
              <div className="pl-6 pr-4">
                <Search className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
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
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 m-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Search Courses
              </Button>
            </div>
          </form>
          
          {/* Popular Searches */}
          {!query && (
            <div className="text-center">
              <p className="text-slate-300 mb-4">Popular searches:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchInput(term);
                      setSearchParams({ query: term });
                    }}
                    className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm hover:bg-white/20 transition-all duration-200 border border-white/20"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="relative max-w-2xl mx-auto md:mx-0">
              <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                <div className="pl-4 pr-2">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search for courses, topics, or instructors..."
                  className="flex-grow border-none focus-visible:ring-0 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 bg-transparent"
                />
                <Button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 m-1 rounded-lg font-medium"
                >
                  Search
                </Button>
              </div>
            </div>
          </form>

          {/* Search Results Info */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              {query ? (
                <>
                  <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    Search Results for &quot;{query}&quot;
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    {isLoading ? "Searching..." : `Found ${resultsCount.toLocaleString()} course${resultsCount !== 1 ? 's' : ''}`}
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    All Courses
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    Discover your next learning adventure
                  </p>
                </>
              )}
            </div>

            {/* Popular Searches */}
            {!query && (
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Popular:</span>
                {popularSearches.map((term) => (
                  <Badge
                    key={term}
                    variant="secondary"
                    className="cursor-pointer hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-300 transition-colors"
                    onClick={() => {
                      setSearchInput(term);
                      setSearchParams({ query: term });
                    }}
                  >
                    {term}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar */}
          <Filter handleFilterChange={handleFilterChange} />
          
          {/* Results */}
          <div className="flex-1">
            {/* Active Filters Display */}
            {(selectedCategories.length > 0 || sortByPrice) && (
              <Card className="mb-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                        Active Filters:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {selectedCategories.map((category) => (
                          <Badge key={category} variant="outline" className="text-xs">
                            {category}
                          </Badge>
                        ))}
                        {sortByPrice && (
                          <Badge variant="outline" className="text-xs">
                            {sortByPrice === 'low' ? 'Price: Low to High' : 'Price: High to Low'}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleFilterChange([], "")}
                      className="text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/50"
                    >
                      Clear All
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Results List */}
            <div className="space-y-4">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, idx) => (
                  <CourseSkeleton key={idx} />
                ))
              ) : isEmpty ? (
                <CourseNotFound query={query} />
              ) : (
                data?.courses?.map((course) => (
                  <SearchResult key={course._id} course={course} />
                ))
              )}
            </div>

            {/* Load More Button */}
            {!isLoading && !isEmpty && resultsCount >= 10 && (
              <div className="text-center mt-8">
                <Button 
                  variant="outline" 
                  className="px-8 py-3"
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
      </div>
    </div>
  );
};

export default SearchPage;

const CourseNotFound = ({ query }) => {
  return (
    <Card className="p-8 text-center">
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
            <AlertCircle className="text-gray-400 h-12 w-12" />
          </div>
          <h2 className="font-bold text-xl md:text-2xl text-gray-800 dark:text-gray-200 mb-2">
            No Courses Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
            {query 
              ? `We couldn't find any courses matching "${query}". Try different keywords or browse our categories.`
              : "No courses match your current filters. Try adjusting your search criteria."
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/course/search">
              <Button variant="outline" className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Clear Search
              </Button>
            </Link>
            <Link to="/">
              <Button className="flex items-center gap-2">
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
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Image Skeleton */}
          <div className="w-full md:w-64 h-48 md:h-32">
            <Skeleton className="h-full w-full" />
          </div>

          {/* Content Skeleton */}
          <div className="flex-1 p-4 space-y-3">
            <div className="space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            
            <div className="flex items-center gap-4">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-10" />
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
