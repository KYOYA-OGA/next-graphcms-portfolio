import Image from 'next/image';
import Link from 'next/link';
import { getPortfolios } from '../../lib/data';

export const getStaticProps = async () => {
  const data = await getPortfolios();
  return {
    props: {
      portfolios: data.portfolios,
    },
  };
};

const PortfolioPage = ({ portfolios }) => {
  return (
    <main className="min-h-screen container max-w-3xl mx-auto px-4 py-5 lg:py-10 space-y-5 lg:space-y-8">
      {portfolios.map((item) => {
        return (
          <article key={item.slug}>
            <Link href={`/portfolio/${item.slug}`}>
              <a>
                <div className="relative overflow-hidden">
                  <div className="absolute w-full h-full z-10 opacity-80 bg-gray-800"></div>
                  <div className="absolute w-full h-full z-20 flex flex-col justify-center items-center text-center px-4">
                    <h3 className="text-2xl font-semibold">{item.title}</h3>
                    <p className="mt-4 text-lg leading-relaxed">
                      {item.description}
                    </p>
                    <div className="mt-4 space-x-4">
                      {item.tags.map((tag) => {
                        return (
                          <span className="btn btn-accent" key={tag}>
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <Image
                    src={item.coverImage.url}
                    height={item.coverImage.height}
                    width={item.coverImage.width}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    layout="responsive"
                  />
                </div>
              </a>
            </Link>
          </article>
        );
      })}
    </main>
  );
};

export default PortfolioPage;
