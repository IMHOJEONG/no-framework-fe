'use client'

import dynamic from 'next/dynamic';

const Map = dynamic(
  () => import('../component/Map'),
  {
      loading: () => <p>A map is loading</p>,
      ssr: false
  }
)
export default function Home() {

  return (
    <div className="bg-white-700 mx-auto my-5 w-[98%] h-[480px]">
        <Map  />
    </div>

  );
}
