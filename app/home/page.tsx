import React from 'react'
import Sidebar from '@/components/home/Index'
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  const navigateToSomePage = () => {
    router.push('/some-page');
  };
  return (
    <section>
      {router && <Sidebar router={router} />}
    </section>
  )
}

export default Home