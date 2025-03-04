'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import ReCAPTCHA from 'react-google-recaptcha'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import Swal from 'sweetalert2'
import axios from 'axios'
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })
import animationData from '../../../public/signup.json'
const imageUpload = async (image: File) => {
    const formData = new FormData()
    formData.append('image', image)

    const { data } = await axios.post(
        'https://api.imgbb.com/1/upload?key=19c9072b07556f7849d6dea75b7e834d',
        formData
    )

    return data.data.display_url
}

const RegisterPage = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'customer',
    })
    const [captchaVerified, setCaptchaVerified] = useState(false)
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState<File | null>(null)
    const [recaptchaKey, setRecaptchaKey] = useState<string>('')

    useEffect(() => {

        setRecaptchaKey('6LfI2MQqAAAAAGP00WNxIN8mi5F5_wZuo1GqqjfP')

    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleCaptchaChange = (value: string | null) => {
        setCaptchaVerified(!!value)
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0]
            setImage(file)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            let imageUrl = null
            if (image) {
                imageUrl = await imageUpload(image)
            }

            const response = await fetch('http://localhost:8000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    image: imageUrl,
                }),
            })

            const data = await response.json()

            if (response.ok) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Registration successful!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    router.push('/login')
                })
            } else {
                Swal.fire('Error', data.message || 'Registration failed!', 'error')
            }
        } catch (error) {
            Swal.fire('Error', 'Something went wrong! Please try again.', 'error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-xl flex">
                <div className="w-full md:w-1/2 p-4 flex justify-center items-center">
                    <Lottie animationData={animationData} loop={true} className="w-full max-w-sm" />
                </div>
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Register</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label htmlFor="name" className="text-sm font-semibold text-gray-600">Full Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter your full name"
                                className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="email" className="text-sm font-semibold text-gray-600">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email"
                                className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="password" className="text-sm font-semibold text-gray-600">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Enter your password"
                                className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="image" className="text-sm font-semibold text-gray-600">Profile Image</Label>
                            <Input
                                id="image"
                                name="image"
                                type="file"
                                onChange={handleImageChange}
                                className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>
                        <div className="mt-4">
                            {recaptchaKey ? (
                                <ReCAPTCHA sitekey={recaptchaKey} onChange={handleCaptchaChange} />
                            ) : (
                                <p className="text-red-500">ReCAPTCHA key is missing</p>
                            )}
                        </div>
                        <Button
                            type="submit"
                            disabled={!captchaVerified || loading}
                            className={`w-full py-3 ${!captchaVerified || loading ? 'bg-blue-300' : 'bg-blue-500'
                                } text-white text-lg font-semibold rounded-md mt-4`}
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
