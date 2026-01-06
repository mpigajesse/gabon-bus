'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Bus, Mail, Lock, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate login
    setTimeout(() => {
      setLoading(false);
      toast.success("Connexion réussie !");
      router.push('/');
    }, 1000);
  };

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-16rem)] py-12 px-4 mx-auto max-w-7xl">
      <Card className="w-full max-w-md border-2 shadow-xl overflow-hidden">
        {/* Gabon Flag Accent */}
        <div className="flex w-full h-1.5">
          <div className="flex-1 bg-gabon-green"></div>
          <div className="flex-1 bg-gabon-yellow"></div>
          <div className="flex-1 bg-gabon-blue"></div>
        </div>
        
        <CardHeader className="space-y-2 text-center pt-8">
          <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
            <Bus className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Bon retour !</CardTitle>
          <CardDescription>
            Connectez-vous pour gérer vos réservations GabonBus.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="votre@email.com" 
                  className="pl-10 h-11 rounded-xl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Mot de passe</Label>
                <Button variant="link" className="p-0 h-auto text-xs" type="button">
                  Oublié ?
                </Button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <Input 
                  id="password" 
                  type="password" 
                  className="pl-10 h-11 rounded-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </div>
            <Button type="submit" className="w-full h-11 font-bold rounded-xl" disabled={loading}>
              {loading ? "Connexion..." : "Se connecter"}
              {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 border-t bg-zinc-50/50 dark:bg-zinc-900/50 p-6">
          <p className="text-center text-sm text-zinc-500">
            Vous n'avez pas de compte ?{" "}
            <Link href="/register" className="font-semibold text-primary hover:underline">
              S'inscrire gratuitement
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
