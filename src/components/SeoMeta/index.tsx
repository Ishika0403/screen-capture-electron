import Head from "next/head";

type Props = {
    title: string;
    keywords: string;
    description: string;
};

export default function SeoMeta({ title, keywords, description }: Props) {
    return (
        <Head>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <meta name="keywords" content={keywords} />
            <meta name="description" content={description} />
            <meta charSet="utf-8" />
            <link rel="icon" href="/favicon.ico" />
            <title>{title}</title>
        </Head>
    );
}

SeoMeta.defaultProps = {
    title: "Fundamental Structure",
    keywords: "Basic structure of Next.JS",
    description:
        "This is basic fundamental structure which will be used to create Next.JS project",
};
