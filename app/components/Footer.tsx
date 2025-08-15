export default function Footer() {
  return (
    <footer id='kontakt' className='mt-10 border-t border-black/10 bg-white/80'>
      <div className='container-page py-10 grid gap-8 sm:grid-cols-3'>
        <div>
          <div className='text-xl font-semibold'>LaDelta</div>
          <div className='text-sm text-black/70 mt-2'>
            Torte, kolači i slastice
          </div>
          <div className='text-sm text-black/70 mt-1'>Zagreb, Hrvatska</div>
        </div>
        <div>
          <div className='text-sm font-medium'>Kontakt</div>
          <ul className='mt-2 text-sm text-black/70 space-y-1'>
            <li>
              <a className='hover:underline' href='mailto:info@ladelta.hr'>
                info@ladelta.hr
              </a>
            </li>
            <li>
              <a className='hover:underline' href='tel:+385000000'>
                +385 00 000 000
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className='text-sm font-medium'>Radno vrijeme</div>
          <ul className='mt-2 text-sm text-black/70 space-y-1'>
            <li>Pon–Pet: 9–17h</li>
            <li>Sub: 9–13h</li>
          </ul>
        </div>
      </div>
      <div className='border-t border-black/10'>
        <div className='container-page py-4 text-xs text-black/60 flex items-center justify-between'>
          <span>© {new Date().getFullYear()} LaDelta</span>
          <span className='text-black/50'>Teal & Gold by LaDelta</span>
        </div>
      </div>
    </footer>
  );
}
