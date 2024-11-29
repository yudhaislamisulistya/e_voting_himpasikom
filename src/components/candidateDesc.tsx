interface CandidateDescProps {
  visi?: string | null
  misi?: string[]
}

export default function CandidateDesc({ visi, misi }: CandidateDescProps) {
  return (
    <div
      className={
        'flex flex-col lg:flex-row lg:items-start gap-4 ' +
        (visi && misi ? 'mb-6' : '')
      }
    >
      {visi && (
        <div className='min-[480px]:w-96 flex flex-col items-center px-6 py-4 mx-6 rounded-md border-[1px] border-blue-800'>
          <h1 className='font-bold text-lg mb-2'>Visi</h1>
          <p className='text-justify text-sm font-[400]'>{visi}</p>
        </div>
      )}
      {misi && (
        <div className='min-[480px]:w-96 flex flex-col items-center px-6 py-4 mx-6 rounded-md border-[1px] border-blue-800'>
          <h1 className='font-bold text-lg mb-2'>Misi</h1>
          <ul className='flex flex-col gap-3 text-justify leading-4'>
            {misi.map((msg, i) => (
              <li key={i} className='font-[400] text-sm flex flex-row gap-2'>
                <span>&#8227;</span>
                <span>{msg}</span>
              </li>
            ))}
          </ul>
          {/* <p className='text-justify'>{misi}</p> */}
        </div>
      )}
    </div>
  )
}
