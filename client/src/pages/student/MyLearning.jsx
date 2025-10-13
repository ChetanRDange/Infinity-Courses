import { useLoadUserQuery } from "@/features/api/authApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Play,
  Clock,
  Award,
  TrendingUp,
  Calendar,
  Search,
  Filter,
  MoreVertical,
  Download
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Course from "./Course";

const MyLearning = () => {
  const { data, isLoading } = useLoadUserQuery();
  const navigate = useNavigate();
  const myLearning = data?.user?.enrolledCourses || [];

  // Mock data for enhanced dashboard
  const learningStats = {
    totalCourses: myLearning.length,
    completedCourses: Math.floor(myLearning.length * 0.6),
    inProgressCourses: Math.floor(myLearning.length * 0.4),
    totalHours: myLearning.length * 12, // Assuming 12 hours per course average
    certificates: Math.floor(myLearning.length * 0.6),
  };

  const recentActivity = [
    { course: "React Fundamentals", action: "Completed Chapter 5", time: "2 hours ago" },
    { course: "Node.js Backend", action: "Started new lesson", time: "1 day ago" },
    { course: "Python Basics", action: "Quiz completed", time: "3 days ago" },
  ];

  if (isLoading) {
    return <MyLearningSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-950 dark:to-slate-900">
      {/* Premium Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

        {/* Animated Background Elements */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold mb-2">My Learning Dashboard</h1>
              <p className="text-blue-100 text-lg">
                Track your progress and continue your learning journey
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => navigate('/course/search')}
                className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30"
              >
                <Search className="w-4 h-4 mr-2" />
                Find New Courses
              </Button>
              <Button
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
              >
                <Download className="w-4 h-4 mr-2" />
                Download App
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-6 md:-mt-8 pb-8">
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card className="bg-white dark:bg-gray-800 shadow-xl border-0 hover:shadow-2xl transition-all duration-300 course-card-hover animate-fade-in-up">
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                  <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {learningStats.totalCourses}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Enrolled Courses
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 shadow-xl border-0 hover:shadow-2xl transition-all duration-300 course-card-hover animate-fade-in-up delay-100">
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                  <Award className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {learningStats.completedCourses}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Completed
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 shadow-xl border-0 hover:shadow-2xl transition-all duration-300 course-card-hover animate-fade-in-up delay-200">
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-full">
                  <Play className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {learningStats.inProgressCourses}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                In Progress
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 shadow-xl border-0 hover:shadow-2xl transition-all duration-300 course-card-hover animate-fade-in-up delay-300">
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                  <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {learningStats.totalHours}h
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Total Hours
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 shadow-xl border-0 hover:shadow-2xl transition-all duration-300 course-card-hover animate-fade-in-up delay-500">
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                  <TrendingUp className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {learningStats.certificates}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Certificates
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="flex justify-center mb-2">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {learningStats.completedCourses}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Completed
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="flex justify-center mb-2">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {learningStats.inProgressCourses}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                In Progress
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="flex justify-center mb-2">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {learningStats.totalHours}h
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Hours
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="flex justify-center mb-2">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {learningStats.certificates}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Certificates
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Courses Section */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="all" className="w-full">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <TabsList className="w-full md:w-auto grid grid-cols-3 mb-4 md:mb-0">
                  <TabsTrigger value="all">All Courses</TabsTrigger>
                  <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
              </div>

              <TabsContent value="all" className="space-y-4">
                {myLearning.length === 0 ? (
                  <EmptyState />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {myLearning.map((course, index) => (
                      <EnhancedCourseCard key={index} course={course} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="in-progress" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {myLearning.slice(0, Math.ceil(myLearning.length * 0.6)).map((course, index) => (
                    <EnhancedCourseCard key={index} course={course} isInProgress />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {myLearning.slice(Math.ceil(myLearning.length * 0.6)).map((course, index) => (
                    <EnhancedCourseCard key={index} course={course} isCompleted />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.course}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Learning Streak */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Learning Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">7</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Days in a row!
                  </p>
                  <Progress value={70} className="mb-2" />
                  <p className="text-xs text-gray-500">
                    3 more days to beat your record
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLearning;

// Enhanced Course Card Component
const EnhancedCourseCard = ({ course, isInProgress = false, isCompleted = false }) => {
  const progress = isCompleted ? 100 : isInProgress ? Math.floor(Math.random() * 80) + 20 : Math.floor(Math.random() * 40) + 10;

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
      <div className="relative">
        <img
          src={course?.courseThumbnail}
          alt={course?.courseTitle}
          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <Button size="icon" variant="ghost" className="w-8 h-8 bg-white/80 hover:bg-white">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
        {isCompleted && (
          <Badge className="absolute top-2 left-2 bg-green-600 text-white">
            <Award className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        )}
        {isInProgress && (
          <Badge className="absolute top-2 left-2 bg-blue-600 text-white">
            <Play className="w-3 h-3 mr-1" />
            In Progress
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {course?.courseTitle}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            by {course?.creator?.name}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="flex items-center justify-between">
          <Link to={`/course-progress/${course?._id}`}>
            <Button size="sm" className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              Continue
            </Button>
          </Link>
          <Button variant="ghost" size="sm">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Empty State Component
const EmptyState = () => {
  const navigate = useNavigate();

  return (
    <Card className="p-8 text-center">
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
            <BookOpen className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Start Your Learning Journey
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
            You haven&apos;t enrolled in any courses yet. Explore our wide range of courses and start learning today!
          </p>
          <Button onClick={() => navigate('/course/search')} className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            Browse Courses
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Skeleton component for loading state
const MyLearningSkeleton = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div className="bg-gradient-to-br from-blue-600 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <Skeleton className="h-8 w-64 mb-2 bg-white/20" />
        <Skeleton className="h-4 w-96 bg-white/20" />
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 -mt-6 md:-mt-8 pb-8">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {[...Array(5)].map((_, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <Skeleton className="h-6 w-6 mx-auto mb-2" />
              <Skeleton className="h-6 w-8 mx-auto mb-1" />
              <Skeleton className="h-3 w-16 mx-auto" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, index) => (
          <Card key={index}>
            <Skeleton className="h-32 w-full" />
            <CardContent className="p-4 space-y-3">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-2 w-full" />
              <div className="flex justify-between">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-8" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </div>
);
