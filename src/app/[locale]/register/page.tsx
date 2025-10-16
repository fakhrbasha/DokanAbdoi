'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Eye, EyeOff, Info } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Checkbox } from '../components/ui/checkbox';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../components/ui/tooltip';
import { Progress } from '../components/ui/progress';
import { useToast } from '../hooks/use-toast';
import { Link } from '@/i18n/routing';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [allowHelp, setAllowHelp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const getPasswordStrength = (password: string) => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 6) strength += 30;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return Math.min(strength, 100);
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'كلمة المرور غير متطابقة',
        description: 'يرجى التأكد من تطابق كلمتي المرور.',
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      toast({
        title: 'تم إنشاء الحساب بنجاح',
        description: 'مرحباً بك في متجر عبدالعزيز!',
      });
      router.push('/login');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div dir="rtl" className="min-h-screen flex flex-col bg-gray-50 py-10 px-4">
      <main className="flex-1 container mx-auto px-4">
        {/* ✅ Banner Section */}
        <div className="mb-8">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-3xl font-bold text-amber-700">
              إنشاء حساب جديد
            </CardTitle>
          </CardHeader>
          <Image
            src="/Hero/Banner1.png"
            alt="Banque Misr Banner"
            width={1920}
            height={400}
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* ✅ Registration Card */}
        <div className="max-w-2xl mx-auto">
          <Card className="p-6">
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 🧍 Personal Info */}
                <div>
                  <h2 className="text-lg font-semibold mb-4 text-gray-800">
                    معلومات شخصية
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">الاسم الأول</Label>
                      <Input
                        id="firstName"
                        placeholder="أدخل الاسم الأول"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">الاسم الأخير</Label>
                      <Input
                        id="lastName"
                        placeholder="أدخل الاسم الأخير"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <Label htmlFor="phone">رقم الموبايل</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="أدخل رقم الهاتف"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <Checkbox
                      id="newsletter"
                      checked={newsletter}
                      onCheckedChange={(checked) =>
                        setNewsletter(checked as boolean)
                      }
                    />
                    <Label htmlFor="newsletter">
                      الاشتراك في النشرة الإخبارية
                    </Label>
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="allowHelp"
                      checked={allowHelp}
                      onCheckedChange={(checked) =>
                        setAllowHelp(checked as boolean)
                      }
                    />
                    <Label htmlFor="allowHelp">السماح بالمساعدة عن بُعد</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="w-4 h-4 text-gray-500 cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            يتيح لنا هذا الخيار مساعدتك في الدعم الفني عن بُعد.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>

                {/* 🔐 Login Info */}
                <div>
                  <h2 className="text-lg font-semibold mb-4 text-gray-800">
                    معلومات تسجيل الدخول
                  </h2>

                  <div className="space-y-2 mb-3">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2 mb-3 relative">
                    <Label htmlFor="password">كلمة المرور</Label>
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="أدخل كلمة المرور"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 top-6 hover:bg-transparent focus-visible:ring-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </Button>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm text-gray-600 mb-1">
                      قوة كلمة المرور:{' '}
                      <span className="font-medium">
                        {formData.password
                          ? passwordStrength < 50
                            ? 'ضعيفة'
                            : passwordStrength < 80
                            ? 'متوسطة'
                            : 'قوية'
                          : 'لا توجد كلمة مرور'}
                      </span>
                    </p>
                    <Progress value={passwordStrength} />
                  </div>

                  <div className="space-y-2 relative">
                    <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="أعد إدخال كلمة المرور"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 top-6 hover:bg-transparent focus-visible:ring-0"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* ✅ Buttons */}
                <div className="flex justify-between items-center pt-6">
                  <Link href="/login">
                    <Button variant="outline">رجوع</Button>
                  </Link>
                  <Button
                    type="submit"
                    className="bg-amber-600 hover:bg-amber-700 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? 'جارٍ الإنشاء...' : 'قم بإنشاء حساب'}
                  </Button>
                </div>
              </form>
            </CardContent>

            <CardFooter className="text-center text-sm text-gray-500">
              لديك حساب بالفعل؟{' '}
              <Link
                href="/login"
                className="text-amber-600 hover:underline font-semibold"
              >
                تسجيل الدخول
              </Link>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
