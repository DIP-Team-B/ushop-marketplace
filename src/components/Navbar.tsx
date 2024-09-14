import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav className='fixed inset-x-0 top-0 z-50 bg-beige shadow dark:bg-mainGrey'>
      <div className='container px-4 md:px-6'>
        <div className='flex h-14 items-center'>
          <Link href='#' className='mr-auto flex items-center gap-2 text-lg font-semibold' prefetch={false}>
            <Image src='icons/favicon.svg'
                    height={40}
                    width={70}
                    alt='logo' />
          </Link>
          <nav className='ml-auto flex items-center space-x-4'>
            <Link
              href='#'
              className='font-medium text-sm border-b-2 border-transparent transition-colors hover:text-mainBlack hover:border-mainGrey dark:hover:text-lightGrey dark:hover:border-mainBlack'
              prefetch={false}
            >
              <Image src='icons/account.svg'
                    height={20}
                    width={20}
                    alt='my account' />
            </Link>

            <Link
              href='#'
              className='font-medium text-sm border-b-2 border-transparent transition-colors hover:text-mainBlack hover:border-mainGrey dark:hover:text-lightGrey dark:hover:border-mainBlack'
              prefetch={false}
            >
              <Image src='icons/cart.svg'
                    height={20}
                    width={20}
                    alt='my cart' />
            </Link>

            <Link
              href='#'
              className='font-medium text-sm border-b-2 border-transparent transition-colors hover:text-mainBlack hover:border-mainGrey dark:hover:text-lightGrey dark:hover:border-mainBlack'
              prefetch={false}
            >
              <Image src='icons/favourite.svg'
                    height={20}
                    width={20}
                    alt='my favourites' />
            </Link>

          </nav>
        </div>
      </div>
    </nav>
  )
}