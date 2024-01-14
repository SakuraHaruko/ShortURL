"use client";
import { SetStateAction, useCallback, useState } from 'react';
import Image from 'next/image';
import Script from 'next/script';

interface ApiResponse {
  code: number;
  message: string;
  data?: {
    id: string;
  };
}

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [turnstileData, setTurnstileData] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState<string>('');

  const handleUrlChange = useCallback(
      ({ target: { value } }: { target: { value: SetStateAction<string> } }) => {
        setUrlInput(value);
      },
      []
  );

  const isValidUrl = (url: string | URL): boolean => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = useCallback(
      async (e: React.FormEvent) => {
        e.preventDefault();

        if (!turnstileData) {
          setMessage('Please finish this challenge.');
          return;
        }

        if (!urlInput) {
          setMessage('Please enter URL.');
          return;
        }

        if (!isValidUrl(urlInput)) {
          setMessage("This URL is invalid.");
          return;
        }

        const apiUrl = 'https://api.nekocafe.moe/app/shorturl/submit';

        try {
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              url: urlInput,
              turnstileData: turnstileData,
            }),
          });

          const result: ApiResponse = await response.json();

          if (result.code === 1) {
            setMessage(result.message);
          } else if (result.code === 0 && result.data) {
            setMessage(`Success! ID: ${result.data.id}`);
          }
        } catch (error) {
          console.error('Error submitting URL:', error);
          setMessage('An error occurred while submitting the URL.');
        }
      },
      [message]
  );

  return (
      <main className="bg-cover bg-no-repeat bg-fixed bg-center min-h-screen flex flex-col items-center justify-center relative">
        <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            async={true}
            defer={true}
            onLoad={() => {
              // @ts-ignore
                turnstile.render('#turnstile-container', {
                sitekey: '0x4AAAAAAAPpocY516BtBtme',
                callback: function (token: string) {
                  console.log(`Challenge Success ${token}`);
                  setTurnstileData(token);
                },
              });
            }}
        />
        <div className="absolute inset-0">
          <Image
              src="https://data.nekocafe.moe/qwq.lgbt/images/background.jpg"
              alt="background"
              layout="fill"
              objectFit="cover"
              draggable={false}
              priority
          />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 max-w-lg bg-opacity-90 relative z-10">
          <div className="flex flex-col items-center">
            <input
                name="url"
                type="url"
                placeholder="URL"
                value={urlInput}
                onChange={handleUrlChange}
                className="border rounded px-4 py-2 mb-4 focus:outline-none focus:border-blue-500"
            />
            <div className="mb-4" id="turnstile-container" />
            <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-700 focus:outline-none"
            >
              Submit
            </button>
            {message && (
                <div className="mt-4 text-center text-gray-700">{message}</div>
            )}
          </div>
        </div>
          <div className="text-gray-500 text-sm mt-4 absolute inset-x-0 bottom-0 text-center py-4">
              <span>Powered By <a href="https://nekocafe.moe" target="_blank">NekoCafe Network</a></span><br />
              <span>Copyright &copy; 2022-2024 NekoCafe Network, All Rights Reserved.</span>
          </div>
      </main>
  );
};

export default Home;
