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
    BookOpen,
    Heart,
    TrendingUp,
    Award,
    ChevronRight
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Course = ({ course, featured = false }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);

    const totalLectures = course?.lectures?.length || 0;
    const totalStudents = course?.enrolledStudents?.length || 0;
    const courseRating = (4.6 + Math.random() * 0.8).toFixed(1);
    const totalReviews = Math.floor(Math.random() * 2000) + 100;
    const isPopular = totalStudents > 50;
    const isBestseller = parseFloat(courseRating) > 4.7;

    return (
        <div className="group relative">
            <Card className="overflow-hidden rounded-xl bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-0 ring-1 ring-gray-200 dark:ring-gray-700 hover:ring-2 hover:ring-blue-500/20 w-full max-w-[280px] mx-auto">
                <div className="relative overflow-hidden">
                    <div className="aspect-[16/10] relative">
                        <img
                            src={course?.courseThumbnail}
                            alt={course?.courseTitle}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />

                        {/* Play Button - Simplified */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <div className="bg-white/90 rounded-full p-3 shadow-lg">
                                <Play className="w-6 h-6 text-blue-600 fill-current" />
                            </div>
                        </div>
                    </div>

                    {/* Top Badge */}
                    <div className="absolute top-2 left-2">
                        {isBestseller && (
                            <Badge className="bg-orange-500 text-white border-0 font-bold text-xs px-2 py-0.5 shadow-sm rounded-md">
                                Bestseller
                            </Badge>
                        )}
                        {isPopular && !isBestseller && (
                            <Badge className="bg-pink-500 text-white border-0 font-bold text-xs px-2 py-0.5 shadow-sm rounded-md">
                                Popular
                            </Badge>
                        )}
                        {featured && (
                            <Badge className="bg-yellow-500 text-white border-0 font-bold text-xs px-2 py-0.5 shadow-sm rounded-md">
                                Featured
                            </Badge>
                        )}
                    </div>

                    {/* Wishlist Button */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setIsWishlisted(!isWishlisted);
                        }}
                        className={`absolute top-2 right-2 p-1.5 rounded-full transition-all duration-200 ${isWishlisted
                                ? 'bg-red-500 text-white shadow-sm'
                                : 'bg-white/80 text-gray-600 hover:bg-white shadow-sm'
                            }`}
                    >
                        <Heart className={`w-3 h-3 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>
                </div>

                <CardContent className="p-3 space-y-2">
                    {/* Course Title */}
                    <h3 className="font-bold text-base text-gray-900 dark:text-white leading-tight line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {course?.courseTitle}
                    </h3>

                    {/* Instructor & Category */}
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                            {course?.creator?.name || "Expert Instructor"}
                        </p>
                        <Badge variant="outline" className="text-xs font-medium text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-md">
                            {course?.category}
                        </Badge>
                    </div>

                    {/* Course Stats */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            <span>{totalLectures}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{Math.floor(totalLectures * 0.75)}h</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span>{courseRating}</span>
                        </div>
                    </div>

                    {/* Price & Action */}
                    <div className="flex items-center justify-between pt-2">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                            {course?.coursePrice === "Free" ? "FREE" : `₹${course?.coursePrice}`}
                        </div>
                        <Link to={`/course-detail/${course?._id}`}>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-xs transition-all duration-200">
                                {course?.coursePrice === "Free" ? "Enroll" : "View"}
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
export default Course;
