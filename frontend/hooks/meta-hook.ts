import { Metadata } from "next";

export const generateStaticMetadata = (
  title: string = `Arfatur Rahman`,
  description: string = `Create apps for you as description`
) => {
  return {
    title: `${title} | Arfatur Rahman | Arfatur Rahman`,
    description,
    image: `/img/me.jpg`,
    openGraph: {
      images: [`/img/me.jpg`],
    },
  };
};

interface MetaDetials {
  title: string | null | undefined;
  images: string[] | string | null | undefined;
  description: string | null | undefined;
}
export async function generateDynamicMetadata(
  details: MetaDetials | null
): Promise<Metadata> {
  // Check if details is not null
  if (!details) {
    return {
      title: `Not found`,
      openGraph: {
        images: [`/img/me.jpg`],
      },
      description: `Create apps for you as description`,
    };
  }

  // Use default values for title and images if they are null or undefined
  const title = details.title || `Not found`;
  const images = details.images
    ? Array.isArray(details.images)
      ? details.images
      : [details.images]
    : [`/img/me.jpg`];

  // Ensure description is a valid string before checking its length
  const description =
    details.description && details.description.length > 97
      ? details.description.slice(0, 97) + "..."
      : details.description || `Create apps for you as description`;

  return {
    title: `${title} | Arfatur Rahman`,
    metadataBase: new URL("http://localhost:3000"),
    alternates: {
      canonical: "/",
      languages: {
        "en-US": "/en-US",
        "de-DE": "/de-DE",
      },
    },
    openGraph: {
      images: [...images, `/img/me.jpg`],
    },
    description,
  };
}
