'use client';

import { QRCodeSVG } from 'qrcode.react';
import { Card, CardContent } from '@/components/ui/card';

interface QRCodeProps {
  value: string;
  size?: number;
  title?: string;
}

export function QRCode({ value, size = 200, title }: QRCodeProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <Card className="p-4 bg-white border-4 border-zinc-100 dark:border-zinc-800">
        <QRCodeSVG 
          value={value} 
          size={size}
          level="H"
          includeMargin={true}
        />
      </Card>
      {title && <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">{title}</p>}
    </div>
  );
}
