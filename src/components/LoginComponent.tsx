import React, { useState } from 'react';
import { 
  Box, TextField, Button, Typography, Paper, 
  InputAdornment, IconButton, Alert, CircularProgress,
  Container
} from '@mui/material';
import { Person, Lock, Visibility, VisibilityOff, Grass } from '@mui/icons-material';
import { LoginCredentials } from '../types/types';

interface LoginComponentProps {
  onLogin: (credentials: LoginCredentials) => void;
  loading: boolean;
  error: string | null;
}

const LoginComponent: React.FC<LoginComponentProps> = ({ onLogin, loading, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(credentials);
  };

  return (
    <Container maxWidth="sm">
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          mt: { xs: 4, md: 8 } // Higher margin on desktop
        }}
      >
        {/* Branding */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Box sx={{ 
            bgcolor: '#18774c', width: 64, height: 64, borderRadius: 3, 
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            mb: 2, boxShadow: '0 8px 16px rgba(24, 119, 76, 0.15)' 
          }}>
            <Grass sx={{ color: '#fff', fontSize: 32 }} />
          </Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 800, color: '#1a1a1a', letterSpacing: -0.5 }}>
            Zvipfuyo
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Smart Livestock Platform
          </Typography>
        </Box>

        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 3, sm: 6 }, // More padding on larger screens
            width: '100%',
            borderRadius: 4, 
            border: '1px solid #eef2f0',
            bgcolor: '#ffffff',
            boxShadow: '0 20px 40px rgba(0,0,0,0.04)'
          }}
        >
          <form onSubmit={handleSubmit}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: '#333' }}>
              Sign In
            </Typography>

            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              margin="normal"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: '#18774c' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              margin="normal"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: '#18774c' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 }, mb: 3 }}
            />

            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              size="large"
              sx={{ 
                py: 1.8, 
                borderRadius: 2, 
                bgcolor: '#18774c', 
                '&:hover': { bgcolor: '#145d3c' },
                textTransform: 'none', 
                fontSize: '1rem', 
                fontWeight: 700,
                boxShadow: '0 4px 12px rgba(24, 119, 76, 0.2)'
              }}
            >
              {loading ? <CircularProgress size={26} color="inherit" /> : 'Enter Platform'}
            </Button>
          </form>
        </Paper>

        <Typography variant="body2" sx={{ mt: 4, color: '#adb5bd' }}>
          &copy; 2026 Zvipfuyo Innovations. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginComponent;