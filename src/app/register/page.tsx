'use client'

import React, { useState, useEffect } from 'react'
import { FaUser, FaEnvelope, FaLock, FaPhoneAlt, FaBirthdayCake } from 'react-icons/fa'
import ReCAPTCHA from 'react-google-recaptcha'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import Lottie from 'lottie-react'
import animationData from '../../../public/signup.json'

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        dob: '',
    })
    const [captchaVerified, setCaptchaVerified] = useState(false)
    const [isUnderage, setIsUnderage] = useState(false)

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

    const calculateAge = (dob: string) => {
        const birthDate = new Date(dob)
        const age = new Date().getFullYear() - birthDate.getFullYear()
        setIsUnderage(age < 18)
    }

    useEffect(() => {
        if (formData.dob) {
            calculateAge(formData.dob)
        }
    }, [formData.dob])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!isUnderage) {
            console.log('Form submitted', formData)
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
                            <Label htmlFor="firstName" className="text-sm font-semibold text-gray-600">First Name</Label>
                            <Input
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                placeholder="Enter your first name"
                                className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>
                        <div>
                            <Label htmlFor="lastName" className="text-sm font-semibold text-gray-600">Last Name</Label>
                            <Input
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                placeholder="Enter your last name"
                                className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>
                        <div>
                            <Label htmlFor="email" className="text-sm font-semibold text-gray-600">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email"
                                className="mt-2 p-2 border border-gray-300 rounded-md w-full"
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
                            />
                        </div>
                        <div>
                            <Label htmlFor="phone" className="text-sm font-semibold text-gray-600">Phone</Label>
                            <Input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="Enter your phone number"
                                className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>
                        <div>
                            <Label htmlFor="dob" className="text-sm font-semibold text-gray-600">Date of Birth</Label>
                            <Input
                                id="dob"
                                name="dob"
                                type="date"
                                value={formData.dob}
                                onChange={handleInputChange}
                                className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                            />
                        </div>
                        <div className="mt-4">
                            <ReCAPTCHA
                                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY || ''}
                                onChange={handleCaptchaChange}
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={!captchaVerified || isUnderage}
                            className={`w-full py-3 ${captchaVerified ? 'bg-blue-500' : 'bg-blue-300'} text-white text-lg font-semibold rounded-md mt-4`}
                        >
                            Register
                        </Button>
                        {isUnderage && (
                            <p className="text-red-500 text-center mt-2">You must be 18 or older to register.</p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
