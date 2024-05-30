import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import HeartIcon from "@/components/HeartIcon"

export default function Component() {
  return (
    <main className="w-full max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
      <div className="flex flex-col gap-8 md:gap-12">
        <div className="w-full">
          <form className="flex items-center justify-center gap-2 md:gap-4">
            <Input
              type="search"
              placeholder="Search for memes..."
              className="flex-1 md:max-w-[500px] rounded-md px-4 py-2 text-sm md:text-base"
            />
            <Button type="submit" className="px-4 py-2 text-sm md:text-base">
              Search
            </Button>
          </form>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="relative group overflow-hidden rounded-lg">
            <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View</span>
            </Link>
            <Image
              src="/next.svg"
              alt="Asset 1"
              width={400}
              height={300}
              className="object-cover w-full h-60 group-hover:opacity-50 transition-opacity"
            />
            <div className="bg-white p-4 dark:bg-gray-950">
              <h3 className="font-semibold text-lg md:text-xl">Stylish Illustration</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Vector art with modern design</p>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-base md:text-lg">$19.99</span>
                <Button size="icon" variant="ghost" className="rounded-full">
                  <HeartIcon className="w-5 h-5" />
                  <span className="sr-only">Favorite</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg">
            <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View</span>
            </Link>
            <Image
              src="/next.svg"
              alt="Asset 2"
              width={400}
              height={300}
              className="object-cover w-full h-60 group-hover:opacity-50 transition-opacity"
            />
            <div className="bg-white p-4 dark:bg-gray-950">
              <h3 className="font-semibold text-lg md:text-xl">Minimal Icon Pack</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">200+ customizable icons</p>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-base md:text-lg">$9.99</span>
                <Button size="icon" variant="ghost" className="rounded-full">
                  <HeartIcon className="w-5 h-5" />
                  <span className="sr-only">Favorite</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg">
            <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View</span>
            </Link>
            <Image
              src="/next.svg"
              alt="Asset 3"
              width={400}
              height={300}
              className="object-cover w-full h-60 group-hover:opacity-50 transition-opacity"
            />
            <div className="bg-white p-4 dark:bg-gray-950">
              <h3 className="font-semibold text-lg md:text-xl">Geometric Patterns</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Seamless repeating patterns</p>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-base md:text-lg">$14.99</span>
                <Button size="icon" variant="ghost" className="rounded-full">
                  <HeartIcon className="w-5 h-5" />
                  <span className="sr-only">Favorite</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg">
            <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View</span>
            </Link>
            <Image
              src="/next.svg"
              alt="Asset 4"
              width={400}
              height={300}
              className="object-cover w-full h-60 group-hover:opacity-50 transition-opacity"
            />
            <div className="bg-white p-4 dark:bg-gray-950">
              <h3 className="font-semibold text-lg md:text-xl">Isometric Illustrations</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">3D-style vector illustrations</p>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-base md:text-lg">$24.99</span>
                <Button size="icon" variant="ghost" className="rounded-full">
                  <HeartIcon className="w-5 h-5" />
                  <span className="sr-only">Favorite</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg">
            <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View</span>
            </Link>
            <Image
              src="/next.svg"
              alt="Asset 5"
              width={400}
              height={300}
              className="object-cover w-full h-60 group-hover:opacity-50 transition-opacity"
            />
            <div className="bg-white p-4 dark:bg-gray-950">
              <h3 className="font-semibold text-lg md:text-xl">Gradient Backgrounds</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Vibrant color gradients</p>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-base md:text-lg">$12.99</span>
                <Button size="icon" variant="ghost" className="rounded-full">
                  <HeartIcon className="w-5 h-5" />
                  <span className="sr-only">Favorite</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="relative group overflow-hidden rounded-lg">
            <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
              <span className="sr-only">View</span>
            </Link>
            <Image
              src="/next.svg"
              alt="Asset 6"
              width={400}
              height={300}
              className="object-cover w-full h-60 group-hover:opacity-50 transition-opacity"
            />
            <div className="bg-white p-4 dark:bg-gray-950">
              <h3 className="font-semibold text-lg md:text-xl">Retro Illustrations</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Vintage-inspired vector art</p>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-base md:text-lg">$16.99</span>
                <Button size="icon" variant="ghost" className="rounded-full">
                  <HeartIcon className="w-5 h-5" />
                  <span className="sr-only">Favorite</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

