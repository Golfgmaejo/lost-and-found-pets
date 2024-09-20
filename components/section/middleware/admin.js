export default function ({ $axios, redirect, route }) {
    const token = localStorage.getItem('token');
  
    if (!token) {
      return redirect('/login');
    }
  
    const decodedToken = jwtDecode(token);
    if (decodedToken.role !== 'admin') {
      return redirect('/user/home');
    }
  }
  