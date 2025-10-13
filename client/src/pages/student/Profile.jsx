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
    Clock,
    MapPin,
    Link as LinkIcon,
    Github,
    Linkedin,
    Globe,
    TrendingUp,
    Target,
    CheckCircle,
    Play
} from "lucide-react";
import { useLoadUserQuery, useUpdateUserMutation } from "@/features/api/authApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
    const [name, setName] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("");
    const navigate = useNavigate();

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

    // Enhanced profile stats
    const profileStats = {
        coursesEnrolled: user.enrolledCourses?.length || 0,
        coursesCompleted: Math.floor((user.enrolledCourses?.length || 0) * 0.7),
        certificatesEarned: Math.floor((user.enrolledCourses?.length || 0) * 0.6),
        studyHours: (user.enrolledCourses?.length || 0) * 15,
        currentStreak: 12,
        totalPoints: (user.enrolledCourses?.length || 0) * 150,
        joinDate: new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
        })
    };

    const achievements = [
        {
            icon: Trophy,
            title: "Early Adopter",
            description: "Joined Infinity Courses",
            earned: true,
            color: "from-yellow-400 to-orange-500"
        },
        {
            icon: Star,
            title: "5-Star Learner",
            description: "Excellent course ratings",
            earned: true,
            color: "from-blue-400 to-purple-500"
        },
        {
            icon: Award,
            title: "Course Master",
            description: "Completed 5+ courses",
            earned: user.enrolledCourses?.length >= 5,
            color: "from-green-400 to-emerald-500"
        },
        {
            icon: Target,
            title: "Goal Crusher",
            description: "Met learning goals",
            earned: true,
            color: "from-red-400 to-pink-500"
        },
        {
            icon: Clock,
            title: "Consistency King",
            description: "30-day learning streak",
            earned: false,
            color: "from-indigo-400 to-purple-500"
        },
        {
            icon: TrendingUp,
            title: "Rising Star",
            description: "Top 10% this month",
            earned: false,
            color: "from-cyan-400 to-blue-500"
        }
    ];

    const recentActivity = [
        { action: "Completed", course: "React Advanced Patterns", time: "2 hours ago", type: "completion" },
        { action: "Started", course: "Node.js Masterclass", time: "1 day ago", type: "start" },
        { action: "Earned Certificate", course: "JavaScript Fundamentals", time: "3 days ago", type: "certificate" },
        { action: "Quiz Passed", course: "Python for Beginners", time: "5 days ago", type: "quiz" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Premium Header Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

                {/* Floating Elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-float"></div>
                <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-float delay-300"></div>

                <div className="relative max-w-6xl mx-auto px-4 py-16">
                    <div className="flex flex-col lg:flex-row items-center gap-8 animate-fade-in-up">
                        {/* Profile Picture & Basic Info */}
                        <div className="text-center lg:text-left">
                            <div className="relative inline-block">
                                <Avatar className="h-32 w-32 lg:h-40 lg:w-40 ring-4 ring-white/20 shadow-2xl">
                                    <AvatarImage
                                        src={user?.photoUrl || "https://github.com/shadcn.png"}
                                        alt={user?.name}
                                    />
                                    <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-600 to-purple-600">
                                        {user?.name?.charAt(0)?.toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
                                    <CheckCircle className="w-4 h-4 text-white" />
                                </div>
                            </div>

                            <h1 className="text-4xl lg:text-5xl font-bold text-white mt-6 mb-2">
                                {user?.name}
                            </h1>
                            <p className="text-blue-200 text-lg mb-4">
                                {user?.role === 'instructor' ? '🎓 Course Instructor' : '📚 Passionate Learner'}
                            </p>
                            <div className="flex flex-wrap justify-center lg:justify-start gap-2 text-sm text-blue-100">
                                <span className="flex items-center gap-1">
                                    <Mail className="w-4 h-4" />
                                    {user?.email}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    Member since {profileStats.joinDate}
                                </span>
                            </div>
                        </div>

                        {/* Quick Stats Cards */}
                        <div className="flex-1 w-full lg:w-auto">
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20">
                                    <div className="text-3xl font-bold text-white">{profileStats.coursesEnrolled}</div>
                                    <div className="text-blue-200 text-sm">Courses Enrolled</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20">
                                    <div className="text-3xl font-bold text-white">{profileStats.coursesCompleted}</div>
                                    <div className="text-blue-200 text-sm">Completed</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20">
                                    <div className="text-3xl font-bold text-white">{profileStats.certificatesEarned}</div>
                                    <div className="text-blue-200 text-sm">Certificates</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20">
                                    <div className="text-3xl font-bold text-white">{profileStats.studyHours}h</div>
                                    <div className="text-blue-200 text-sm">Study Hours</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20">
                                    <div className="text-3xl font-bold text-white">{profileStats.currentStreak} 🔥</div>
                                    <div className="text-blue-200 text-sm">Day Streak</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20">
                                    <div className="text-3xl font-bold text-white">{profileStats.totalPoints}</div>
                                    <div className="text-blue-200 text-sm">XP Points</div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-3">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 px-6 py-3 rounded-xl">
                                        <Edit className="w-4 h-4 mr-2" />
                                        Edit Profile
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle>Edit Profile</DialogTitle>
                                        <DialogDescription>
                                            Update your profile information here.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="name">Name</Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder={user?.name}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="profilePhoto">Profile Photo</Label>
                                            <Input
                                                id="profilePhoto"
                                                type="file"
                                                onChange={onChangeHandler}
                                                accept="image/*"
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button
                                            onClick={updateUserHandler}
                                            disabled={updateUserIsLoading}
                                            className="w-full"
                                        >
                                            {updateUserIsLoading ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Updating...
                                                </>
                                            ) : (
                                                "Update Profile"
                                            )}
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>

                            <Button
                                onClick={() => navigate('/my-learning')}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl animate-glow"
                            >
                                <BookOpen className="w-4 h-4 mr-2" />
                                My Learning
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 -mt-8 pb-8">
                <Tabs defaultValue="overview" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4 bg-white shadow-lg rounded-2xl p-1">
                        <TabsTrigger value="overview" className="rounded-xl">Overview</TabsTrigger>
                        <TabsTrigger value="achievements" className="rounded-xl">Achievements</TabsTrigger>
                        <TabsTrigger value="activity" className="rounded-xl">Activity</TabsTrigger>
                        <TabsTrigger value="settings" className="rounded-xl">Settings</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6 animate-fade-in-up">
                        {/* Learning Progress */}
                        <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
                            <CardHeader>
                                <CardTitle className="text-2xl flex items-center gap-2">
                                    <TrendingUp className="w-6 h-6 text-blue-600" />
                                    Learning Progress
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span>Overall Progress</span>
                                                <span className="font-semibold">
                                                    {Math.round((profileStats.coursesCompleted / profileStats.coursesEnrolled) * 100) || 0}%
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-3">
                                                <div
                                                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-700"
                                                    style={{ width: `${Math.round((profileStats.coursesCompleted / profileStats.coursesEnrolled) * 100) || 0}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 text-center">
                                            <div className="p-3 bg-blue-50 rounded-lg">
                                                <div className="text-2xl font-bold text-blue-600">{profileStats.coursesCompleted}</div>
                                                <div className="text-sm text-gray-600">Completed</div>
                                            </div>
                                            <div className="p-3 bg-orange-50 rounded-lg">
                                                <div className="text-2xl font-bold text-orange-600">{profileStats.coursesEnrolled - profileStats.coursesCompleted}</div>
                                                <div className="text-sm text-gray-600">In Progress</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-4">
                                                <Trophy className="w-16 h-16 text-blue-600" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-800">Keep Learning!</h3>
                                            <p className="text-gray-600">You're doing great</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
                            <CardHeader>
                                <CardTitle className="text-xl">Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <Button
                                        onClick={() => navigate('/course/search')}
                                        variant="outline"
                                        className="h-20 flex-col gap-2 hover:shadow-lg transition-all"
                                    >
                                        <BookOpen className="w-6 h-6" />
                                        <span className="text-xs">Find Courses</span>
                                    </Button>
                                    <Button
                                        onClick={() => navigate('/my-learning')}
                                        variant="outline"
                                        className="h-20 flex-col gap-2 hover:shadow-lg transition-all"
                                    >
                                        <Play className="w-6 h-6" />
                                        <span className="text-xs">Continue Learning</span>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="h-20 flex-col gap-2 hover:shadow-lg transition-all"
                                    >
                                        <Download className="w-6 h-6" />
                                        <span className="text-xs">Download App</span>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="h-20 flex-col gap-2 hover:shadow-lg transition-all"
                                    >
                                        <Share2 className="w-6 h-6" />
                                        <span className="text-xs">Share Profile</span>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="achievements" className="space-y-6 animate-fade-in-up">
                        <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
                            <CardHeader>
                                <CardTitle className="text-2xl flex items-center gap-2">
                                    <Award className="w-6 h-6 text-yellow-600" />
                                    Achievements & Badges
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {achievements.map((achievement, index) => (
                                        <div
                                            key={index}
                                            className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg ${achievement.earned
                                                    ? 'bg-gradient-to-br from-white to-gray-50 border-gray-200 shadow-md'
                                                    : 'bg-gray-50 border-gray-100 opacity-60'
                                                }`}
                                        >
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${achievement.earned
                                                    ? `bg-gradient-to-r ${achievement.color}`
                                                    : 'bg-gray-200'
                                                }`}>
                                                <achievement.icon className={`w-6 h-6 ${achievement.earned ? 'text-white' : 'text-gray-400'
                                                    }`} />
                                            </div>
                                            <h3 className="font-bold text-gray-800 mb-2">{achievement.title}</h3>
                                            <p className="text-sm text-gray-600">{achievement.description}</p>
                                            {achievement.earned && (
                                                <Badge className="mt-3 bg-green-100 text-green-800 hover:bg-green-100">
                                                    Earned
                                                </Badge>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="activity" className="space-y-6 animate-fade-in-up">
                        <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
                            <CardHeader>
                                <CardTitle className="text-2xl flex items-center gap-2">
                                    <Clock className="w-6 h-6 text-purple-600" />
                                    Recent Activity
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recentActivity.map((activity, index) => (
                                        <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.type === 'completion' ? 'bg-green-100' :
                                                    activity.type === 'certificate' ? 'bg-yellow-100' :
                                                        activity.type === 'start' ? 'bg-blue-100' : 'bg-purple-100'
                                                }`}>
                                                {activity.type === 'completion' && <CheckCircle className="w-5 h-5 text-green-600" />}
                                                {activity.type === 'certificate' && <Award className="w-5 h-5 text-yellow-600" />}
                                                {activity.type === 'start' && <Play className="w-5 h-5 text-blue-600" />}
                                                {activity.type === 'quiz' && <Target className="w-5 h-5 text-purple-600" />}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-800">
                                                    {activity.action} <span className="text-blue-600">{activity.course}</span>
                                                </p>
                                                <p className="text-sm text-gray-500">{activity.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="settings" className="space-y-6 animate-fade-in-up">
                        <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
                            <CardHeader>
                                <CardTitle className="text-2xl flex items-center gap-2">
                                    <Settings className="w-6 h-6 text-gray-600" />
                                    Account Settings
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                                        <div className="space-y-3">
                                            <div>
                                                <Label className="text-sm font-medium">Full Name</Label>
                                                <Input value={user?.name} disabled className="mt-1" />
                                            </div>
                                            <div>
                                                <Label className="text-sm font-medium">Email Address</Label>
                                                <Input value={user?.email} disabled className="mt-1" />
                                            </div>
                                            <div>
                                                <Label className="text-sm font-medium">Account Type</Label>
                                                <Input value={user?.role || 'Student'} disabled className="mt-1" />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">Preferences</h3>
                                        <div className="space-y-4">
                                            <Button variant="outline" className="w-full justify-start">
                                                <Mail className="w-4 h-4 mr-2" />
                                                Email Notifications
                                            </Button>
                                            <Button variant="outline" className="w-full justify-start">
                                                <Shield className="w-4 h-4 mr-2" />
                                                Privacy Settings
                                            </Button>
                                            <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                                                <User className="w-4 h-4 mr-2" />
                                                Delete Account
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default Profile;

const ProfileSkeleton = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
                <div className="max-w-6xl mx-auto px-4 py-16">
                    <div className="flex flex-col lg:flex-row items-center gap-8">
                        <div className="text-center lg:text-left">
                            <Skeleton className="h-32 w-32 lg:h-40 lg:w-40 rounded-full" />
                            <Skeleton className="h-8 w-48 mt-6 mb-2" />
                            <Skeleton className="h-4 w-32 mb-4" />
                            <Skeleton className="h-4 w-64" />
                        </div>
                        <div className="flex-1 w-full lg:w-auto">
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <Skeleton key={i} className="h-20 rounded-2xl" />
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Skeleton className="h-12 w-32" />
                            <Skeleton className="h-12 w-32" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};