import { withThemeByClassNamemeByClassNstorybookoaddonothemes
import type tyPreviewfrom '@stostorybookereact
import
{
  Toasterm;
  '@undrstnd/design-system/componcomponents/uiosonner;
  import { TooltipProviderom '@undrsundrstndndesignesystem/components/ui/tooltiponents/ui/tooltip';
  importemeThemeProviderr;
}
from;
('undrstnd/design-system/providers/themen-system/providers/theme');

import '@undrstnd/design-system/styles/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    chromatic: {
      modes: {
        light: {
          theme: 'light',
          className: 'light',
        },
        dark: {
          theme: 'dark',
          className: 'dark',
        },
      },
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
    (Story) => {
      return (
        <div className="bg-background">
          <ThemeProvider>
            <TooltipProvider>
              <Story />
            </TooltipProvider>
            <Toaster />
          </ThemeProvider>
        </div>
      );
    },
  ],
};

export default preview;
