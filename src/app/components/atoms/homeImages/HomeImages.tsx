import Image from 'next/image';

const HomeImages = () => {
    return (
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-25 md:py-12">
            <Image
                src="/full-house-desktop.JPG"
                width={1000}
                height={760}
                className="hidden md:block"
                alt="Screenshots of the dashboard project showing desktop version"
            />
            <Image
                src="/full-house-mobile.JPG"
                width={560}
                height={620}
                className="block md:hidden"
                alt="Screenshots of the dashboard project showing desktop version"
            />
        </div>
    )
}

export default HomeImages;