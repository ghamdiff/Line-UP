import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Login() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const { t, language, toggleLanguage } = useLanguage();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      login(formData.email, formData.password);
      setLocation("/");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ 
      backgroundImage: "url('https://i.ibb.co/ns8bZqp4/image-2.png')",
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }}>
      <Card className="w-full max-w-md bg-transparent dark:bg-transparent border-transparent dark:border-transparent">
        <CardHeader className="text-center">
          {/* Logo Image */}
          <div className="mb-0 flex justify-center">
            <img
              src="https://i.ibb.co/RpTdXMrk/bd9cd335-452e-45bc-b61a-3dfd063ea85a-2.png"
              alt="Logo"
              className="w-64 h-64 rounded-xl"
            />
          </div>

          {/* Language Toggle */}
          <div className="absolute top-4 left-4">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
            >
              <Globe className="w-4 h-4 mr-1" />
              {language === "ar" ? "EN" : "عر"}
            </Button>
          </div>

          <p className="text-gray-600 dark:text-gray-400">
            
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-gray-100 font-bold dark:text-gray-100"
              >
                {t("emailOrPhone")}
              </Label>
              <Input
                id="email"
                name="email"
                type="text"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-black dark:text-white"
                placeholder="example@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-gray-100 font-bold dark:text-gray-100"
              >
                {t("password")}
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-black dark:text-white"
                placeholder="••••••••"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white"
            >
              {t("login")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}