import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Course from "./Course";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Star, TrendingUp, BookOpen, Users } from "lucide-react";

const Courses = () => {
    const { data, isLoading, isError } = useGetPublishedCourseQuery();
    const navigate = useNavigate();

    if (isError) return (
        <div className="bg-gray-50 dark:bg-gray-900 py-12">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Oops! Something went wrong
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    We couldn't load the courses right now. Please try again later.
                </p>
                <Button onClick={() => window.location.reload()}>
                    Try Again
                </Button>
            </div>
        </div>
    );

    const featuredCourses = data?.courses?.slice(0, 6) || [];
    const popularCourses = data?.courses?.slice(6, 12) || [];

    return (
        <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-950 dark:to-slate-900 min-h-screen">
            {/* Hero Banner for Featured Courses */}
            <section className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white py-20">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

                {/* Floating Elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-float"></div>
                <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-float delay-300"></div>
                <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-indigo-500/20 rounded-full blur-xl animate-float delay-500"></div>

                <div className="relative max-w-7xl mx-auto px-4 text-center">
                    <div className="animate-fade-in-up">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                            Featured Courses
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
                            🌟 Premium courses handpicked by experts to supercharge your career
                        </p>
                        <div className="flex flex-wrap justify-center gap-6 text-sm text-blue-200">
                            <span className="flex items-center gap-2">
                                <Star className="w-4 h-4" />
                                Top Rated
                            </span>
                            <span className="flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                Most Popular
                            </span>
                            <span className="flex items-center gap-2">
                                <TrendingUp className="w-4 h-4" />
                                Trending Now
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Continue Your Journey - Horizontal Scroll */}
            <section className="py-8 -mt-10 relative z-10">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                Continue Your Journey
                            </h2>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigate('/my-learning')}
                                className="text-blue-600 hover:text-blue-700"
                            >
                                View All
                            </Button>
                        </div>

                        {/* Horizontal Scrollable Course Cards */}
                        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                            {isLoading ? (
                                Array.from({ length: 4 }).map((_, index) => (
                                    <div key={index} className="flex-shrink-0">
                                        <CoursesSkeleton />
                                    </div>
                                ))
                            ) : (
                                featuredCourses.slice(0, 4).map((course, index) => (
                                    <div
                                        key={course._id || index}
                                        className="flex-shrink-0 animate-fade-in-up"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <Course course={course} />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Recommended Courses - Horizontal Scroll */}
            <section className="py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                Recommended Courses
                            </h2>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigate('/course/search')}
                                className="text-blue-600 hover:text-blue-700"
                            >
                                View All
                            </Button>
                        </div>

                        {/* Horizontal Scrollable Course Cards */}
                        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                            {isLoading ? (
                                Array.from({ length: 4 }).map((_, index) => (
                                    <div key={index} className="flex-shrink-0">
                                        <CoursesSkeleton />
                                    </div>
                                ))
                            ) : (
                                featuredCourses.slice(4, 8).map((course, index) => (
                                    <div
                                        key={course._id || index}
                                        className="flex-shrink-0 animate-fade-in-up"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <Course course={course} />
                                    </div>
                                ))
                            )}
                        </div>

                        {/* View All Button */}
                        <div className="text-center mt-6">
                            <Button
                                onClick={() => navigate('/course/search')}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <BookOpen className="w-4 h-4 mr-2" />
                                Explore All {data?.courses?.length || 0}+ Courses
                                <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-12 bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Popular Categories
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Explore diverse learning paths and find the perfect course for your goals
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { name: "Web Development", icon: "💻", count: "120+ Courses", color: "from-blue-500 to-cyan-500" },
                            { name: "Data Science", icon: "📊", count: "85+ Courses", color: "from-purple-500 to-pink-500" },
                            { name: "Design", icon: "🎨", count: "95+ Courses", color: "from-orange-500 to-red-500" },
                            { name: "Business", icon: "💼", count: "110+ Courses", color: "from-green-500 to-emerald-500" },
                            { name: "Mobile Development", icon: "📱", count: "75+ Courses", color: "from-indigo-500 to-purple-500" },
                            { name: "Marketing", icon: "📢", count: "60+ Courses", color: "from-pink-500 to-rose-500" },
                            { name: "Photography", icon: "📸", count: "45+ Courses", color: "from-yellow-500 to-orange-500" },
                            { name: "Music", icon: "🎵", count: "30+ Courses", color: "from-teal-500 to-cyan-500" }
                        ].map((category, index) => (
                            <Card
                                key={index}
                                className="cursor-pointer hover:shadow-lg transition-all duration-200 group border-0 overflow-hidden"
                                onClick={() => navigate(`/course/search?query=${category.name.toLowerCase()}`)}
                            >
                                <CardContent className="p-4 text-center">
                                    <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                                        {category.icon}
                                    </div>
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm md:text-base">
                                        {category.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {category.count}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular This Week - Horizontal Scroll */}
            <section className="py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-orange-500" />
                                    Popular This Week
                                </h2>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    Most enrolled courses
                                </p>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigate('/course/search?query=popular')}
                                className="text-orange-600 hover:text-orange-700"
                            >
                                View All
                            </Button>
                        </div>

                        {/* Horizontal Scrollable Course Cards */}
                        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                            {isLoading ? (
                                Array.from({ length: 4 }).map((_, index) => (
                                    <div key={index} className="flex-shrink-0">
                                        <CoursesSkeleton />
                                    </div>
                                ))
                            ) : (
                                popularCourses.slice(0, 4).map((course, index) => (
                                    <div
                                        key={course._id || index}
                                        className="flex-shrink-0 animate-fade-in-up"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <Course course={course} />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="flex justify-center mb-2">
                                <Users className="w-8 h-8" />
                            </div>
                            <div className="text-2xl md:text-3xl font-bold mb-1">50,000+</div>
                            <div className="text-blue-100 text-sm">Happy Students</div>
                        </div>
                        <div>
                            <div className="flex justify-center mb-2">
                                <BookOpen className="w-8 h-8" />
                            </div>
                            <div className="text-2xl md:text-3xl font-bold mb-1">1,000+</div>
                            <div className="text-blue-100 text-sm">Online Courses</div>
                        </div>
                        <div>
                            <div className="flex justify-center mb-2">
                                <Star className="w-8 h-8" />
                            </div>
                            <div className="text-2xl md:text-3xl font-bold mb-1">4.8/5</div>
                            <div className="text-blue-100 text-sm">Average Rating</div>
                        </div>
                        <div>
                            <div className="flex justify-center mb-2">
                                <TrendingUp className="w-8 h-8" />
                            </div>
                            <div className="text-2xl md:text-3xl font-bold mb-1">95%</div>
                            <div className="text-blue-100 text-sm">Success Rate</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Courses;

const CoursesSkeleton = () => {
    return (
        <Card className="overflow-hidden rounded-xl border-0 ring-1 ring-gray-200 dark:ring-gray-700 w-[280px] flex-shrink-0">
            <Skeleton className="w-full aspect-[16/10]" />
            <CardContent className="p-3 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <div className="flex items-center gap-4">
                    <Skeleton className="h-3 w-8" />
                    <Skeleton className="h-3 w-8" />
                    <Skeleton className="h-3 w-8" />
                </div>
                <div className="flex items-center justify-between pt-1">
                    <Skeleton className="h-5 w-12" />
                    <Skeleton className="h-6 w-12" />
                </div>
            </CardContent>
        </Card>
    );
};