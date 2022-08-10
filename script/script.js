function formLogin() {
  const formEmail = document.getElementById('form-email').value
  const formPassword = document.getElementById('password').value

  if (formEmail === '' || formPassword === '') {
    showMsgError()
  } else {
    saveInLocalstorage(formEmail, formPassword)
    window.location.href = 'http://127.0.0.1:5500/catalogo.html'
  }
}

function saveInLocalstorage(formEmail, formPassword) {
  localStorage.setItem('nome', formEmail)
  localStorage.setItem('senha', formPassword)
}

function showMsgError() {
  const hasPTag = document.getElementsByTagName('p')

  if (hasPTag.length === 0) {
    const pTag = document.createElement('p')
    const errorMsg = document.createTextNode('Usuário ou senha inválidos')
    pTag.appendChild(errorMsg)

    const divFormCad = document.getElementsByTagName('label')[1]
    divFormCad.appendChild(pTag)
  }
}
