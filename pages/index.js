import Image from 'next/image';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://jqshvimwpekmwsyffdab.supabase.co/";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impxc2h2aW13cGVrbXdzeWZmZGFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQyNDk4ODksImV4cCI6MjAxOTgyNTg4OX0.cwOFsxJqgcxBPnGV47a8KnvzlQKoXzEs2r1cdxysVAs";
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Data dummy untuk kandidat, gantilah dengan data sebenarnya
const candidates = [
  { id: 1, name: 'Kandidat 1 Hanum Khairana Fatmah', imageUrl: '/images/hanum.jpg' },
  { id: 2, name: 'Kandidat 2 Muhammad Salam', imageUrl: '/images/salam.jpg' },
  { id: 3, name: 'Kandidat 3 Muhammad Nahrowi', imageUrl: '/images/hans.jpg' },
  { id: 4, name: 'Kandidat 4 Resky Awaluddin Fajar Syarif', imageUrl: '/images/resky.jpg' },
  { id: 5, name: 'Kandidat 5 Mochammad Itmamul Wafa', imageUrl: '/images/wafa.jpg' },
];

export default function Home() {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // State baru untuk melacak status pengiriman


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validasi email untuk domain "@mail.ugm.ac.id"
    if (!email.endsWith('@mail.ugm.ac.id')) {
      toast.error('Silakan gunakan email dengan domain @mail.ugm.ac.id');
      setIsSubmitting(false); // Pengiriman selesai, set isSubmitting kembali ke false
      return;
    }

    // Validasi pemilihan kandidat/voting
    if (!selectedCandidate) {
      toast.error('Silakan pilih salah satu kandidat sebelum submit.');
      setIsSubmitting(false); // Pengiriman selesai, set isSubmitting kembali ke false
      return;
    }

    try {
      const { data, error } = await supabase
        .from('votings')
        .insert([
          { email: email, voting: selectedCandidate }
        ]);

      if (error) throw error;

      console.log('Insert berhasil:', data);
      toast.success('Terima kasih telah melakukan voting!');
    } catch (error) {
      console.error('Insert gagal:', error);
      if (error.message.includes('duplicate key value violates unique constraint')) {
        toast.error('Email sudah digunakan untuk voting.');
      } else {
        toast.error('Terjadi kesalahan, silakan coba lagi.');
      }
    } finally {
      setIsSubmitting(false); // Pengiriman selesai atau terjadi error, set isSubmitting kembali ke false
    }
  }


  return (
    <div>
      <h1>Udah tutup lohhh</h1>
      {/* <div className='bg-indigo-600 text-white text-center py-4'>
        <h1 className='text-2xl font-bold'>Pemilihan Ketua HIMPASIKOM UGM Periode 2024/2024</h1>
        <p className='text-sm'>Silakan pilih salah satu kandidat berikut</p>
      </div>
      <div className='flex justify-center items-center min-h-screen p-6'>
        <ToastContainer />
        <form onSubmit={handleSubmit} className='w-full max-w-4xl'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6'>
            {candidates.map((candidate) => (
              <div key={candidate.id} className='flex flex-col items-center p-4 shadow-lg rounded-lg'>
                <Image src={candidate.imageUrl} alt={candidate.name} width={100} height={100} className='rounded-full' />
                <div className='mt-3 text-center'>
                  <div className='font-medium'>{candidate.name}</div>
                  <label htmlFor={`candidate-${candidate.id}`} className='cursor-pointer'>
                    <input
                      id={`candidate-${candidate.id}`}
                      type='radio'
                      name='candidate'
                      value={candidate.id}
                      onChange={() => setSelectedCandidate(candidate.id)}
                      className='form-radio mt-2'
                    />
                    <span className='ml-2'>Pilih</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
          <div className='mt-6'>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              type='email'
              name='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Masukkan Email UGM Anda'
              required
              style={{ borderColor: 'black !important' }}
              className='mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-transparent rounded-md'
            />
          </div>
          <div className='mt-6'>
            <p className='text-sm text-gray-500'>
              - Merupakan mahasiswa aktif MKOM UGM <br />
              - voting online hanya dapat di isi oleh mahasiswa MKOM UGM yang tidak bisa hadir di tempat pemilihan <br />
              - Satu email (email UGM) hanya bisa melakukan voting sekali
            </p>
          </div>
          <div>
            {/* Konten halaman dan form... */}
            
    </div>
  );
}
