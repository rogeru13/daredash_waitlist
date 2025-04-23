'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    referralSource: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) throw new Error('Submission failed');
      
      setStatus('success');
      setMessage('You\'re in! Stay tuned in your inbox.');
      setFormData({ firstName: '', lastName: '', email: '', referralSource: '' });
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#FF3008]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#FF3008]/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <div className="relative w-40 h-40 mx-auto mb-12">
            <Image
              src="/logo.png"
              alt="DareDash Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          
          <h1 className="text-6xl sm:text-7xl font-extrabold text-[#FF3008] mb-4 tracking-tight">
            DareDash
          </h1>
          <p className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            The BeReal of Dares
          </p>
          <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Daily Dares. Real Reactions.
          </p>
        </div>

        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-8 relative">
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
            <div className="absolute top-[-50%] right-[-50%] w-[100%] h-[100%] bg-[#FF3008]/10 rotate-45 transform origin-bottom-left" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  required
                  className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-[#FF3008] focus:ring-[#FF3008] transition-colors text-gray-900 placeholder-gray-400"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  required
                  className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-[#FF3008] focus:ring-[#FF3008] transition-colors text-gray-900 placeholder-gray-400"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-[#FF3008] focus:ring-[#FF3008] transition-colors text-gray-900 placeholder-gray-400"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>

            <div>
              <label htmlFor="referralSource" className="block text-sm font-medium text-gray-700">
                How did you hear about us?
              </label>
              <select
                id="referralSource"
                className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-[#FF3008] focus:ring-[#FF3008] transition-colors text-gray-900"
                value={formData.referralSource}
                onChange={(e) => setFormData(prev => ({ ...prev, referralSource: e.target.value }))}
                required
              >
                <option value="">Select an option</option>
                <option value="instagram">Instagram</option>
                <option value="roger">Roger (in person)</option>
                <option value="linkedin">LinkedIn</option>
                <option value="other">Other</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl text-sm font-medium text-white bg-[#FF3008] hover:bg-[#FF3008]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF3008] disabled:opacity-50 transition-all duration-200 transform hover:scale-[1.02]"
            >
              {status === 'loading' ? 'Joining...' : 'Join the Waitlist →'}
            </button>

            <p className="text-center text-sm text-gray-500">
              Be among the first to experience the thrill of daily dares
            </p>
          </form>

          {message && (
            <div className={`mt-4 p-4 rounded-xl ${
              status === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              {message}
            </div>
          )}
        </div>

        {/* Social Links */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 mb-4">Connect with the founder</p>
          <div className="flex items-center justify-center space-x-6">
            <a
              href="https://instagram.com/rojeru_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#FF3008] transition-colors"
              aria-label="Follow on Instagram"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/roger-you-b09bb0282"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#FF3008] transition-colors"
              aria-label="Connect on LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            © {new Date().getFullYear()} DareDash. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
}
