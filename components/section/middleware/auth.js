export default function ({ $axios, redirect, route }) {
    const token = localStorage.getItem('token');
  
    if (!token) {
      return redirect('/login');
    }
  
    $axios.setHeader('Authorization', `Bearer ${token}`);
  }
  