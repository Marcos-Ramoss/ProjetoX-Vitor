document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(loginForm);
        try {
          const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.fromEntries(formData))
          });
          const data = await response.json();
          if (response.ok && data.success) {
            alert(data.message || 'Login realizado com sucesso!');
            window.location.reload();
          } else {
            alert(data.message || 'Erro ao fazer login.');
          }
        } catch (error) {
          alert('Erro no sistema ao tentar logar.');
        }
      });
    }
  });