import Head from 'next/head'

interface Props {
  title: string;
  description: string;
}

export default function HeaderComponent({ title, description }: Props): JSX.Element {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}