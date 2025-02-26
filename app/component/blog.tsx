import { useState, useEffect } from 'react';
import { AiOutlineExport } from "react-icons/ai";

interface Blog {
  image_url: string;
  title: string;
  created_at: string;
  text: string;
}

const BlogSection = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/posts');
        const data: Blog[] = await response.json();
        setBlogs(data.slice(0, 3));
      } catch (error) {
        console.error('Помилка при завантаженні даних:', error);
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <section
      id="news"
      className="w-full px-8 py-20 mx-auto max-w-7xl"
      style={{
        backgroundImage: "url('/bg-news.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex items-center justify-center flex-col mb-16">
        <span className="text-white text-5xl font-semibold">ДІЗНАВАЙСЯ ПРО</span>
        <h2 className="text-7xl font-semibold text-blue-600 mb-8">НОВИНИ ПЕРШИМ!</h2>
      </div>

      <div className="grid w-full grid-cols-1 gap-10 mx-auto lg:grid-cols-3">
        {blogs.map((blog, index) => (
          <article key={index} className="relative overflow-hidden rounded-lg shadow-lg transition hover:shadow-xl">
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src={blog.image_url || '/fallback-image.webp'}
              alt={blog.title}
              onError={(e) => (e.currentTarget.src = '/fallback-image.webp')}
            />
            <a
              href="https://discord.gg/TrBuYv86v5"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-6 right-6 p-3 bg-transparent rounded-full z-10"
            >
              <AiOutlineExport size={30} color="white" />
            </a>
            <div className="relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 pt-48 sm:pt-64 lg:pt-80">
              <div className="p-8">
                <time className="block text-lg text-white/90">{formatDate(blog.created_at)}</time>
                <h3 className="mt-2 text-2xl text-white font-semibold leading-snug">{blog.title}</h3>
                <p className="mt-4 text-lg text-white/95 line-clamp-3 leading-snug">
                  {blog.text}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
