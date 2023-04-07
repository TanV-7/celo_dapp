import React, { useEffect, useState } from 'react'
import EthereumQRPlugin from 'ethereum-qr-code'
import QRCode from 'qrcode.react'
import { useParams } from 'react-router-dom'
import { ethers } from 'ethers'

const Pay = () => {
  const { session } = useParams()
  let decodedData = JSON.parse(decodeURIComponent(session))

  const [qrData, setQrData] = useState()
  const qr = new EthereumQRPlugin()

  useEffect(() => {
    generateQRCode()
  }, [decodedData])

  const generateQRCode = async () => {
    const qrData = qr.toDataUrl({
      to: decodedData.address,
      value: ethers.parseEther(decodedData.amount),
      chainId: 44787,
    })

    qrData.then((code) => {
      console.log('Your QR id generated:', code.value)
      setQrData(code.value)
    })
  }

  return (
    <div className="bg-gradient-to-r from-slate-950 to-gray-950 flex p-36 flex-1 flex-col items-center justify-center text-white">
       <strong>Scan QR to Pay</strong>
      <div className="w-96 h-80 rounded-md flex items-center justify-center bg-gray-50">
        {qrData && <QRCode className="w-full h-full" value={qrData} />}
      </div>
      <a href="https://main--vermillion-rolypoly-847438.netlify.app/login">
      <button class="bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-purple-950 text-white font-bold py-2 px-4 border border-blue-700 rounded">
  LogOut
</button>
</a>
    </div>
    
  )
}

export default Pay
