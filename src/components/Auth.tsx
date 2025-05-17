import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { ArrowRight, Github, Mail } from 'lucide-react';

interface AuthProps {
  view: 'sign-in' | 'sign-up';
  onSuccess?: () => void;
}

export const AuthDialog: React.FC<React.PropsWithChildren<{ view: 'sign-in' | 'sign-up' }>> = ({ 
  children, 
  view 
}) => {
  const [open, setOpen] = useState(false);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden border-0 rounded-2xl">
        <AuthForm 
          view={view} 
          onSuccess={() => setOpen(false)} 
        />
      </DialogContent>
    </Dialog>
  );
};

export const AuthForm: React.FC<AuthProps> = ({ view, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading('email');
    setError(null);

    try {
      if (view === 'sign-up') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        
        if (error) throw error;
        
        toast.success('Check your email for the confirmation link!');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        toast.success('Successfully signed in!');
      }
      
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication');
      toast.error(err.message || 'An error occurred during authentication');
    } finally {
      setLoading(null);
    }
  };

  const handleOAuthSignIn = async (provider: 'google' | 'github') => {
    setLoading(provider);
    setError(null);
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) throw error;
    } catch (err: any) {
      setError(err.message || `Failed to sign in with ${provider}`);
      toast.error(err.message || `Failed to sign in with ${provider}`);
      setLoading(null);
    }
  };

  return (
    <Card className="w-full border-0">
      <CardHeader className="bg-gradient-to-r from-gray-700 to-zinc-900 text-white">
        <CardTitle className="text-center text-xl">
          {view === 'sign-up' ? 'Create an account' : 'Sign in to Pebble'}
        </CardTitle>
        <CardDescription className="text-gray-300 text-center">
          {view === 'sign-up' 
            ? 'Join the Pebble community today' 
            : 'Welcome back to Pebble'
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <Button 
            variant="outline" 
            className="flex items-center justify-center relative h-12 border border-gray-300"
            style={{ borderRadius: '1440px' }}
            onClick={() => handleOAuthSignIn('google')}
            disabled={!!loading}
          >
            {loading === 'google' ? (
              'Loading...'
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </>
            )}
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center justify-center relative h-12 border border-gray-300"
            style={{ borderRadius: '1440px' }}
            onClick={() => handleOAuthSignIn('github')}
            disabled={!!loading}
          >
            {loading === 'github' ? (
              'Loading...'
            ) : (
              <>
                <Github className="w-5 h-5 mr-2" />
                Continue with GitHub
              </>
            )}
          </Button>
        </div>
        
        <div className="flex items-center gap-4">
          <Separator className="flex-grow" />
          <span className="text-xs text-gray-500">OR</span>
          <Separator className="flex-grow" />
        </div>
        
        <form onSubmit={handleEmailAuth} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-medium">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
              className="h-12 rounded-lg border-gray-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="font-medium">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              className="h-12 rounded-lg border-gray-300"
            />
          </div>
          {error && (
            <div className="text-sm text-red-500 mt-2">
              {error}
            </div>
          )}
          <Button 
            type="submit" 
            className="w-full h-12 mt-2 bg-gradient-to-r from-gray-700 to-zinc-900 text-white flex items-center justify-center gap-2 group"
            style={{ borderRadius: '1440px' }}
            disabled={!!loading}
          >
            {loading === 'email' ? (
              'Loading...'
            ) : (
              <>
                <Mail className="w-5 h-5" />
                {view === 'sign-up' ? 'Sign up with Email' : 'Sign in with Email'}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center p-4 bg-gray-50">
        <p className="text-sm text-gray-600">
          {view === 'sign-up' 
            ? 'Already have an account? ' 
            : 'Don\'t have an account? '
          }
          <a 
            href="#" 
            className="text-gray-900 font-medium hover:underline"
            onClick={(e) => {
              e.preventDefault();
              if (onSuccess) onSuccess();
              // Here you would typically navigate to the opposite view
            }}
          >
            {view === 'sign-up' ? 'Sign in' : 'Sign up'}
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};
