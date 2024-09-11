
const Footer = () => (
    <div className="row-start-3 flex gap-6 flex-wrap items-center justify-center md:container-xl sm:mx-auto bg-#000000 relative h-90 w-full md:pt-20 pt-5 pb-10 px-7">
        <div className='flex flex-col gap-2 md:gap-4 place-content-center py-4 md:py-8 item-top divide-y md:mx-20 md:divide-y-0 md:divide-x md:flex-row divide-dashed'>

            {/* Column 1: Contact Us */}
            <div className='md:w-1/2 pl-3'>
                <p className='font-normal text-base md:text-2xl text-#781818 align-top'>Contact Us</p>
                <p className='font-extrabold text-base md:text-2xl text-#000000 leading-10 py-4 md:py-8'>Nanyang Technological University</p>
                <div className='flex flex-col gap-2 md:gap-4 place-content-left py-4 md:py-8 item-top'>
                    
                    {/* Row 1 */}
                    <div className='flex flex-row leading-3 md:leading-9 gap-8'>
                        <p className='font-bold text-xs sm:text-sm md:text-lg text-#781818 tracking-wider flex-none w-14'>Address</p>
                        <a title='address' target='_blank' className='font-semibold text-xs sm:text-sm md:text-lg text-#000000 hover:text-#781818 hover:underline' href='https://maps.app.goo.gl/34JsEahJSXGMffT77'>Nanyang Drive blahblah</a>
                    </div>

                    {/* Row 2 */}    
                    <div className='flex flex-row leading-3 md:leading-9 gap-8'>
                        <p className='font-bold text-xs sm:text-sm md:text-lg text-#781818 tracking-wider flex-none w-14'>Email</p>
                        <a title='email' className='font-semibold text-xs sm:text-sm md:text-lg text-#000000 hover:text-#781818 hover:underline' href='mailto:enquires@UShop.com'>UShop@e.ntu.edu.sg</a>
                    </div>
                </div>
            </div>

            {/* ==== Divider ====*/}

            {/* Column 2: Locate Us */}
            <div className='min-h-full pl-3 md:w-1/2 gap-2 md:gap-4 pt-5 space-y-3 md:pb-16 pr-3 md:pt-0 md:pl-7'>
                <span className='font-normal text-base md:text-2xl text-#781818 align-top'>Locate Us</span>
                <iframe src=''
                className='min-h-[200px] lg:min-h-[300px] w-full md:h-full rounded-2xl' title='Studio Location'></iframe>
                {/* loading='lazy' */}
            </div>
        </div>

        {/* Below footer */}
        <div className='md:container-xl md:mx-auto bg-#781818 absolute inset-x-0 bottom-0 w-full text-center pb-1'>
            <span className='font-semibold text-[8px] md:text-xs text-#000000 tracking-wide'>©UShop 2024 </span>
            <span className='font-semibold text-[8px] md:text-xs text-#000000 tracking-wide'>Company Registration No.: afkafj</span>
        </div>
    </div>
)

export default Footer;