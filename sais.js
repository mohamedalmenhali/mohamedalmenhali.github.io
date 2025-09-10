  <script>
    // Simple localStorage-based auth (demo only)
    const loginForm = document.getElementById('loginForm');
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');
    const loginStatus = document.getElementById('loginStatus');

    const registerForm = document.getElementById('registerForm');
    const regName = document.getElementById('regName');
    const regEmail = document.getElementById('regEmail');
    const regPassword = document.getElementById('regPassword');
    const regStatus = document.getElementById('regStatus');

    function getUsers(){ return JSON.parse(localStorage.getItem('sais_users') || '[]'); }
    function saveUsers(users){ localStorage.setItem('sais_users', JSON.stringify(users)); }

    loginForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const users = getUsers();
      const found = users.find(u=> u.email === loginEmail.value && u.password === loginPassword.value);
      if(found){
        loginStatus.style.color = '#22c55e';
        loginStatus.textContent = 'Login successful! Welcome, ' + found.name;
      } else {
        loginStatus.style.color = '#f59e0b';
        loginStatus.textContent = 'Invalid email or password.';
      }
    });

    registerForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const users = getUsers();
      if(users.some(u=> u.email === regEmail.value)){
        regStatus.style.color = '#f59e0b';
        regStatus.textContent = 'Email already registered.';
        return;
      }
      users.push({name:regName.value, email:regEmail.value, password:regPassword.value});
      saveUsers(users);
      regStatus.style.color = '#22c55e';
      regStatus.textContent = 'Registration successful! You can now log in.';
      registerForm.reset();
    });
  </script>
