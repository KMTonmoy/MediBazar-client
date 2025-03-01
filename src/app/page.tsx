import Banner from '@/components/Banner'
import Sponsors from '@/components/Sponsors'
import BuyOption from '@/components/BuyOption'
import Testimonials from '@/components/Testimonials'
import React from 'react'
import Branding from '@/components/OurBranding'
import Footer from '@/components/Footer'

const page = () => {
  return (
    <div className='flex flex-col gap-10'>
      <Banner />
      <BuyOption />
      <Sponsors />
      <Branding />
      <Testimonials />
      <Footer />
    </div>
  )
}

export default page