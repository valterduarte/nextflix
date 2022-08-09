function formLogin() {
  const formEmail = document.getElementById('form-email').value

  if (formEmail === '') {
    const pTag = document.createElement('p')
    const errorMsg = document.createTextNode('Usuário ou senha inválidos')
    pTag.appendChild(errorMsg)

    const divFormCad = document.getElementsByTagName('label')[1]
    divFormCad.appendChild(pTag)

    return
  }

  const formPassword = document.getElementById('password').value

  if (formPassword === '') {
    return
  }

  localStorage.setItem('nome', formEmail)
  localStorage.setItem('senha', formPassword)
}
