import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Play,
  BookOpen,
  Users,
  Award,
  ChevronRight,
  Globe,
  Target,
  Zap,
  CheckCircle2,
  Star
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { data: coursesData } = useGetPublishedCourseQuery();

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`)
    }
    setSearchQuery("");
  }

  // Real stats from your backend data
  const totalCourses = coursesData?.courses?.length || 0;
  const totalInstructors = new Set(coursesData?.courses?.map(course => course.creator?._id)).size || 0;
  const totalStudents = coursesData?.courses?.reduce((acc, course) => acc + (course.enrolledStudents?.length || 0), 0) || 0;

  const features = [
    {
      icon: Globe,
      title: "Learn Anywhere",
      description: "Access courses from any device, anywhere in the world"
    },
    {
      icon: Target,
      title: "Expert Instructors",
      description: "Learn from industry professionals and subject matter experts"
    },
    {
      icon: Zap,
      title: "Hands-on Projects",
      description: "Build real-world projects to strengthen your portfolio"
    }
  ];

  const achievements = [
    "Lifetime Access",
    "Certificate of Completion",
    "Mobile & Desktop",
    "Community Support"
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
        <div className="absolute -bottom-8 left-20 w-80 h-80 bg-pink-500/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Content */}
        <div className="pt-20 pb-16 text-center lg:pt-32">
          {/* Badge */}
          <div className="mb-8 flex justify-center">
            <Badge className="bg-blue-500/10 text-blue-300 border-blue-500/20 px-4 py-2 text-sm font-medium animate-fade-in">
              🚀 Transform Your Career with Expert-Led Courses
            </Badge>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight animate-slide-up">
            Learn Without
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              Limits
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up delay-100">
            Master in-demand skills with {totalCourses}+ courses from {totalInstructors}+ expert instructors.
            Join {totalStudents > 0 ? `${totalStudents}+` : '10,000+'} students already transforming their careers.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12 animate-slide-up delay-200">
            <form onSubmit={searchHandler} className="relative group">
              <div className="relative flex items-center bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden transition-all duration-300 group-hover:bg-white/15 group-hover:border-white/30">
                <div className="pl-6 pr-4">
                  <Search className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
                </div>
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What would you like to learn today?"
                  className="flex-grow border-none focus-visible:ring-0 py-6 text-white placeholder-slate-400 bg-transparent text-lg font-medium"
                />
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 m-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Search Courses
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </form>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-slide-up delay-300">
            <Button
              onClick={() => navigate(`/course/search?query=`)}
              size="lg"
              className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
            >
              <BookOpen className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Explore All Courses
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>

            <Button
              onClick={() => navigate(`/course/search?query=popular`)}
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 group"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </div>

          {/* Achievement Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-16 animate-slide-up delay-400">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm text-white font-medium hover:bg-white/20 transition-all duration-300 cursor-default"
              >
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                {achievement}
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="pb-20">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group animate-slide-up"
                style={{ animationDelay: `${500 + index * 100}ms` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-slide-up delay-700">
            <div className="text-center group">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-8 h-8 text-blue-400" />
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{totalCourses}+</div>
              <div className="text-slate-400 font-medium">Expert Courses</div>
            </div>

            <div className="text-center group">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-green-400" />
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{totalStudents > 0 ? `${totalStudents}+` : '10K+'}</div>
              <div className="text-slate-400 font-medium">Happy Students</div>
            </div>

            <div className="text-center group">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-8 h-8 text-purple-400" />
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{totalInstructors}+</div>
              <div className="text-slate-400 font-medium">Expert Instructors</div>
            </div>

            <div className="text-center group">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500/20 to-orange-600/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-8 h-8 text-yellow-400" />
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">4.9</div>
              <div className="text-slate-400 font-medium">Average Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent"></div>
    </div>
  );
};

export default HeroSection;
