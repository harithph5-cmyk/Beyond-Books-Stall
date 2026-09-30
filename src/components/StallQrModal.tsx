import React, { useEffect, useState } from 'react';
import { X, QrCode, Smartphone, Copy, Check } from 'lucide-react';
import QRCode from 'qrcode';
import { sounds } from '../utils/audio';

interface StallQrModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StallQrModal: React.FC<StallQrModalProps> = ({ isOpen, onClose }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      const url = window.location.href;
      QRCode.toDataURL(url, {
        width: 320,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error('QR code generation error', err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    sounds.playClick();
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 text-center overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-3">
          <Smartphone className="w-3.5 h-3.5" />
          <span>Stall Queue Mode</span>
        </div>

        <h3 className="text-xl font-bold text-white font-display mb-1">
          Scan to Play on Mobile
        </h3>
        <p className="text-xs text-neutral-400 mb-5">
          Waiting in line? Scan this QR code with your smartphone camera to start your 30-sec AI test.
        </p>

        {/* QR Code Container */}
        <div className="p-3 bg-white rounded-xl inline-block shadow-[0_0_30px_rgba(16,185,129,0.2)] mb-5">
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt="Scan QR to play on mobile"
              className="w-52 h-52 mx-auto"
            />
          ) : (
            <div className="w-52 h-52 flex items-center justify-center bg-neutral-100">
              <QrCode className="w-10 h-10 text-neutral-400 animate-pulse" />
            </div>
          )}
        </div>

        {/* Copy Link Button */}
        <div className="space-y-2">
          <button
            onClick={handleCopyLink}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 text-xs font-semibold text-white transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-neutral-400" />
                <span>Copy Stall Link</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
