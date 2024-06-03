import { Helmet } from "react-helmet-async";

const Meta = ({
  title,
  description,
  keywords,
  image,
}: {
  title: string;
  description: string;
  keywords: string;
  image?: string;
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta property="og:title" content={title} />
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta name="keywords" content={keywords} />
      {image && (
        <>
          <meta property="og:image" content={image} />
          <meta property="twitter:image" content={image} />
        </>
      )}
    </Helmet>
  );
};

export default Meta;
