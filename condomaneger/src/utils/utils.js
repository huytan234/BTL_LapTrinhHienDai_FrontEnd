export const usernameValidator = (username) => {
    const re = /^\d+$/;
  
    if (!username || username.length <= 0) return 'Username cannot be empty.';
    
  
    return '';
  };
  
  export const passwordValidator = (password) => {
    if (!password || password.length <= 0) return 'Password cannot be empty.';
  
    return '';
  };
  