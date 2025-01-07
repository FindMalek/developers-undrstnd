'use client';

import { Section } from '@/components/section';
import OrbitingCircles from '@/components/ui/orbiting-circles';
import { cubicBezier, motion } from 'framer-motion';
import {
  AlertTriangleIcon,
  BrainCircuitIcon,
  DatabaseIcon,
  GitForkIcon,
  HeadsetIcon,
  InfoIcon,
  MessageSquareIcon,
  SearchIcon,
  SquareTerminal,
  UserSearch,
  XCircleIcon,
} from 'lucide-react';

const containerVariants = {
  initial: {},
  whileHover: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function Card1() {
  const variant1 = {
    initial: {
      scale: 0.87,
      transition: {
        delay: 0.05,
        duration: 0.2,
        ease: 'linear',
      },
    },
    whileHover: {
      scale: 0.8,
      boxShadow:
        'rgba(245,40,145,0.35) 0px 20px 70px -10px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px',
      transition: {
        delay: 0.05,
        duration: 0.2,
        ease: 'linear',
      },
    },
  };
  const variant2 = {
    initial: {
      y: -27,
      scale: 0.95,
      transition: {
        delay: 0,
        duration: 0.2,
        ease: 'linear',
      },
    },
    whileHover: {
      y: -55,
      scale: 0.87,
      boxShadow:
        'rgba(39,127,245,0.15) 0px 20px 70px -10px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px',
      transition: {
        delay: 0,
        duration: 0.2,
        ease: 'linear',
      },
    },
  };
  const variant3 = {
    initial: {
      y: -25,
      opacity: 0,
      scale: 1,
      transition: {
        delay: 0.05,
        duration: 0.2,
        ease: 'linear',
      },
    },
    whileHover: {
      y: -45,
      opacity: 1,
      scale: 1,
      boxShadow:
        'rgba(39,245,76,0.15) 10px 20px 70px -20px, rgba(36,42,66,0.04) 0px 10px 24px -8px, rgba(36,42,66,0.06) 0px 1px 4px -1px',
      transition: {
        delay: 0.05,
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
  };

  const containerVariants = {
    initial: {},
    whileHover: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="h-full overflow-hidden border-b p-0 lg:border-r lg:border-b-0">
      <motion.div
        variants={containerVariants}
        initial="initial"
        whileHover="whileHover"
        className="flex h-full w-full cursor-pointer flex-col items-center justify-between gap-y-5"
      >
        <div className="flex h-full w-full items-center justify-center rounded-t-xl border-b">
          <div className="relative flex flex-col items-center justify-center gap-y-2 p-10">
            <motion.div
              variants={variant1}
              className="z-[1] flex h-full w-full items-center justify-between gap-x-2 rounded-md border bg-background p-5 px-2.5 "
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                <SearchIcon className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col gap-y-2">
                <div className="h-2 w-32 rounded-full bg-neutral-800/50 dark:bg-neutral-200/80"></div>
                <div className="h-2 w-48 rounded-full bg-slate-400/50"></div>
                <div className="text-neutral-500 text-xs">
                  Google Search API integration
                </div>
              </div>
            </motion.div>
            <motion.div
              variants={variant2}
              className="z-[2] flex h-full w-full items-center justify-between gap-x-2 rounded-md border bg-background p-5 px-2.5 "
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                <DatabaseIcon className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col gap-y-2">
                <div className="h-2 w-32 rounded-full bg-neutral-800/50 dark:bg-neutral-200/80"></div>
                <div className="h-2 w-48 rounded-full bg-slate-400/50"></div>
                <div className="h-2 w-20 rounded-full bg-slate-400/50"></div>
                <div className="text-neutral-500 text-xs">
                  PostgreSQL database connection
                </div>
              </div>
            </motion.div>
            <motion.div
              variants={variant3}
              className="absolute bottom-0 z-[3] m-auto flex h-fit w-fit items-center justify-between gap-x-2 rounded-md border bg-background p-5 px-2.5 "
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500">
                <MessageSquareIcon className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col gap-y-2">
                <div className="h-2 w-32 rounded-full bg-neutral-800/50 dark:bg-neutral-200/80"></div>
                <div className="h-2 w-48 rounded-full bg-slate-400/50"></div>
                <div className="h-2 w-20 rounded-full bg-slate-400/50"></div>
                <div className="h-2 w-48 rounded-full bg-slate-400/50"></div>
                <div className="text-neutral-500 text-xs">
                  OpenAI GPT-3.5 API integration
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="flex w-full flex-col items-start gap-y-1 px-5 pb-4">
          <h2 className="font-semibold text-lg tracking-tight">
            Tool Integration
          </h2>
          <p className="text-muted-foreground text-sm">
            Seamlessly integrate external APIs and tools into agent workflows.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

const Card2 = () => {
  const logs = [
    {
      id: 1,
      type: 'info',
      timestamp: '2023-12-15 14:23:45',
      message: 'Agent initialized. Starting task execution.',
      icon: (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
          <InfoIcon className="h-5 w-5 text-white" />
        </div>
      ),
    },
    {
      id: 2,
      type: 'action',
      timestamp: '2023-12-15 14:23:47',
      message: 'Retrieving data from external API...',
      icon: (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
          <DatabaseIcon className="h-5 w-5 text-white" />
        </div>
      ),
    },
    {
      id: 3,
      type: 'decision',
      timestamp: '2023-12-15 14:23:50',
      message: 'Analyzing data. Confidence: 85%',
      icon: (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500">
          <BrainCircuitIcon className="h-5 w-5 text-white" />
        </div>
      ),
    },
    {
      id: 4,
      type: 'warning',
      timestamp: '2023-12-15 14:23:52',
      message: 'Potential anomaly detected in dataset.',
      icon: (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500">
          <AlertTriangleIcon className="h-5 w-5 text-white" />
        </div>
      ),
    },
    {
      id: 5,
      type: 'error',
      timestamp: '2023-12-15 14:23:55',
      message: 'Failed to connect to secondary database.',
      icon: (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500">
          <XCircleIcon className="h-5 w-5 text-white" />
        </div>
      ),
    },
  ];
  return (
    <div className="h-full overflow-hidden border-b p-0 lg:border-r lg:border-b-0">
      <motion.div
        variants={containerVariants}
        initial="initial"
        whileHover="whileHover"
        className="flex h-full w-full cursor-pointer flex-col items-center justify-between gap-y-5"
      >
        <div className="flex h-4/5 w-full items-center justify-center overflow-hidden rounded-t-xl border-b bg-transparent ">
          <motion.div className="flex h-[270px] w-full cursor-pointer flex-col gap-y-3.5 overflow-hidden rounded-t-md p-5">
            {logs.map((log, index) => (
              <motion.div
                key={log.id}
                className="flex w-full origin-right items-center rounded-md border border-border bg-transparent p-4 shadow-[0px_0px_40px_-25px_rgba(0,0,0,0.25)] backdrop-blur-md"
                custom={index}
                variants={{
                  initial: (index: number) => ({
                    y: 0,
                    scale: index === 4 ? 0.9 : 1,
                    opacity: 1,
                    transition: {
                      delay: 0.05,
                      duration: 0.2,
                      ease: cubicBezier(0.22, 1, 0.36, 1),
                    },
                  }),
                  whileHover: (index: number) => ({
                    y: -85,
                    opacity: index === 4 ? 1 : 0.6,
                    scale: index === 0 ? 0.85 : index === 4 ? 1.1 : 1,
                    transition: {
                      delay: 0.05,
                      duration: 0.2,
                      ease: cubicBezier(0.22, 1, 0.36, 1),
                    },
                  }),
                }}
                transition={{
                  type: 'spring',
                  damping: 40,
                  stiffness: 600,
                }}
              >
                <div className="mr-3">{log.icon}</div>
                <div className="flex-grow">
                  <p className="font-medium text-foreground text-xs">
                    [{log.timestamp}] {log.type.toUpperCase()}
                  </p>
                  <p className="text-muted-foreground text-xs">{log.message}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="flex w-full flex-col items-start gap-y-1 px-5 pb-4">
          <h2 className="font-semibold text-lg tracking-tight">
            Monitor agent activity
          </h2>
          <p className="text-muted-foreground text-sm">
            Track and analyze your AI agent performance with detailed activity
            logs.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const Card3 = () => {
  return (
    <div className="-z-0 min-h-[500px] overflow-hidden border-b p-0 lg:min-h-fit lg:border-b-0">
      <div className="relative flex h-full w-full flex-col items-center justify-between gap-y-5">
        <div className="flex h-4/5 w-full items-center justify-center overflow-hidden rounded-t-xl border-b">
          <div className="relative flex h-full w-full items-center justify-center">
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-[radial-gradient(circle,hsl(var(--accent)/0.3)_0%,transparent_100%)]"></div>
            <OrbitingCircles duration={15} delay={0} radius={40} reverse>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                <HeadsetIcon className="h-5 w-5 text-white" />
              </div>
            </OrbitingCircles>
            <OrbitingCircles duration={15} delay={20} radius={80}>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                <SquareTerminal className="h-5 w-5 text-white" />
              </div>
            </OrbitingCircles>
            <OrbitingCircles radius={120} duration={20} delay={20}>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500">
                <UserSearch className="h-5 w-5 text-white" />
              </div>
            </OrbitingCircles>
            <OrbitingCircles radius={160} duration={40} delay={20}>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500">
                <MessageSquareIcon className="h-5 w-5 text-white" />
              </div>
            </OrbitingCircles>
            <OrbitingCircles radius={200} duration={30}>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500">
                <GitForkIcon className="h-5 w-5 text-white" />
              </div>
            </OrbitingCircles>
          </div>
        </div>
        <div className="flex w-full flex-col items-start gap-y-1 px-5 pb-4">
          <h2 className="font-semibold text-lg tracking-tight">
            Build once, run anywhere
          </h2>
          <p className="text-muted-foreground text-sm">
            Create AI agents that work seamlessly across different platforms.
          </p>
        </div>
      </div>
    </div>
  );
};

export function UseCases() {
  return (
    <Section id="use-cases" title="Use Cases">
      <div className="grid h-full border border-b-0 lg:grid-cols-3">
        <Card1 />
        <Card2 />
        <Card3 />
      </div>
    </Section>
  );
}
