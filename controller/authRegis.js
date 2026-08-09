
const form = document.querySelector('form')

const errEmail = document.getElementById('emailError')
const errPassword = document.getElementById('passwordError')
const errConfirmPassword = document.getElementById('confirmPasswordError')

document.getElementById('inputEmail').addEventListener('input',()=>{
    errEmail.textContent = ''
    errConfirmPassword.textContent = ''
})

document.getElementById('inputPassword').addEventListener('input',()=>{
    errPassword.textContent = ''
    errConfirmPassword.textContent = ''
})

document.getElementById('inputConfirmPassword').addEventListener('input',()=>{
    errConfirmPassword.textContent = ''
})


form.addEventListener('submit',(e)=>{
    e.preventDefault()
    
    const fromLocal = JSON.parse(window.localStorage.getItem('users') || '[]')

    const user = new Object()

    const email = e.target.email.value
    const lowerEmail = email.toLowerCase()
    if(email === ''){
        return errEmail.textContent = 'Email must be filled in'
    }
    const isRegisted = fromLocal.some((user)=>{
        return lowerEmail === user.email
    })
    if(isRegisted){
        return errEmail.textContent = 'email is registered'    
    }
    user.email = lowerEmail

    const password = e.target.password.value
    if(password === ''){
        return errEmail.textContent = 'Password must be filled in'
    }
    if(password.length < 6){
        return errPassword.textContent = 'Minimum 6 characters'
        
    }
    const confirmPassword = e.target.confirmPassword.value
    if(password !== confirmPassword){
        return errConfirmPassword.textContent = 'passwords are not same'
    }
    user.password = confirmPassword
    
    form.reset()

    errConfirmPassword.setAttribute('class','min-h-[16px] text-center text-xs font-medium text-green-400')
    errConfirmPassword.textContent = 'Registered successfully'

    setTimeout(()=>{
    errEmail.textContent = ''
    errPassword.textContent = ''
    errConfirmPassword.textContent = ''
    },10000)

    fromLocal.push(user)

    window.localStorage.setItem('users',JSON.stringify(fromLocal))
})