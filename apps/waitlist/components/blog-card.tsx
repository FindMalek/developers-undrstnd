import type { Post } from '@/lib/blog';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export default function BlogCard({
  data,
  priority,
}: {
  data: Post;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/blog/${data.slug}`}
      className="border-b bg-background p-4 transition-colors last:border-b-0 hover:bg-secondary/20 lg:border-r lg:border-b-0 last:lg:border-r-0"
    >
      {data.image && (
        <Image
          className="border object-cover"
          src={data.image}
          width={1200}
          height={630}
          alt={data.title}
          priority={priority}
        />
      )}
      {!data.image && <div className="mb-4 h-[180px] rounded bg-gray-200" />}
      <p className="my-2">
        <time
          dateTime={data.publishedAt}
          className="text-muted-foreground text-xs"
        >
          {formatDate(data.publishedAt)}
        </time>
      </p>
      <h3 className="mb-2 font-medium text-xl">{data.title}</h3>
      <p className="text-muted-foreground">{data.summary}</p>
    </Link>
  );
}
