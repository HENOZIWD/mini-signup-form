// TODO: 이 곳에 정답 코드를 작성해주세요.

const formElement = document.querySelector('#form')
const idInputElement = formElement.querySelector('#id')
const idMsgElement = formElement.querySelector('#id-msg')
const pwInputElement = formElement.querySelector('#pw')
const pwMsgElement = formElement.querySelector('#pw-msg')
const pwCheckInputElement = formElement.querySelector('#pw-check')
const pwCheckMsgElement = formElement.querySelector('#pw-check-msg')
const modalElement = document.querySelector('#modal')
const idConfirmElement = modalElement.querySelector('#confirm-id')
const pwConfirmElement = modalElement.querySelector('#confirm-pw')
const modalCancelElement = modalElement.querySelector('#cancel-btn')
const modalApproveElement = modalElement.querySelector('#approve-btn')
const incFontElement = document.querySelector('#increase-font-btn')
const decFontElement = document.querySelector('#decrease-font-btn')

let currentFontSize = 16

idInputElement.focus()

const IdRegex = new RegExp('^[a-z|0-9|_|-]{5,20}$')
const pwRegex = new RegExp('^[A-Z|a-z|0-9]{8,16}$')

const idValidation = () => {
    const inputValue = idInputElement.value
    if (inputValue === '') {
        idInputElement.classList.add('border-red-600')
        idMsgElement.innerText = '필수 정보입니다.'

        return false
    } else if (!IdRegex.test(inputValue)) {
        idInputElement.classList.add('border-red-600')
        idMsgElement.innerText =
            '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.'

        return false
    } else {
        idInputElement.classList.remove('border-red-600')
        idMsgElement.innerText = ''

        return true
    }
}

const pwValidation = () => {
    const inputValue = pwInputElement.value
    if (inputValue === '') {
        pwInputElement.classList.add('border-red-600')
        pwMsgElement.innerText = '필수 정보입니다.'

        return false
    } else if (!pwRegex.test(inputValue)) {
        pwInputElement.classList.add('border-red-600')
        pwMsgElement.innerText = '8~16자 영문 대 소문자, 숫자를 사용하세요.'

        return false
    } else {
        pwInputElement.classList.remove('border-red-600')
        pwMsgElement.innerText = ''

        return true
    }
}

const pwCheckValidation = () => {
    const inputValue = pwCheckInputElement.value
    if (inputValue === '') {
        pwCheckInputElement.classList.add('border-red-600')
        pwCheckMsgElement.innerText = '필수 정보입니다.'

        return false
    } else if (inputValue !== pwInputElement.value) {
        pwCheckInputElement.classList.add('border-red-600')
        pwCheckMsgElement.innerText = '비밀번호가 일치하지 않습니다.'

        return false
    } else {
        pwCheckInputElement.classList.remove('border-red-600')
        pwCheckMsgElement.innerText = ''

        return true
    }
}

const allValidation = () => {
    return {
        idStatus: idValidation(),
        pwStatus: pwValidation(),
        pwCheckStatus: pwCheckValidation(),
    }
}

const handleFormSubmit = (event) => {
    event.preventDefault()
    const { idStatus, pwStatus, pwCheckStatus } = allValidation()

    console.log(idStatus, pwStatus, pwCheckStatus)

    if (idStatus && pwStatus && pwCheckStatus) {
        idConfirmElement.innerText = idInputElement.value
        pwConfirmElement.innerText = pwCheckInputElement.value
        modalElement.showModal()
    }
}

const increaseFont = (event) => {
    event.preventDefault()

    document.documentElement.style.fontSize = ++currentFontSize
    decFontElement.disabled = false

    if (currentFontSize >= 20) {
        incFontElement.disabled = true
    }
}

const decreaseFont = (event) => {
    event.preventDefault()

    document.documentElement.style.fontSize = --currentFontSize
    incFontElement.disabled = false

    if (currentFontSize <= 12) {
        decFontElement.disabled = true
    }
}

idInputElement.addEventListener('focusout', idValidation)
pwInputElement.addEventListener('focusout', pwValidation)
pwCheckInputElement.addEventListener('focusout', pwCheckValidation)
formElement.addEventListener('submit', handleFormSubmit)
modalCancelElement.addEventListener('click', () => {
    modalElement.close()
})
modalApproveElement.addEventListener('click', () => {
    alert('가입되었습니다 🥳')
    modalElement.close()
})
incFontElement.addEventListener('click', increaseFont)
decFontElement.addEventListener('click', decreaseFont)
