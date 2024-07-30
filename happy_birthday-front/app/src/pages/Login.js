import React from 'react'
import toast from 'react-hot-toast'

function Login() {

    const handleSubmitLogin = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const data = {
            email: formData.get('email'),
            password: formData.get('password')
        }

        try {
            const response = await fetch('http://localhost:3002/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(data)
            })
            const result = await response.json()
            if(response.status === 200) {
                console.log('User logged in successfully')
                toast.success('User logged in successfully')
            } else {
                console.error('Invalid credentials')
                toast.error('Invalid credentials')
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form onSubmit={handleSubmitLogin}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
            <button type="submit">Login</button>
        </form>
    )
}

export default Login