'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Label } from '@radix-ui/react-label';
import { Input } from '../components/ui/input';
import { Link } from '@/i18n/routing';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (email && password) {
        toast({
          title: 'تم تسجيل الدخول بنجاح',
          description: 'مرحبًا بك مجددًا!',
        });
        router.push('/');
      } else {
        toast({
          title: 'فشل تسجيل الدخول',
          description: 'من فضلك تأكد من إدخال بيانات صحيحة',
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 pt-10">
        تسجيل دخول العميل
      </h1>

      {/* ✅ Banner ثابت */}
      <div className="w-full">
        <Image
          src="/Hero/Banner1.png"
          alt="Banque Misr Banner"
          width={1920}
          height={400}
          className="w-full h-auto"
        />
      </div>

      {/* ✅ Main content */}
      <main className="flex-1 containeres mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-center text-gray-800">
                يمكنك تسجيل الدخول بالطرق التالية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">كلمة السر</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="أدخل كلمة السر"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <Link href="#" className="  hover:underline text-amber-700">
                    نسيت كلمة السر؟
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700"
                  disabled={isLoading}
                >
                  {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="bg-transparent border-none shadow-none flex flex-col justify-baseline items-start text-center">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold whitespace-nowrap">
                عملاء جدد
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600  whitespace-now mb-6">
                إنشاء حساب له فوائد عديدة: تحقق بشكل أسرع، واحتفظ بعناوين أكثر،
                وتتبع الطلبات والمزيد.
              </p>
              <Link href="/register">
                <Button className="text-lg bg-amber-600 hover:bg-amber-700">
                  قم بإنشاء حساب
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
