import React, { useState, useContext } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
  Typography,
  Stack,
  Card as MuiCard,
} from '@mui/material'
import { styled, keyframes } from '@mui/material/styles'
import AppTheme from '../shared-theme/AppTheme'
import ColorModeSelect from '../shared-theme/ColorModeSelect'
import { GoogleIcon, FacebookIcon, SitemarkIcon } from '../components/CustomIcons'

// gradient animasyonu
const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`
const AnimatedBackground = styled('div')({
  minHeight: '100vh',
  background:
    'linear-gradient(-45deg, #00c6ff 0%, #0072ff 33%, #0047ab 66%, #001f54 100%)',
  backgroundSize: '400% 400%',
  animation: `${gradientShift} 20s ease infinite`,
})
const Card = styled(MuiCard)(({ theme }) => ({
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: { maxWidth: 450 },
  boxShadow:
    'hsla(220,30%,5%,0.05) 0 5px 15px, hsla(220,25%,10%,0.05) 0 15px 35px -5px',
}))
const SignInContainer = styled(Stack)(({ theme }) => ({
  position: 'relative',
  height: '100vh',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: { padding: theme.spacing(4) },
  '&::before': { content: '""', position: 'absolute', inset: 0 },
  overflow: 'visible',
}))

export default function SignIn(props) {
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [submitError, setSubmitError] = useState('')

  const validateInputs = () => {
    let valid = true
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address.')
      valid = false
    } else {
      setEmailError('')
    }
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.')
      valid = false
    } else {
      setPasswordError('')
    }
    return valid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')
    if (!validateInputs()) return

    const result = await login(email, password)
    if (result.success) {
      navigate('/')
    } else {
      setSubmitError(result.message || 'Login failed. Please try again.')
    }
  }

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: 16, right: 16 }} />

      <AnimatedBackground>
        <SignInContainer direction="column" justifyContent="center" spacing={2}>
          <Card variant="outlined">
            <Box sx={{ textAlign: 'center' }}>
              <SitemarkIcon fontSize="large" />
              <Typography component="h1" variant="h4">
                Sign in
              </Typography>
            </Box>

            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}
            >
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  id="email"
                  type="email"
                  required
                  fullWidth
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!emailError}
                  helperText={emailError}
                  autoComplete="email"
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField
                  id="password"
                  type="password"
                  required
                  fullWidth
                  placeholder="••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!passwordError}
                  helperText={passwordError}
                  autoComplete="current-password"
                />
              </FormControl>

              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Remember me"
              />

              {submitError && (
                <Typography color="error" variant="body2">
                  {submitError}
                </Typography>
              )}

              <Button type="submit" variant="contained" fullWidth>
                Sign in
              </Button>
            </Box>

            <Divider sx={{ my: 2 }}>or</Divider>

            <Stack spacing={2}>
              <Button fullWidth variant="outlined" startIcon={<GoogleIcon />}>
                Sign in with Google
              </Button>
              <Button fullWidth variant="outlined" startIcon={<FacebookIcon />}>
                Sign in with Facebook
              </Button>
            </Stack>

            <Typography sx={{ textAlign: 'center', mt: 2 }}>
              Don&apos;t have an account?{' '}
              <Typography
                component={RouterLink}
                to="/signup"
                color="primary"
                sx={{ textDecoration: 'none' }}
              >
                Sign up
              </Typography>
            </Typography>
          </Card>
        </SignInContainer>
      </AnimatedBackground>
    </AppTheme>
  )
}
