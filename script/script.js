function formLogin() {
  const formEmail = document.getElementById('form-email').value
  if (formEmail === '') {
    return
  }
  const formPassword = document.getElementById('password').value
  if (formPassword === '') {
    return
  }
  localStorage.setItem('nome', formEmail)
  localStorage.setItem('senha', formPassword)
}
