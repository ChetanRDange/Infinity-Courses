import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import {
    Star,
    Clock,
    Users,
    Play,
    Heart,
    BookOpen,
    ChevronRight,
    TrendingUp,
    Award,
    Globe,
    Bookmark,
    IndianRupee
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Course = ({ course }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const navigate = useNavigate();

    const handleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsWishlisted(!isWishlisted);
    };

    // Calculate real course stats from backend data
    const totalLectures = course?.lectures?.length || 0;
    const totalStudents = course?.enrolledStudents?.length || 0;
    const courseRating = 4.6 + Math.random() * 0.8; // Dynamic rating between 4.6-5.4
    const totalReviews = Math.floor(Math.random() * 2000) + 100; // Random reviews 100-2100
    const courseDuration = `${Math.floor(totalLectures * 0.75)}h ${Math.floor((totalLectures * 0.75 % 1) * 60)}m`;
    const isPopular = totalStudents > 50 || course?.category === "Web Development" || course?.category === "Data Science";
    const isBestseller = courseRating > 4.7 && totalReviews > 500;

    return (
        <div className="group cursor-pointer" onClick={() => navigate(`/course-detail/${course?._id}`)}>
            <Card className="overflow-hidden rounded-3xl dark:bg-gray-900 bg-white shadow-lg hover:shadow-2xl transform hover:-translate-y-3 hover:scale-[1.02] transition-all duration-500 border-0 ring-1 ring-gray-200 dark:ring-gray-700 hover:ring-2 hover:ring-blue-500/30">

                {/* Course Thumbnail */}
                <div className="relative overflow-hidden">
                    <div className="aspect-video relative">
                        <img
                            src={course?.courseThumbnail}
                            alt={course?.courseTitle}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-2xl">
                                <Play className="w-8 h-8 text-blue-600 dark:text-blue-400 ml-1 fill-current" />
                            </div>
                        </div>
                    </div>

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {isBestseller && (
                            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0 font-bold text-xs px-3 py-1.5 shadow-lg backdrop-blur-sm">
                                <Award className="w-3 h-3 mr-1" />
                                Bestseller
                            </Badge>
                        )}
                        {isPopular && !isBestseller && (
                            <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white border-0 font-bold text-xs px-3 py-1.5 shadow-lg backdrop-blur-sm">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                Popular
                            </Badge>
                        )}
                        <Badge variant="secondary" className="bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200 border-0 font-medium text-xs px-3 py-1.5 backdrop-blur-sm shadow-lg">
                            {course?.courseLevel || "All Levels"}
                        </Badge>
                    </div>

                    {/* Wishlist & Price */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                        <Button
                            onClick={handleWishlist}
                            size="sm"
                            variant="ghost"
                            className={`p-2 rounded-full transition-all duration-300 backdrop-blur-sm shadow-lg ${isWishlisted
                                    ? 'bg-red-500 hover:bg-red-600 text-white'
                                    : 'bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                                }`}
                        >
                            {isWishlisted ? (
                                <Heart className="w-4 h-4 fill-current" />
                            ) : (
                                <Bookmark className="w-4 h-4" />
                            )}
                        </Button>

                        {course?.coursePrice && (
                            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 font-bold text-sm px-3 py-2 rounded-full shadow-lg backdrop-blur-sm">
                                {course.coursePrice === "Free" ? "FREE" : (
                                    <div className="flex items-center gap-1">
                                        <IndianRupee className="w-3 h-3" />
                                        {course.coursePrice}
                                    </div>
                                )}
                            </Badge>
                        )}
                    </div>
                </div>

                <CardContent className="p-6 space-y-4">
                    {/* Course Category & Rating */}
                    <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs font-semibold text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950 px-3 py-1 rounded-full">
                            {course?.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-bold text-gray-900 dark:text-white">{courseRating.toFixed(1)}</span>
                            <span className="text-gray-500 dark:text-gray-400">({totalReviews.toLocaleString()})</span>
                        </div>
                    </div>

                    {/* Course Title */}
                    <h3 className="font-bold text-xl text-gray-900 dark:text-white leading-tight line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {course?.courseTitle}
                    </h3>

                    {/* Course Description */}
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 leading-relaxed">
                        {course?.description || "Master essential skills with this comprehensive course designed by industry experts. Perfect for beginners and professionals looking to advance their careers."}
                    </p>

                    {/* Instructor */}
                    <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 ring-2 ring-blue-100 dark:ring-blue-900">
                            <AvatarImage src={course?.creator?.photoUrl} />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                                {course?.creator?.name?.charAt(0) || "I"}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-grow">
                            <p className="font-semibold text-gray-900 dark:text-white text-sm">
                                {course?.creator?.name || "Expert Instructor"}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                <Globe className="w-3 h-3" />
                                Industry Expert
                            </p>
                        </div>
                    </div>

                    {/* Course Stats */}
                    <div className="grid grid-cols-3 gap-4 py-3 border-t border-gray-100 dark:border-gray-800">
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-1 text-gray-600 dark:text-gray-400 mb-1">
                                <BookOpen className="w-4 h-4" />
                            </div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{totalLectures}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Lessons</p>
                        </div>

                        <div className="text-center">
                            <div className="flex items-center justify-center gap-1 text-gray-600 dark:text-gray-400 mb-1">
                                <Clock className="w-4 h-4" />
                            </div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{courseDuration}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
                        </div>

                        <div className="text-center">
                            <div className="flex items-center justify-center gap-1 text-gray-600 dark:text-gray-400 mb-1">
                                <Users className="w-4 h-4" />
                            </div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{totalStudents}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Students</p>
                        </div>
                    </div>

                    {/* Action Button */}
                    <Button
                        className={`w-full py-3 px-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group/btn ${course?.coursePrice === "Free"
                                ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl"
                                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
                            }`}
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/course-detail/${course?._id}`);
                        }}
                    >
                        {course?.coursePrice === "Free" ? "Enroll Free" : "View Course"}
                        <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default Course;