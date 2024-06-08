import React from 'react'
import PixelvaultNavbar from '../../../components/PixelvaultNavbar'
import { useRouter } from 'next/router'
import NFTDetailCard from '../../../components/NFTDetailCard'

const nftdetail = () => {
    const router = useRouter()
    const nftid = router.query.nftid
  return (
    <>
    <PixelvaultNavbar/>
    <NFTDetailCard tokenid = {nftid}/>
    </>
  )
}

export default nftdetail