
const form = document.querySelector('form')

const errEmail = document.getElementById('emailError')
const errPassword = document.getElementById('passwordError')

document.getElementById('inputEmail').addEventListener('input',()=>{
    errEmail.textContent = ''
    errConfirmPassword.textContent = ''
})

document.getElementById('inputPassword').addEventListener('input',()=>{
    errPassword.textContent = ''
    errConfirmPassword.textContent = ''
})

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    
    const fromLocal = JSON.parse(window.localStorage.getItem('users') || '[]')

    //email
    const email = e.target.email.value
    const lowerEmail = email.toLowerCase()
    if(email === ''){
        return errEmail.textContent = 'Email must be filled in'
    }
    const emailIsRegisted = fromLocal.some((user)=>{
        return lowerEmail === user.email
    })
    if(!emailIsRegisted){
        return errEmail.textContent = 'email is not registered'    
    }

    //password
    const password = e.target.password.value
    if(password === ''){
        return errEmail.textContent = 'Password must be filled in'
    }
    if(password.length < 6){
        return errPassword.textContent = 'Minimum 6 characters'
        
    }
    const passwordIsRegisted = fromLocal.some((user)=>{
        return password === user.password
    })
    if(!passwordIsRegisted){
        return errPassword.textContent = 'Password is not registered'    
    }

    // lowerEmail
    // password
    const userLogin = fromLocal.find((user)=>{
        return(
            user.email === lowerEmail && user.password === password
        )        
    })
    // console.log(userLogin)
    if(!userLogin){
        return errPassword.textContent = 'Password is not correct'
    }

    userLogin.logind = true

    window.localStorage.setItem('users',JSON.stringify(fromLocal))

    form.reset()

    window.location.href = '../main/AllMovie.html'
})