export default async function HorizontalLoadingCard() {
    return (
        <div className="md:col-span-6 md:col-start-7 p-4 flex gap-5 flex-col items-center bg-white rounded-lg md:flex-row dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 relative animate-pulse">
            <div className="relative w-full h-full overflow-clip rounded-lg basis-full">
                <div className="bg-gray-300 rounded-lg object-cover md:absolute inset-0 max-h-56 md:max-h-none min-w-full min-h-full w-300 h-200 max-w-full hover:scale-110 transition-transform duration-1000" />
            </div>
            <div className="flex flex-col justify-between leading-normal h-fit md:basis-full">
                <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-4"></div>
                <div className="flex gap-5">
                    <div className="h-10 bg-gray-200 rounded-full dark:bg-gray-700 w-10 mr-3"></div>
                </div>
            </div>
        </div>
    )
}