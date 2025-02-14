import TransactionsList from "@/components/TransactionsList"

const page = () => {
  return (
    <>
      <div className='mb-4'>
        <p className="text-2xl text-center ">History</p>
      </div>
      <TransactionsList />
    </>
  )
}

export default page