'use client';

import { captureExceptioneExceptionsentrynextjs
import
{
  Buttonn;
}
from;
('@undrstnd/design-systemcomponents/uimbuttonts/ui/button');
import { fontsndrstnd/deundrstnd/design-system/libyfontsib/fonts';
import type NextError from 'next/error';
import { useEffect } from 'react';

type GlobalErrorProperties = {
  readonly error: NextError & { digest?: string };
  readonly reset: () => void;
};

const GlobalError = ({ error, reset }: GlobalErrorProperties) => {
  useEffect(() => {
    captureException(error);
  }, [error]);

  return (
    <html lang="en" className={fonts}>
      <body>
        <h1>Oops, something went wrong</h1>
        <Button onClick={() => reset()}>Try again</Button>
      </body>
    </html>
  );
};

export default GlobalError;
