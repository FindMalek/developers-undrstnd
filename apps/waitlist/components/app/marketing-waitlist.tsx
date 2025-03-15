'use client';

import { useFormStatus } from 'react-dom';

import { Icons } from '@undrstnd/design-system/components/shared/icons';
import { toast } from '@undrstnd/design-system/hooks/use-toast';
import { log } from '@undrstnd/observability/log';
import { useState } from 'react';

import { Section } from '@/components/layout/section';

import { addWaitlistAndSendEmail } from '@/actions/waitlist';

function SubmitButton() {
  const { pending } = useFormStatus();

  if (pending) {
    return (
      <div className="absolute top-1 right-0">
        <Icons.spinner className="absolute top-2.5 right-2 mr-3 size-4 animate-spin text-base" />
      </div>
    );
  }

  return (
    <button
      type="submit"
      className="absolute top-2 right-2 z-10 h-7 rounded-md bg-primary px-4 font-medium text-primary-foreground text-sm"
    >
      <Icons.chevronRight className="inline-block size-4" />
    </button>
  );
}

export function MarketingWaitlist() {
  const [isSubmitted, setSubmitted] = useState(false);

  return (
    <Section id="cta">
      <div className="relative mx-auto overflow-hidden border py-16 text-center">
        <p className="mx-auto mb-6 max-w-3xl text-balance font-medium text-3xl text-foreground">
          Ready to supercharge your development with AI?
        </p>
        <p className="mx-auto mb-6 max-w-3xl text-balance text-foreground text-lg">
          Join the waitlist to get early access to Undrstnd Developers.
        </p>

        <div className="flex justify-center">
          {isSubmitted ? (
            <div className="flex h-11 w-full items-center justify-between rounded-lg border border-[#2C2C2C] px-3 py-1 font-sm text-primary sm:max-w-[330px]">
              <p>Added to waitlist!</p>
              <Icons.check className="size-4" />
            </div>
          ) : (
            <form
              action={async (formData) => {
                setSubmitted(true);

                const email = formData.get('email') as string;

                const result = await addWaitlistAndSendEmail(email);
                if (!result.success) {
                  log.error(result.error ?? 'Unknown error');
                  toast({
                    title: 'Error',
                    description: result.error,
                    variant: 'destructive',
                  });
                } else if (result.warning) {
                  toast({
                    title: result.warning,
                  });
                } else {
                  toast({
                    title: 'Successfully joined the waitlist!',
                  });
                }
              }}
            >
              <fieldset className="relative z-50 min-w-[300px] max-w-full">
                <input
                  placeholder="example@email.com"
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  aria-label="Email address"
                  required
                  className="h-11 w-full rounded-lg border border-border bg-transparent px-3 py-1 font-sm text-primary outline-none sm:max-w-[360px]"
                />
                <SubmitButton />
              </fieldset>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}
