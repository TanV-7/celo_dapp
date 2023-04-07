import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

  const [address, setAddress] = useState('')
  const [amount, setAmount] = useState(0.0)
  const [error, setError] = useState('')

  const [linkData, setLinkData] = useState(null)
  const navigate = useNavigate()

  const generateLink = () => {
    if (!address || amount === 0) {
      setError('Make sure you complete all fields!')
      return
    }

    setError('')

    const data = { address: address, amount: amount }
    const encodedData = encodeURIComponent(JSON.stringify(data))

    setLinkData(encodedData)
  }

  const openPayLink = () => {
    navigate(`pay/${linkData}`)
  }

  return (
    <div className="bg-gradient-to-r from-slate-950 to-gray-950 bg-cover items-center flex flex-col py-12 justify-center">
      {error && (
        <h5 className="text-red-500 bg-red-100 border-2 border-red-500 px-5 my-5 rounded-md">
          {error}
        </h5>
      )}
      <div className="flex w-1/2 shadow-sm h-1/2  border-1 border-gray-400 flex-col rounded-md">
        <div className="w-full bg-cyan-300 text-gray-950 p-5 rounded-t-md text-lg">
          <strong>Create a CELO pay link</strong>
        </div>

        <div className="bg-slate-300 p-14 my-16">
          <div className="flex mb-5 flex-col items-start border-b-[0.5px]">
            <label htmlFor="addredd" className="text-sm text-gray-800 ">
              Paste your address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border-1 py-4 outline-none border-gray-900"
            />
          </div>

          <div className="flex mb-5 flex-col items-start ">
            <label htmlFor="addredd" className="text-sm text-gray-800 ">
              Enter CEL Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
              className="w-1/2 border-[0.5px] py-2 rounded-md px-2 mt-2 outline-none border-gray-100"
            />
          </div>

          {linkData && !error && (
            <div
              onClick={openPayLink}
              className="text-xs text-cyan-950 cursor-pointer"
            >
              Open QR link
            </div>
          )}
          <button
            onClick={generateLink}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 my-4 w-full p-3 rounded-md text-white"
          >
            Generate QR Link
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
