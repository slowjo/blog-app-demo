export default async function VerticalLoadingCard() {
    return (
        <div className="p-4 mb-4 md:mb-0 flex flex-col md:col-span-6 md:row-span-3 bg-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 w-full animate-pulse">
            <div className="relative w-full h-full overflow-clip rounded-lg">
                <div className="bg-white rounded-lg md:absolute inset-0 md:min-h-full min-w-full hover:scale-105 transition-transform duration-1000 object-cover w-full h-56 md:w-[600px] md:h-[900px] max-w-full md:max-h-none" />
            </div>
            <div className="p-5">
            <div className="h-4 bg-white rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div className="h-4 bg-white rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div className="h-2 bg-white rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-white rounded-full dark:bg-gray-700 mb-4"></div>
                <div className="flex gap-5">
                    <div className="h-10 bg-white rounded-full dark:bg-gray-700 w-10 mr-3"></div>
                </div>
            </div>
        </div>
    )
}