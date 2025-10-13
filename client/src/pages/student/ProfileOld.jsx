import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { Label } from "@/components/ui/label";
import { 
  Loader2, 
  Edit, 
  Mail, 
  User, 
  Shield, 
  BookOpen, 
  Award, 
  Calendar,
  Camera,
  Settings,
  Download,
  Share2,
  Trophy,
  Star,
  Clock
} from "lucide-react";
import { useLoadUserQuery, useUpdateUserMutation } from "@/features/api/authApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const Profile = () => {
    const [name, setName] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("");

    const { data, isLoading, refetch } = useLoadUserQuery();
    const [updateUser, { data: updateUserData, isLoading: updateUserIsLoading, isError, error, isSuccess }] = useUpdateUserMutation();

    const onChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) setProfilePhoto(file)
    }

    const updateUserHandler = async () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("profilePhoto", profilePhoto);
        await updateUser(formData);
    }

    useEffect(() => {
        if (isSuccess) {
            refetch();
            toast.success(updateUserData?.message || "Profile updated successfully!");
        }
        if (isError) {
            toast.error(error?.message || "Failed to update profile.");
        }
    }, [error, updateUserData, isSuccess, isError, refetch]);

    useEffect(() => {
        refetch();
    }, [refetch]);

    if (isLoading) {
        return <ProfileSkeleton />;
    }

    const user = data?.user;
    if (!user) return null;

    // Mock data for enhanced profile
    const profileStats = {
        coursesCompleted: user.enrolledCourses?.length || 0,
        certificatesEarned: Math.floor((user.enrolledCourses?.length || 0) * 0.7),
        studyHours: (user.enrolledCourses?.length || 0) * 15,
        joinDate: new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long' 
        })
    };

    const achievements = [
        { icon: Trophy, title: "Early Adopter", description: "One of our first 1000 users", earned: true },
        { icon: Star, title: "5-Star Learner", description: "Maintained 5-star rating", earned: true },
        { icon: Award, title: "Course Completionist", description: "Completed 5+ courses", earned: user.enrolledCourses?.length >= 5 },
        { icon: Clock, title: "Consistent Learner", description: "30-day learning streak", earned: false }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header Section */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        {/* Profile Picture */}
                        <div className="relative">
                            <Avatar className="h-28 w-28 md:h-32 md:w-32 ring-4 ring-white/20">
                                <AvatarImage
                                    src={user?.photoUrl || "https://github.com/shadcn.png"}
                                    alt={user?.name}
                                />
                                <AvatarFallback className="bg-white/20 text-white text-2xl font-bold">
                                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                </AvatarFallback>
                            </Avatar>
                            <Button
                                size="icon"
                                className="absolute -bottom-2 -right-2 rounded-full bg-white text-gray-900 hover:bg-gray-100 w-8 h-8"
                            >
                                <Camera className="w-4 h-4" />
                            </Button>
                        </div>

                        {/* Profile Info */}
                        <div className="text-center md:text-left flex-1">
                            <h1 className="text-2xl md:text-3xl font-bold mb-2">{user.name}</h1>
                            <div className="flex flex-col md:flex-row gap-4 mb-4">
                                <div className="flex items-center justify-center md:justify-start gap-2">
                                    <Mail className="w-4 h-4" />
                                    <span className="text-blue-100">{user.email}</span>
                                </div>
                                <div className="flex items-center justify-center md:justify-start gap-2">
                                    <Shield className="w-4 h-4" />
                                    <Badge className="bg-white/20 text-white border-white/30">
                                        {user.role.toUpperCase()}
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-center md:justify-start gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span className="text-blue-100">Joined {profileStats.joinDate}</span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30">
                                            <Edit className="w-4 h-4 mr-2" />
                                            Edit Profile
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-md">
                                        <DialogHeader>
                                            <DialogTitle className="flex items-center gap-2">
                                                <Edit className="w-5 h-5" />
                                                Edit Profile
                                            </DialogTitle>
                                            <DialogDescription>
                                                Update your profile information and photo.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="space-y-4 py-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="name" className="text-sm font-medium">Name</Label>
                                                <Input
                                                    id="name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    placeholder={user.name}
                                                    className="w-full"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="photo" className="text-sm font-medium">Profile Photo</Label>
                                                <Input
                                                    id="photo"
                                                    onChange={onChangeHandler}
                                                    type="file"
                                                    accept="image/*"
                                                    className="w-full"
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button 
                                                disabled={updateUserIsLoading} 
                                                onClick={updateUserHandler}
                                                className="w-full"
                                            >
                                                {updateUserIsLoading ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Updating...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Save Changes
                                                    </>
                                                )}
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>

                                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
                                    <Share2 className="w-4 h-4 mr-2" />
                                    Share Profile
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="max-w-4xl mx-auto px-4 -mt-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <Card className="bg-white dark:bg-gray-800 shadow-lg">
                        <CardContent className="p-4 text-center">
                            <div className="flex justify-center mb-2">
                                <BookOpen className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {profileStats.coursesCompleted}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Courses Enrolled
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white dark:bg-gray-800 shadow-lg">
                        <CardContent className="p-4 text-center">
                            <div className="flex justify-center mb-2">
                                <Award className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {profileStats.certificatesEarned}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Certificates
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white dark:bg-gray-800 shadow-lg">
                        <CardContent className="p-4 text-center">
                            <div className="flex justify-center mb-2">
                                <Clock className="w-6 h-6 text-purple-600" />
                            </div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {profileStats.studyHours}h
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Study Hours
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white dark:bg-gray-800 shadow-lg">
                        <CardContent className="p-4 text-center">
                            <div className="flex justify-center mb-2">
                                <Star className="w-6 h-6 text-yellow-600" />
                            </div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                4.9
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Average Rating
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-8">
                    {/* Courses Section */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BookOpen className="w-5 h-5" />
                                    My Courses ({user.enrolledCourses?.length || 0})
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {user.enrolledCourses?.length === 0 ? (
                                    <div className="text-center py-8">
                                        <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                            No courses yet
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                                            Start your learning journey by enrolling in a course
                                        </p>
                                        <Link to="/course/search">
                                            <Button>Browse Courses</Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <Tabs defaultValue="all" className="w-full">
                                        <TabsList className="grid w-full grid-cols-3">
                                            <TabsTrigger value="all">All</TabsTrigger>
                                            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                                            <TabsTrigger value="completed">Completed</TabsTrigger>
                                        </TabsList>
                                        
                                        <TabsContent value="all" className="mt-4">
                                            <div className="grid gap-4">
                                                {user.enrolledCourses.map((course, index) => (
                                                    <CourseCard key={course._id || index} course={course} />
                                                ))}
                                            </div>
                                        </TabsContent>
                                        
                                        <TabsContent value="in-progress" className="mt-4">
                                            <div className="grid gap-4">
                                                {user.enrolledCourses.slice(0, Math.ceil(user.enrolledCourses.length * 0.6)).map((course, index) => (
                                                    <CourseCard key={course._id || index} course={course} />
                                                ))}
                                            </div>
                                        </TabsContent>
                                        
                                        <TabsContent value="completed" className="mt-4">
                                            <div className="grid gap-4">
                                                {user.enrolledCourses.slice(Math.ceil(user.enrolledCourses.length * 0.6)).map((course, index) => (
                                                    <CourseCard key={course._id || index} course={course} />
                                                ))}
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Achievements */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Trophy className="w-5 h-5" />
                                    Achievements
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {achievements.map((achievement, index) => (
                                    <div 
                                        key={index} 
                                        className={`flex items-center gap-3 p-3 rounded-lg ${
                                            achievement.earned 
                                                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                                                : 'bg-gray-50 dark:bg-gray-800 opacity-60'
                                        }`}
                                    >
                                        <div className={`p-2 rounded-full ${
                                            achievement.earned 
                                                ? 'bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-400' 
                                                : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                                        }`}>
                                            <achievement.icon className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-sm">{achievement.title}</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                                {achievement.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Settings className="w-5 h-5" />
                                    Quick Actions
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Button variant="outline" className="w-full justify-start">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download Certificates
                                </Button>
                                <Button variant="outline" className="w-full justify-start">
                                    <Settings className="w-4 h-4 mr-2" />
                                    Account Settings
                                </Button>
                                <Link to="/my-learning" className="block">
                                    <Button variant="outline" className="w-full justify-start">
                                        <BookOpen className="w-4 h-4 mr-2" />
                                        Learning Dashboard
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Course Card Component for Profile
const CourseCard = ({ course }) => {
    const progress = Math.floor(Math.random() * 100);
    
    return (
        <div className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow">
            <img
                src={course?.courseThumbnail}
                alt={course?.courseTitle}
                className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 dark:text-white truncate">
                    {course?.courseTitle}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    by {course?.creator?.name}
                </p>
                <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                        {progress}%
                    </span>
                </div>
            </div>
            <Link to={`/course-progress/${course?._id}`}>
                <Button size="sm">Continue</Button>
            </Link>
        </div>
    );
};

// Profile Skeleton Component
const ProfileSkeleton = () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="bg-gradient-to-br from-blue-600 to-purple-600">
            <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <Skeleton className="h-28 w-28 md:h-32 md:w-32 rounded-full bg-white/20" />
                    <div className="flex-1 space-y-3">
                        <Skeleton className="h-8 w-48 bg-white/20" />
                        <Skeleton className="h-4 w-64 bg-white/20" />
                        <div className="flex gap-2">
                            <Skeleton className="h-8 w-24 bg-white/20" />
                            <Skeleton className="h-8 w-24 bg-white/20" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 -mt-8 pb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[...Array(4)].map((_, i) => (
                    <Card key={i}>
                        <CardContent className="p-4 text-center space-y-2">
                            <Skeleton className="h-6 w-6 mx-auto" />
                            <Skeleton className="h-6 w-8 mx-auto" />
                            <Skeleton className="h-3 w-16 mx-auto" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    </div>
);

export default Profile;