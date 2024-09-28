import Head from "next/head";

const MetaHead = ({ title, icon }) => {
  const headTitle = "upu.io: " + title;
  const headIcon = "/upuLogos.svg";

  return (
    <Head>
      <title> {title ? headTitle : "upu.io"} </title>
      <link rel="icon" href={icon ? icon : headIcon} />
    </Head>
  );
};

export default MetaHead;
